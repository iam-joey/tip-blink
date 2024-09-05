import { getConnection } from "@/lib/utils";
import {
  ActionError,
  ACTIONS_CORS_HEADERS,
  CompletedAction,
  NextActionPostRequest,
} from "@solana/actions";
import { PublicKey } from "@solana/web3.js";
import prisma from "../../../../../../../prisma";

export const GET = () => {
  return Response.json(
    {
      message: "NOt supported",
    } as ActionError,
    {
      headers: ACTIONS_CORS_HEADERS,
    }
  );
};

export const OPTIONS = () => {
  return Response.json(null, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

export const POST = async (
  req: Request,
  {
    params,
  }: {
    params: {
      username: string;
      transactionid: string;
    };
  }
) => {
  try {
    const body: NextActionPostRequest = await req.json();
    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch (error) {
      return Response.json(
        {
          message: "not a valid pub key",
        } as ActionError,
        {
          headers: ACTIONS_CORS_HEADERS,
        }
      );
    }

    let signature: string;
    try {
      signature = body.signature;
      if (!signature) throw "Invalid signature";
    } catch (err) {
      return Response.json(
        {
          message: "Invalid signature",
        } as ActionError,
        {
          headers: ACTIONS_CORS_HEADERS,
        }
      );
    }

    const connection = getConnection();

    try {
      let status = await connection.getSignatureStatus(signature);
      if (!status) throw "Unknown signature status";

      if (status.value?.confirmationStatus) {
        if (
          status.value.confirmationStatus != "confirmed" &&
          status.value.confirmationStatus != "finalized"
        ) {
          throw "Unable to confirm the transaction";
        }
      }

      const transaction = await connection.getParsedTransaction(
        signature,
        "confirmed"
      );

      const data = await prisma.payments.findUnique({
        where: {
          id: params.transactionid,
        },
      });

      if (!data) {
        return Response.json(
          {
            message: "Transaction not found",
          } as ActionError,
          {
            headers: ACTIONS_CORS_HEADERS,
          }
        );
      }

      if (transaction) {
        const accounts = transaction.transaction.message.accountKeys;
        console.log("transaction account which are included", accounts);
        let programAccount = accounts.find((acc) =>
          acc.pubkey.equals(new PublicKey(data.referenceKey))
        );
        console.log("account present", programAccount);
        if (!programAccount) {
          const payload: CompletedAction = {
            type: "completed",
            title: `Payment being processing`,
            icon: `https://robohash.org/${body.account}?set=set4`,
            label: "incomplete transaction!",
            description: "purchase failed! contact us at help@support.us",
          };

          return Response.json(payload, {
            headers: ACTIONS_CORS_HEADERS,
          });
        }

        await prisma.payments.update({
          where: {
            id: params.transactionid,
          },
          data: {
            status: "PAID",
          },
        });

        const payload: CompletedAction = {
          type: "completed",
          title: `Payment Successfull`,
          icon: `https://robohash.org/${body.account}?set=set4`,
          label: "Complete!",
          description:
            "purchase was successful! You'll get an email with all the orders details, If you've any queries email us at hello@support.xyz",
        };

        return Response.json(payload, {
          headers: ACTIONS_CORS_HEADERS,
        });
      }

      const payload: CompletedAction = {
        type: "completed",
        title: `Payment being processing`,
        icon: `https://robohash.org/${body.account}?set=set4`,
        label: "Complete!",
        description: "purchase failed! contact us at help@support.us",
      };

      return Response.json(payload, {
        headers: ACTIONS_CORS_HEADERS,
      });
    } catch (err) {
      if (typeof err == "string") throw err;
      throw "Unable to confirm the provided signature";
    }
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "Seomthing went wrong",
      } as ActionError,
      {
        headers: ACTIONS_CORS_HEADERS,
      }
    );
  }
};
