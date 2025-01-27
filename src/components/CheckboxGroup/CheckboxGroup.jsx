import React from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';

const CheckboxGroup = ({ onCheckboxChange }) => {
  const checkboxes = [
    { id: 'Checkbox4', label: 'Bədən kütlə indeksi' },
    { id: 'Checkbox6', label: 'Yumaqcıq filtrasiyasının sürəti' },
    { id: 'Checkbox5', label: 'Arterial hipertenziya' },
    { id: 'Checkbox1', label: 'Ürək çatışmazlığı' },
    { id: 'Checkbox2', label: 'Qulaqcıqların fibrilyasiyası' }
  ];

  return (
    <div className="checkbox-group">
      {checkboxes.map(({ id, label }) => (
        <FormControlLabel
          key={id}
          control={
            <Checkbox
              id={id}
              onChange={(e) => onCheckboxChange(id, e.target.checked)}
            />
          }
          label={label}
        />
      ))}
    </div>
  );
};

export default CheckboxGroup; 