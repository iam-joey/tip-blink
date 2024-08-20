import {
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  createPostResponse,
} from "@solana/actions";
import prisma from "../../../../../prisma";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

export const GET = async (req: Request, { params }: any) => {
  try {
    const username = params.username;

    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      return Response.json(
        {
          msg: "User not found",
        },
        {
          headers: ACTIONS_CORS_HEADERS,
        }
      );
    }
    const payload: ActionGetResponse = {
      icon: user.imageURL,
      title: "Transfer SOL",
      label: "Send me something",
      description: "Just send me some SOL for living",
      links: {
        actions: [
          {
            href: `/api/actions/${username}?amount=0.1`,
            label: "0.1 SOL",
          },
          {
            href: `/api/actions/${username}?amount=0.1`,
            label: "0.5 SOL",
          },
          {
            href: `/api/actions/${username}?amount={amount}`,
            label: "SEND SOL",
            parameters: [
              {
                name: "amount",
                label: "Enter the SOl amount",
                required: true,
              },
            ],
          },
        ],
      },
    };

    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (error) {
    console.log("error here", error);

    return Response.json(
      {
        msg: "error here",
      },
      {
        headers: ACTIONS_CORS_HEADERS,
      }
    );
  }
};

export const OPTIONS = GET;

export const POST = async (req: Request, { params }: any) => {
  try {
    const url = new URL(req.url);

    const body: ActionPostRequest = await req.json();

    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
      console.log("account is ", account);
    } catch (err) {
      throw "Invalid 'account' provided. Its not a real pubkey";
    }
    let amount: number = 0.1;
    if (url.searchParams.has("amount")) {
      try {
        amount = parseFloat(url.searchParams.get("amount") || "0.1");
        console.log(amount);
      } catch (error) {
        throw "invalid amount";
      }
    }
    const username = params.username;
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    console.log("user is", user);
    if (!user) {
      return Response.json(
        {
          msg: "User not found",
        },
        {
          headers: ACTIONS_CORS_HEADERS,
        }
      );
    }
    const end_point = process.env.RPC_END_POINT as string;
    const connection = new Connection(end_point, "confirmed");

    const transaction = new Transaction();

    transaction.add(
      SystemProgram.transfer({
        fromPubkey: account,
        toPubkey: new PublicKey(user.wallet),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    transaction.feePayer = account;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: "Thanks for the donation",
      },
    });

    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (error) {}
};
