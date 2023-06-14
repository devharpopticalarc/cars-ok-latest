import { ChangeEvent } from "react";
import { CommonUtilities } from "../utils/common.utils";

export interface optionType {
  value: string,
  text: string,
}
export interface DropDownMenuType {
  menuLabel: string,
  options: Array<optionType>,
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
}
export default function DropDownMenu({ menuLabel, options, onChange }: DropDownMenuType) {
  return (
    <div>
      <label>{menuLabel}:&nbsp;</label>
      <select onChange={onChange}>
        { options.map((option: optionType) => <option key={CommonUtilities.randomHexString(20)} value={option.value}>{option.text}</option> ) }
      </select>
    </div>
  );
}