import { SettingCategory } from "src/app/category/setting-category.model";

export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  favoriteCategories: SettingCategory[];
}
