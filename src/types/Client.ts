import { User } from "./User";

export type APIResponse = {
  results: User[];
} | undefined;
