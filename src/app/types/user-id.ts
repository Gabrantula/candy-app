export interface UserId {
    recipes: string[];
    _id: string;
    email: string;
    username: string;
    password: string;
    accessToken?: string;
    roles: string
  }