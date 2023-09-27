import { initParams } from "../constants";
import { Params } from "../types/Params";

export const getSearchParams: (params?: Record<string, string>) => Params = (params) => ({
  ...initParams,
  ...params
});