import { SvgIconProps } from "@mui/material/SvgIcon";

export interface StatisticCountModel {
  activeCategories: number;
  replies: number;
  upvotes: number;
  downvotes: number;
  topics: number;
  activeUsers: number;
  registeredUsers: number;
}

export interface ModifiedStatModel {
  colorType: string;
  count: number;
  text: string;
  allUserCount: null | number;
  icon: React.ReactElement<SvgIconProps>;
}
