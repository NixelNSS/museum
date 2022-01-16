import {SettingCategory} from '../category/setting-category.model';
import {Exhibit} from '../exhibit/exhibit.model';

export interface Setting {
  id: number;
  name: string;
  description: string;
  imageURL: string;
  category: SettingCategory;
  exhibits: Exhibit[];
  averageReviewValue: number;
  tourTime: number;
  price: number;
}
