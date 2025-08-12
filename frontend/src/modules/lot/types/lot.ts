export type LotStatus = "active" | "finished";

export interface ILot {
  id: number;
  title: string;
  photo: string;
  price: number;
  status: LotStatus;
}

export interface ICreateLotDto extends Omit<ILot, "id" | "photo"> {
  photo: File;
}

export interface IUpdateLotDto extends Partial<Omit<ILot, "id" | "photo">> {
  photo?: File;
}
