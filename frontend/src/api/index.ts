import type { AxiosInstance } from "axios";

export default class BaseHttpService {
  protected $api: AxiosInstance;
  protected $url: string;

  constructor(api: AxiosInstance, url: string) {
    this.$api = api;
    this.$url = url;
  }
}
