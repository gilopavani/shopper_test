import z from "zod";

export const FilterHistorySchema = z.object({
  customer_id: z.string(),
  driver_id: z.string().optional(),
});
