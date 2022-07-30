import { DisplayUser } from "./display-user.interface";

export interface DecodedJwt {
  user: DisplayUser;
  iat: number;
  exp: number;
}
