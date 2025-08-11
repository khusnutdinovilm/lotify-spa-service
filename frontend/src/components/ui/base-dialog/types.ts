export interface IBaseDialogProps {
  isDialogOpen: boolean;
  dialogTitle: string;
  dialogClass?: string;
}

export interface IBaseDialogEmits {
  (e: "close-dialog"): void;
}
