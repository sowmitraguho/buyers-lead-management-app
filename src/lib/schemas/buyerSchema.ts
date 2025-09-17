import { z } from "zod";

export const CityEnum = z.enum([
  "Chandigarh",
  "Mohali",
  "Zirakpur",
  "Panchkula",
  "Other",
]);

export const PropertyTypeEnum = z.enum([
  "Apartment",
  "Villa",
  "Plot",
  "Office",
  "Retail",
]);

export const BHKEnum = z.enum(["1", "2", "3", "4", "Studio"]);

export const PurposeEnum = z.enum(["Buy", "Rent"]);

export const TimelineEnum = z.enum(["0-3m", "3-6m", ">6m", "Exploring"]);

export const SourceEnum = z.enum(["Website", "Referral", "Walk-in", "Call", "Other"]);

export const StatusEnum = z.enum([
  "New",
  "Qualified",
  "Contacted",
  "Visited",
  "Negotiation",
  "Converted",
  "Dropped",
]);

export const buyerBaseSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email").optional().or(z.literal("")).transform(v => v === "" ? undefined : v).optional(),
  phone: z.string().regex(/^\d{10,15}$/, "Phone must be numeric and 10–15 digits"),
  city: CityEnum,
  propertyType: PropertyTypeEnum,
  bhk: z.union([BHKEnum, z.string().min(0).max(10)]).optional(), // empty string allowed for non-residential
  purpose: PurposeEnum,
  budgetMin: z.preprocess(val => {
    if (val === "" || val === null || val === undefined) return undefined;
    const n = Number(val);
    return Number.isNaN(n) ? val : n;
  }, z.number().int().nonnegative().optional()),
  budgetMax: z.preprocess(val => {
    if (val === "" || val === null || val === undefined) return undefined;
    const n = Number(val);
    return Number.isNaN(n) ? val : n;
  }, z.number().int().nonnegative().optional()),
  timeline: TimelineEnum,
  source: SourceEnum,
  notes: z.string().max(1000).optional().or(z.literal("")).transform(v => v === "" ? undefined : v).optional(),
  tags: z.array(z.string()).optional(),
});


export const buyerCreateSchema = buyerBaseSchema
  .superRefine((data, ctx) => {
    const prop = data.propertyType;
    const bhkRequired = prop === "Apartment" || prop === "Villa";
    if (bhkRequired) {
      if (!data.bhk || (typeof data.bhk === "string" && data.bhk.length === 0)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["bhk"],
          message: "BHK is required for Apartment and Villa",
        });
      }
    }
    if (data.budgetMin !== undefined && data.budgetMax !== undefined) {
      if (data.budgetMax < data.budgetMin) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["budgetMax"],
          message: "budgetMax must be greater than or equal to budgetMin",
        });
      }
    }
  });

export type BuyerCreateInput = z.infer<typeof buyerCreateSchema>;
