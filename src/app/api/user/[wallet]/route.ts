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
    });
  } catch (error: any) {
    console.log("error is", error);
    if (error.code === "P2025") {
      throw new Error("User not found");
    }
    return Response.json({
      msg: "something went wrong while fetching",
    });
  }
};
