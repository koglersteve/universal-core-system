import { post } from "./httpclient";

export type CreateUserResponse = {
  id: string;
  email: string;
  screenName: string;
  avatarUrl: string | null;
  createdAt: string;
};

export async function createUser(
  email: string,
  screenName: string,
  password: string
) {
  return post<CreateUserResponse>("/core/user", {
    email,
    screenName,
    password,
  });
}
