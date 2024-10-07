import * as z from "zod";

export const createEmployeeSchema = z.object({
  first_name: z.string().min(1).max(20),
  employee_number: z.coerce.number().refine(val => Number(val) >= 0 , 'The number must not be less than 0'),
});