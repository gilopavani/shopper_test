import z from "zod";

export const EstimateSchema = z.object({
  origin: z.string(),
  destination: z.string(),
  customer_id: z.string(),
});
