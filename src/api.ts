import { APIResponse } from "./types/Client";
import { Params } from "./types/Params";

const url = "https://randomuser.me/api/";

export const fetchUsers = async (params: Params) => {
  await new Promise<APIResponse>(
    resolve => setTimeout(resolve, 2000)
  )
  return fetch(`${url}?${new URLSearchParams(params)}`).then(
    response => response.json()
  )
}