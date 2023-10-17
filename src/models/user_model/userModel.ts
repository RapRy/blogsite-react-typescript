type ActivityModel = {
  _id: String;
  id: String;
  date: Date;
};

export interface UserModel {
  _id: String;
  post: {
    topics: String[];
    replies: String[];
    upvotes: String[];
    downvotes: String[];
  };
  name: {
    firstName: String;
    lastName: String;
  };
  username: String;
  email: String;
  password: String;
  avatar: String;
  accountType: Number;
  date: {
    registered: Date;
    activity: ActivityModel[];
  };
  schoolId: Number;
  createdAt: Date;
  updatedAt: Date;
  __v?: Number;
}
