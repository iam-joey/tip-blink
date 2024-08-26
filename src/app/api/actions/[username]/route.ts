import {
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  createPostResponse,
  MEMO_PROGRAM_ID,
} from "@solana/actions";
import prisma from "../../../../../prisma";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  Keypair,
  TransactionInstruction,
} from "@solana/web3.js";

export const GET = async (req: Request, { params }: { params: Params }) => {
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
    if (!user.blinkCreated) {
      return Response.json(
        {
          msg: "User didnt made any blink",
        },
        {
          headers: ACTIONS_CORS_HEADERS,
        }
      );
    }

    const blink = await prisma.userBlink.findUnique({
      where: {
        userWallet: user.wallet,
      },
    });

    if (!blink) {
      return Response.json(
        {
          msg: "User didnt made any blink",
        },
        {
          headers: ACTIONS_CORS_HEADERS,
        }
      );
    }

    const payload: ActionGetResponse = {
      icon: blink.icon,
      title: blink.title,
      label: blink.label,
      description: blink.description,
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

interface Params {
  username: string;
}

export const POST = async (req: Request, { params }: { params: Params }) => {
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
    const referenceKey = Keypair.generate();

    await prisma.userReceivedSolTransactions.create({
      data: {
        amount,
        referenceKey: referenceKey.publicKey.toString(),
        wallet: account.toString(),
        transactionId: "",
        userWallet: user.wallet,
      },
    });
    const end_point = process.env.RPC_END_POINT as string;
    const connection = new Connection(end_point, "confirmed");

    const transaction = new Transaction();

    transaction.add(
      new TransactionInstruction({
        keys: [],
        data: Buffer.from(`${account.toString()} dontaing to ${user.username}`),
        programId: new PublicKey(MEMO_PROGRAM_ID),
      }),
      SystemProgram.transfer({
        fromPubkey: account,
        toPubkey: new PublicKey(user.wallet),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    transaction.instructions[1].keys.push({
      isSigner: false,
      isWritable: false,
      pubkey: referenceKey.publicKey,
    });

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
