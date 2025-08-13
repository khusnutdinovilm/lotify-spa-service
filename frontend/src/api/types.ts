import { type AxiosResponse } from "axios";

export type ApiResul<T> = Promise<AxiosResponse<T>>;

export interface IApiGetListResponse<T> {
  data: T[];
}

export type ApiGetListResult<T> = IApiGetListResponse<T>;

export interface IPaginatedMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: unknown[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface IApiGetPagindatedListResponse<T> extends IApiGetListResponse<T> {
  links: unknown;
  meta: IPaginatedMeta;
}

export type ApiGetPaginatedListResult<T> = ApiResul<IApiGetPagindatedListResponse<T>>;

export interface IApiItemResponse<T> {
  data: T;
}

export type ApiItemResult<T> = ApiResul<IApiItemResponse<T>>;
