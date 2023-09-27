import { FC } from "react"
import Table from "./Table"
import { APIResponse } from "./types/Client";
import { Resource } from "./helpers/promiseWrapper";

const Users: FC<{ resource: Resource<APIResponse> }> = (props) => {
  const users = props.resource?.read()?.results ?? [];
  return (
    <Table users={users} />
  )
}

export default Users