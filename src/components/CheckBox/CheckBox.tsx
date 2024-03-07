import React from 'react';
import './custom-checkbox.scss';

type CheckBoxPropTypes = {
  label: string;
  checked: boolean;
  onChange?: (arg: HTMLInputElement | null) => void;
};

const CheckBox = (props: CheckBoxPropTypes) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onChange = () => {
    if (props.onChange) {
      props.onChange(inputRef.current);
    }
  };

  return (
    <label className="custom-checkbox">
      <input
        type="checkbox"
        ref={inputRef}
        onChange={onChange}
        checked={props.checked}
      />
      <span className="custom-checkbox__checkmark">
        <i className="bx bx-check"></i>
      </span>
      {props.label}
    </label>
  );
};

export default CheckBox;
