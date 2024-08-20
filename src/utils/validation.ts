import { PublicKey } from "@solana/web3.js";
import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string()
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Username must only contain alphabtes and numbers",
    })
    .min(7, {
      message: "username must have atleast 7 letters ",
    })
    .refine((value) => !value.includes(" "), {
      message: "it should not contain any spaces",
    }),
  walletAddress: z.string().refine(
    (value) => {
      try {
        new PublicKey(value);
        return true;
      } catch (error) {
        return false;
      }
    },
    {
      message: "Invalid address",
    }
  ),
  imageUrl: z.string().optional(),
});

export type UserSchemaType = z.infer<typeof userSchema>;
