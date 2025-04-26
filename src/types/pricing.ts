
export interface PlanFeature {
  feature: string;
  included: boolean;
}

export interface PlanComparison {
  feature: string;
  basic: string | boolean;
  professional: string | boolean;
  enterprise: string | boolean;
}

export type PlanType = "hosting" | "email" | "servers";
