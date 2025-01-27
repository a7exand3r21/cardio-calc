import React, { useState, useEffect } from 'react';
import { TextField, Typography, Box } from '@mui/material';

const BMICalculator = ({ isVisible, onResultChange }) => {
  const [bmiData, setBmiData] = useState({
    weight: '',
    height: ''
  });
  const [bmiResult, setBmiResult] = useState({
    bmi: 'NaN',
    category: 'x'
  });

  const calculateBMI = () => {
    if (bmiData.weight && bmiData.height) {
      const heightInMeters = bmiData.height / 100;
      const bmi = (bmiData.weight / (heightInMeters * heightInMeters)).toFixed(1);
      let category = '';
      
      if (bmi <= 0) {
        category = 'x';
      } else if (bmi <= 16) {
        category = 'Kəskin çəki çatışmazlığı';
      } else if (bmi > 16 && bmi <= 18.5) {
        category = 'Çəki çatışmazlığı';
      } else if (bmi > 18.5 && bmi <= 24.9) {
        category = 'Normal çəki';
      } else if (bmi > 24.9 && bmi <= 29.9) {
        category = 'Artıq çəki';
      } else if (bmi > 29.9 && bmi <= 34.9) {
        category = 'I dərəcə piylənmə';
      } else if (bmi > 34.9 && bmi <= 39.9) {
        category = 'II dərəcə piylənmə';
      } else {
        category = 'III dərəcə piylənmə';
      }

      setBmiResult({
        bmi,
        category
      });
    }
  };

  useEffect(() => {
    calculateBMI();
  }, [bmiData]);

  useEffect(() => {
    if (onResultChange) {
      onResultChange({
        fullDescription: `BƏDƏN KÜTLƏ İNDEKSİ\n` +
          `Boy: ${bmiData.height} sm\n` +
          `Çəki: ${bmiData.weight} kq\n` +
          `BKİ: ${bmiResult.bmi} kq/m²\n` +
          `${bmiResult.category}`,
        shortDescription: `BKİ: ${bmiResult.bmi} (${bmiResult.category})`
      });
    }
  }, [bmiResult.bmi, bmiResult.category, bmiData.height, bmiData.weight, onResultChange]);

  if (!isVisible) return null;

  return (
    <div className="bmi-calculator">
      <Typography variant="h6" gutterBottom>
        BƏDƏN KÜTLƏ İNDEKSİNİN HESABLAMASI
      </Typography>
      
      <div className="calculator-inputs">
        <TextField
          label="Çəki, kq"
          type="number"
          value={bmiData.weight}
          onChange={(e) => setBmiData({...bmiData, weight: e.target.value})}
          fullWidth
          margin="normal"
        />
        
        <TextField
          label="Boy, sm"
          type="number" 
          value={bmiData.height}
          onChange={(e) => setBmiData({...bmiData, height: e.target.value})}
          fullWidth
          margin="normal"
        />
      </div>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 2
      }}>
        <Typography variant="body1">
          BKİ: {bmiResult.bmi} kq/m²
        </Typography>
        <Typography variant="body1">
          {bmiResult.category}
        </Typography>
      </Box>
    </div>
  );
};

export default BMICalculator; 