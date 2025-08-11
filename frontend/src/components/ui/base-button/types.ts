import type { IconName } from "ui/base-icon/types";

type BtnTypes = "static" | "default" | "ghost" | "success" | "error" | "warning";
type HtmlTypes = "button" | "submit" | "reset";

export interface IBaseButtonProps {
  prependIcon?: IconName;
  centerIcon?: IconName;
  appendIcon?: IconName;
  btnLabel?: string;
  loading?: boolean;
  disabled?: boolean;
  btnType?: BtnTypes;
  htmlType?: HtmlTypes;
}

export interface IBaseButtonEmits {
  (e: "click", event: MouseEvent): void;
}
