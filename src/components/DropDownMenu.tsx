import { ChangeEvent } from "react";
import { CommonUtilities } from "../utils/common.utils";

export interface optionType {
  value: string,
  text: string,
}
export interface DropDownMenuType {
  menuLabel: string,
  options: Array<optionType>,
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void,
  value: string,
  className?: string,
}
export default function DropDownMenu({ menuLabel, options, onChange, value, className }: DropDownMenuType) {
  return (
    <div className={className}>
      <label>{menuLabel}:&nbsp;</label>
      <select className='border border-black mb-2 w-full' onChange={onChange} value={value} >
        { options.map((option: optionType) => <option key={CommonUtilities.randomHexString(20)} value={option.value}>{option.text}</option> ) }
      </select>
    </div>
  );
}