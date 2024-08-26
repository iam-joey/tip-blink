import prisma from "../../../../../prisma";

export const POST = async (req: Request, { params }: any) => {
  try {
    const wallet = params.wallet;
    console.log(wallet);
    const data = await prisma.userBlink.findUnique({
      where: {
        userWallet: wallet,
      },
    });

    if (!data) {
      return Response.json({
        msg: "Blink Not created yet",
      });
    }

    return Response.json({
      msg: "Successfully fetched",
      blink: data,
    });
  } catch (error) {
    return Response.json({
      msg: "something went wrong in blink get route",
    });
  }
};
