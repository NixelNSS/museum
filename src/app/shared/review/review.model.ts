import { User } from "src/app/auth/user/user.model";

export interface Review {
  id: number;
  value: number;
  exhibitId: number;
  tourPlanId: number;
  user: User;
  dateOfCreation: Date;
}
