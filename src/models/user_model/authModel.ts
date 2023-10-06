export type SignUpFormdataType = {
  username: string;
  email: string;
  studentId: string;
  password: string;
  confirmPassword: string;
};

export type SignInFormdataType = {
  email: string;
  password: string;
};

export interface AuthModel {
  _id: string;
  username: string;
  password: string;
  avatar: string;
  accountType: number;
  active: number;
  email: string;
  blacklisted: number;
  schoolId: number;
  createdAt: string;
  post: {
    topics: string[];
    replies: string[];
    upvotes: string[];
    downvotes: string[];
  };
  name: {
    firstName: string;
    lastName: string;
  };
  date: {
    activity: string[];
    registered: string;
  };
  token?: string;
}
