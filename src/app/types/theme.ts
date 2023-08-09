
import { UserId } from './user-id';

export interface Recipes {

  imageUrl: string;
  postText: string;
  _id: string;
  themeName: string;
  userId: UserId;
  _ownerId: string
 
}