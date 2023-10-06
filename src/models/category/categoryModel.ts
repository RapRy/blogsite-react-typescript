export interface CategoryModel {
  _id: string;
  meta: {
    topics: string[];
  };
  name: string;
  active: number;
  createdAt: Date;
  updatedAt: Date;
}
