import type { ApiGetPaginatedListResult, ApiItemResult } from "api/types";

import type { ILot } from "./lot";

export type LotPaginatedListResult = ApiGetPaginatedListResult<ILot>;

export type LotCreateResult = ApiItemResult<ILot>;
export type LotUpdateResult = ApiItemResult<ILot>;
