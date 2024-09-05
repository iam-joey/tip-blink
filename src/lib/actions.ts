"use server";

import { BlinkSchema, UserSchemaType } from "@/utils/validation";
import prisma from "../../prisma";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export const getUser = async (address: string) => {
  try {
    const data = await prisma.user.findUnique({
      where: {
        wallet: address,
      },
      include: {
        blink: true,
      },
    });
    if (!data) {
      return {
        msg: "User Not found",
        err: true,
        data: null,
      };
    }

    return {
      msg: "User exists",
      err: false,
      data,
    };
  } catch (error) {
    return {
      msg: "Seomthing went wrong",
      err: true,
      data: null,
    };
  }
};
export interface Blink {
  icon?: string;
  title?: string;
  label?: string;
  description?: string;
}

export const createBlink = async (data: BlinkSchema) => {
  try {
    await new Promise((r) => setTimeout(r, 2000));
    const blinkData = await prisma.userBlink.create({
      data: {
        icon: data.imageUrl,
        userWallet: data.walletAddress,
        description: data.description,
        label: data.label,
        title: data.title,
      },
    });

    await prisma.user.update({
      where: {
        wallet: blinkData.userWallet,
      },
      data: {
        blinkCreated: true,
      },
    });

    return {
      msg: "Updated successFully",
      err: false,
      data: blinkData,
    };
  } catch (error) {
    console.log(error);
    return {
      msg: "Something went wrong",
      err: true,
      data: null,
    };
  }
};

export const updateBlink = async (blinkData: Blink, address: string) => {
  try {
    const response = await prisma.userBlink.update({
      where: {
        userWallet: address,
      },
      data: blinkData,
    });

    return {
      msg: "Update successful",
      err: false,
    };
  } catch (error) {
    return {
      msg: "Something went wrong while update",
      err: true,
    };
  }
};

export const createUser = async (userData: UserSchemaType) => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username: userData.twitterUsername },
          { wallet: userData.walletAddress },
        ],
      },
    });
    console.log("here came");
    if (existingUser) {
      return {
        msg: "Username or wallet address is already associated with another account.",
        err: true,
        data: null,
      };
    }

    const data = await prisma.user.create({
      data: {
        username: userData.twitterUsername,
        wallet: userData.walletAddress,
      },
    });

    return {
      msg: "Account created",
      err: false,
      data,
    };
  } catch (error) {
    console.log(error);
    return {
      msg: "Something went wrong",
      err: true,
      data: null,
    };
  }
};

export const getOrderOfLast7Days = async (address: string) => {
  try {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Fetch payments for the last 7 days
    const payments = await prisma.payments.findMany({
      where: {
        userId: address,
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      select: {
        amount: true,
        createdAt: true,
      },
    });

    // Convert lamports to SOL and aggregate daily amounts
    const dailyTotals = payments.reduce((acc, payment) => {
      const date = new Date(payment.createdAt).toISOString().split("T")[0]; // Format as YYYY-MM-DD
      const amountInSOL = parseFloat(payment.amount) / LAMPORTS_PER_SOL; // Convert lamports to SOL

      if (!acc[date]) {
        acc[date] = 0;
      }

      acc[date] += amountInSOL;

      return acc;
    }, {} as Record<string, number>);

    // Calculate the total amount received over the last 7 days
    const totalAmount = Object.values(dailyTotals).reduce(
      (sum, amount) => sum + amount,
      0
    );

    // Generate a list of all dates in the last 7 days
    const dates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(sevenDaysAgo);
      date.setDate(date.getDate() + i);
      return date.toISOString().split("T")[0];
    });

    // Ensure all dates are included in the result, even if no payments were received
    const result = dates.map((date) => ({
      date,
      amountReceived: (dailyTotals[date] || 0).toFixed(9), // Display with 9 decimal places for SOL
    }));

    return {
      msg: "Successfully fetched",
      err: false,
      data: {
        dailyBreakdown: result,
        totalAmountReceived: totalAmount.toFixed(9), // Total amount in SOL
      },
    };
  } catch (error) {
    console.error(error); // Log the error for debugging
    return {
      msg: "Something went wrong",
      err: true,
      data: null,
    };
  }
};

export const getTotalAmountAndSupporters = async (address: string) => {
  try {
    const payments = await prisma.payments.findMany({
      where: {
        userId: address,
        status: "PAID",
      },
      select: {
        amount: true,
        senderAddress: true,
      },
    });

    const uniqueAddress = new Set<string>();
    let totalLamports = 0;
    payments.map((payment) => {
      const amount = parseFloat(payment.amount);

      if (!uniqueAddress.has(payment.senderAddress)) {
        uniqueAddress.add(payment.senderAddress);
      }
      totalLamports += amount;
    });

    const totalAmount = totalLamports / LAMPORTS_PER_SOL;

    return {
      msg: "Successfully fetched",
      err: false,
      data: {
        members: uniqueAddress.size,
        totalAmount,
      },
    };
  } catch (error) {
    return {
      msg: "Something went wrong",
      err: true,
      data: null,
    };
  }
};

export const getLastFewTransactsions = async (address: string) => {
  try {
    const payments = await prisma.payments.findMany({
      where: {
        userId: address,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      select: {
        amount: true,
        senderAddress: true,
      },
    });

    return {
      msg: "Sucessfully fetched",
      err: false,
      data: payments,
    };
  } catch (error) {
    return {
      msg: "Seomthing went wrong",
      err: true,
      data: null,
    };
  }
};

export const getAllPaymentsTransactions = async (address: string) => {
  try {
    const payments = await prisma.payments.findMany({
      where: {
        userId: address,
      },
      select: {
        amount: true,
        createdAt: true,
        senderAddress: true,
        status: true,
        id: true,
      },
    });

    return {
      msg: "Successfully fetched",
      err: false,
      data: payments,
    };
  } catch (error) {
    return {
      msg: "Something went worng",
      err: true,
      data: null,
    };
  }
};
