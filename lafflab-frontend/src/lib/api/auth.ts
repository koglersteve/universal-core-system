import { post, setAuthToken } from "./httpclient";

type LoginResponse = {
  ok: boolean;
  token: string;
  user: any;
};

export async function login(email: string, password: string) {
  const res = await post<LoginResponse>("/core/login", {
    email,
    password,
  });

  setAuthToken(res.token);
  return res.user;
}
