import { userSchema, UserSchemaType } from "@/utils/validation";
import prisma from "../../../../prisma";

export const POST = async (req: Request) => {
  try {
    let a = await req.json();

    const data = await userSchema.parse(a);
    const newUser = await prisma.user.create({
      data: {
        username: data.twitterUsername,
        wallet: data.walletAddress,
      },
    });
    console.log(newUser);
    return Response.json({
      msg: "user created successfully",
      username: newUser.username,
    });
  } catch (error) {
    console.log("error while creating", error);
    return Response.json({
      msg: "Somehting went wrong",
    });
  }
};
