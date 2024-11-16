export interface User {
  _id?: string;
  email: string;
  password: string;
  role?: "admin" | "user";
  name?: string;
  username?: string;
  avatar?: string;
  isAuthenticated?: boolean;
}
