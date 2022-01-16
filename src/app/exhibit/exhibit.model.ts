import { Country } from "../shared/country/country.model";
import { Review } from "../shared/review/review.model";
import {ExhibitCategory} from '../category/exhibit-category.model';

export interface Exhibit {
  id: number;
  settingId: number;
  name: string;
  description: string;
  imageURL: string;
  tourTime: number;
  price: number;
  category: ExhibitCategory;
  countryOfOrigin: Country;
  reviews: Review[];
  averageReviewValue: number;
  tourPlanReviewValue?: number;
}
