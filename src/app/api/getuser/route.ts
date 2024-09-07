import { NextRequest } from "next/server";

import prisma from "../../../../prisma/index";

export async function GET(req: NextRequest) {
  try {
    interface Body {
      address: string;
    }
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("address");
    if (!address) {
      return Response.json({
        msg: "invalid request",
        err: true,
        data: null,
      });
    }
    const user = await prisma.user.findUnique({
      where: {
        wallet: address,
      },
      include: {
        blink: true,
      },
    });

    if (!user) {
      return Response.json({
        msg: "User not found",
        err: true,
        data: null,
      });
    }

    return Response.json(user);
  } catch (error) {
    console.log(error);
    return Response.json({
      msg: "Something went wrong",
      err: true,
      data: null,
    });
  }
}
