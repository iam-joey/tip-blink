import prisma from "../../../../prisma";

export const GET = async (req: Request) => {
  try {
    interface Data {
      wallet: string;
    }
    const body: Data = await req.json();
    const payouts = await prisma.userReceivedSolTransactions.findMany({
      where: {
        userWallet: body.wallet,
        status: "PAID",
      },
    });

    return Response.json({
      msg: "Successfully fetched",
      data: payouts,
    });
  } catch (error) {
    return Response.json({
      msg: "Something went wrong while fetching transactions",
    });
  }
};
