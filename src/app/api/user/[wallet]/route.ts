import prisma from "../../../../../prisma";

export const GET = async (req: Request, { params }: any) => {
  try {
    const wallet = params.wallet;
    if (!wallet) {
      throw "wallet not sent";
    }

    const firstUser = await prisma.user.findFirstOrThrow({
      where: { wallet },
    });

    return Response.json({
      msg: "Successfully fetched the user",
      username: firstUser.username,
      exists: true,
      blink: firstUser.blinkCreated,
    });
  } catch (error: any) {
    console.log(error);
    if (error.code === "P2025") {
      return Response.json({
        msg: "User doesnt exist",
        exists: false,
      });
    }
    return Response.json({
      msg: "something went wrong while fetching",
      exists: false,
    });
  }
};
