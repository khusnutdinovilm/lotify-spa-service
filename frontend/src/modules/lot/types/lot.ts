export type LotStatus = "active" | "finished";

export interface ILot {
  id: number;
  title: string;
  photo: string;
  price: number;
  status: LotStatus;
}
