import React from 'react';
interface radio {
  name: string;
  defaultValue: string;
  options: any;
  onChange: any;
  disabled: boolean;
}
function RadioGroup({ name, defaultValue, options, onChange, disabled }: radio) {
  return (
    <div className="radio-group">
      {options.map((option: any) => (
        <label key={option.label} className="radio-option" style={{ width: `${100 / options.length}%` }}>
          <input
            name={name}
            defaultChecked={`${option.value}` === `${defaultValue}`}
            value={option.value}
            type="radio"
            onChange={onChange}
            disabled={disabled}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
}

export default RadioGroup;
