import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const userId = "DLgacSweX6fmAbnzwoFnVwcuGRMwFvdCzzwhrXuE5pPc";

  const startDate = new Date();
  const dates = Array.from({ length: 7 })
    .map((_, index) => {
      const date = new Date(startDate.getTime() - index * 24 * 60 * 60 * 1000);
      return date.toISOString().split("T")[0];
    })
    .reverse();

  // Randomly select one day to have no payments
  const noPaymentDate = dates[Math.floor(Math.random() * dates.length)];

  function generateRandomPayments(
    date: string,
    min: number,
    max: number
  ): Array<{ senderAddress: string; amount: string; createdAt: Date }> {
    const payments = [];
    const numberOfPayments = Math.floor(Math.random() * (max - min + 1)) + min;
    for (let i = 0; i < numberOfPayments; i++) {
      const randomHour = Math.floor(Math.random() * 24);
      const randomMinute = Math.floor(Math.random() * 60);
      const randomSecond = Math.floor(Math.random() * 60);
      const createdAt = new Date(
        `${date}T${randomHour.toString().padStart(2, "0")}:${randomMinute
          .toString()
          .padStart(2, "0")}:${randomSecond.toString().padStart(2, "0")}Z`
      );

      payments.push({
        senderAddress: `mock-address-${Math.random()
          .toString(36)
          .substr(2, 9)}`, // Random sender address
        amount: (Math.random() * 1_000_000_000).toFixed(0), // Random amount in lamports
        createdAt: createdAt,
      });
    }
    return payments;
  }

  // Generate mock payments ensuring the noPaymentDate has zero payments
  const mockPayments = dates.flatMap((date) => {
    if (date === noPaymentDate) {
      // Ensure no payments for this specific date
      return [];
    }

    const paymentsForDate = generateRandomPayments(date, 40, 50);

    if (Math.random() < 0.3) {
      const fewerPayments = generateRandomPayments(date, 10, 19);
      return paymentsForDate.concat(fewerPayments);
    }

    return paymentsForDate;
  });

  // Insert mock data into the database
  await prisma.payments.createMany({
    data: mockPayments.map((payment) => ({
      userId: userId,
      ...payment,
      status: "PAID", // Assuming all mock payments are PAID
      referenceKey: `mock-ref-${Math.random().toString(36).substr(2, 9)}`, // Random unique reference
    })),
  });

  console.log("Mock payments inserted successfully.");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
