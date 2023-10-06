export interface TopicModel {
  _id: string;
  meta: {
    replies: string[];
    views: string[];
    upvotes: string[];
    downvotes: string[];
  };
  title: string;
  decription: string;
  active: number;
  ref: {
    category: string;
    crator: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
