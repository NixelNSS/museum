import {Exhibit} from '../exhibit/exhibit.model';
import {TourPlanStatusEnum} from './tour-plan-status.enum';

export interface TourPlan {
  id: number;
  userId: number;
  exhibits: Exhibit[];
  status: TourPlanStatusEnum;
  time: number;
  amount: number;
  isReviewed: number;
}
