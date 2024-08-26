import { PublicKey } from "@solana/web3.js";
import { z } from "zod";

export const userSchema = z.object({
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
  twitterUsername: z.string(),
});

export type UserSchemaType = z.infer<typeof userSchema>;

export const blinkSchema = z.object({
  imageUrl: z.string().url({ message: "Image URL must be a valid URL" }),
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long" })
    .max(50, { message: "Title cannot exceed 100 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(300, { message: "Description cannot exceed 300 characters" }),
  label: z
    .string()
    .min(2, { message: "Label must be at least 2 characters long" })
    .max(50, { message: "Label cannot exceed 50 characters" }),
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
});

export type BlinkSchema = z.infer<typeof blinkSchema>;
