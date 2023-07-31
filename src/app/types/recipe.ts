
import { UserId } from './user-id';

export interface Recipe {
  subscribers: string[];
  posts: any; // string[] | Post[];
  _id: string;
  themeName: string;
  userId: UserId;
  created_at: string;
  updatedAt: string;
  __v: number;
}