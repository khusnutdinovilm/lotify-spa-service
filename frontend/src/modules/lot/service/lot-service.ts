import type { AxiosInstance } from "axios";

import api from "api/api";
import BaseHttpService from "api/index";

import type { ILot } from "modules/lot/types/lot";
import type { LotPaginatedListResult } from "modules/lot/types/service";

class LotService extends BaseHttpService {
  constructor(api: AxiosInstance) {
    super(api, "/lots");
  }

  async getLots(page = 1): LotPaginatedListResult {
    const path = `${this.$url}?page=${page}`;
    return this.$api.get(path);
  }

  async create(payload: FormData) {
    return this.$api.post(this.$url, payload);
  }

  async update(id: ILot["id"], payload: FormData) {
    const path = `${this.$url}/${id}`;
    return this.$api.put(path, payload);
  }

  async delete(id: ILot["id"]) {
    const path = `${this.$url}/${id}`;
    return this.$api.delete(path);
  }
}

export default new LotService(api);
