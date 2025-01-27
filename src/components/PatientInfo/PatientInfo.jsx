import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  TextareaAutosize,
  Box,
  Paper 
} from '@mui/material';

const PatientInfo = ({ results }) => {
  const [patientData, setPatientData] = useState({
    name: '',
    birthYear: '',
    currentYear: new Date().getFullYear().toString(),
    additionalInfo: ''
  });

  const formatResults = () => {
    let text = '';
    
    // Информация о пациенте
    if (patientData.name || patientData.birthYear) {
      text += `Xəstə: ${patientData.name}\n`;
      text += `Təvəllüd: ${patientData.birthYear}\n\n`;
    }

    // BMI результаты
    if (results.bmi) {
      text += results.bmi.fullDescription + '\n\n';
    }

    // GFR результаты
    if (results.gfr) {
      text += results.gfr.fullDescription + '\n\n';
    }

    // Hypertension результаты
    if (results.hypertension) {
      text += results.hypertension.fullDescription + '\n\n';
    }

    // Heart Failure результаты
    if (results.heartFailure) {
      text += results.heartFailure.fullDescription + '\n\n';
    }

    // Atrial Fibrillation результаты
    if (results.atrialFibrillation) {
      text += results.atrialFibrillation.fullDescription + '\n\n';
    }

    // Краткие результаты
    let shortResults = [];
    if (results.bmi) shortResults.push(results.bmi.shortDescription);
    if (results.gfr) shortResults.push(results.gfr.shortDescription);
    if (results.hypertension) shortResults.push(results.hypertension.shortDescription);
    if (results.heartFailure) shortResults.push(results.heartFailure.shortDescription);
    if (results.atrialFibrillation) shortResults.push(results.atrialFibrillation.shortDescription);

    if (shortResults.length > 0) {
      text += 'Qısa nəticələr:\n';
      text += shortResults.join('\n');
    }

    return text;
  };

  const handlePrint = () => {
    // Реализация печати
    window.location.href = 'pechat.html';
  };

  const handleCopy = () => {
    const text = formatResults();
    navigator.clipboard.writeText(text);
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <TextField
          id="Editbox4"
          placeholder="Xəstənin SAA"
          value={patientData.name}
          onChange={(e) => setPatientData({...patientData, name: e.target.value})}
          fullWidth
          size="small"
          sx={{ mb: 1 }}
        />
        <TextField
          id="Editbox5"
          type="number"
          placeholder="Təvəllüd (il)"
          value={patientData.birthYear}
          onChange={(e) => setPatientData({...patientData, birthYear: e.target.value})}
          fullWidth
          size="small"
        />
      </Box>
      
      <Box sx={{ 
        display: 'flex', 
        gap: 1,
        mb: 2
      }}>
        <Button 
          variant="contained" 
          onClick={handlePrint}
          size="small"
          fullWidth
        >
          Çap etmək
        </Button>
        <Button 
          variant="contained" 
          onClick={handleCopy}
          size="small"
          fullWidth
        >
          Kopyalamaq
        </Button>
      </Box>
      
      <TextareaAutosize
        id="TextArea5"
        minRows={10}
        style={{ 
          width: '100%',
          padding: '8px',
          fontFamily: 'inherit',
          fontSize: '14px',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}
        value={formatResults()}
        readOnly
      />
    </Paper>
  );
};

export default PatientInfo; 