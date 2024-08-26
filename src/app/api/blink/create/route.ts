import { blinkSchema } from "@/utils/validation";
import { z } from "zod";
import prisma from "../../../../../prisma";

export const POST = async (req: Request) => {
  try {
    console.log("inside");
    const body = await req.json();
    console.log(body);
    const data = await blinkSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: {
        wallet: data.walletAddress,
      },
    });

    if (!user) {
      return Response.json({
        msg: "regsiter yourself first",
      });
    }

    if (user.blinkCreated) {
      return Response.json({
        msg: "Blink already created",
      });
    }

    const blink = await prisma.userBlink.create({
      data: {
        description: data.description,
        icon: data.imageUrl,
        label: data.label,
        title: data.title,
        userWallet: data.walletAddress,
      },
    });

    if (blink) {
      await prisma.user.update({
        where: {
          wallet: data.walletAddress,
        },
        data: {
          blinkCreated: true,
        },
      });
    }

    return Response.json({
      msg: "Blink created",
      blink,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      const errorMessages = error.issues.map((message) => message);

      return Response.json({
        err: errorMessages,
      });
    }
    return Response.json({
      msg: "something went wrong",
    });
  }
};
