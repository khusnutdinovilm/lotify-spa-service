export interface IBaseInputProps {
  id: string;
  label: string;
  type?: "text" | "number";
  errorText?: string;
  debounce?: number;
}
