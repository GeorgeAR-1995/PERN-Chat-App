import React from 'react'

interface GenderCheckboxProps {
  onRadioChange: (gender: "male" | "female") => void;
  selectedGender: string;
};

const GenderCheckbox: React.FC<GenderCheckboxProps> = ({onRadioChange, selectedGender}) => {
    return (
      <div className='flex'>
        <div className='form-control'>
          <label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""} `}>
            <span className='label-text'>Male</span>
            <input type='radio' name='gender' className='radio border-slate-900' 
              checked={selectedGender === "male"}
              onChange={() => onRadioChange("male")}
            />
          </label>
        </div>
        <div className='form-control'>
          <label className={`label gap-2 cursor-pointer ${selectedGender === "female" ? "selected" : ""} `}>
            <span className='label-text'>Female</span>
            <input type='radio' name='gender' className='radio border-slate-900' 
              checked={selectedGender === "female"}
              onChange={() => onRadioChange("female")}
            />
          </label>
        </div>
      </div>
    );
  };
  
export default GenderCheckbox;
  