import { get } from "./httpclient";

export async function getUserSchema() {
  return get("/core/schema/user");
}
