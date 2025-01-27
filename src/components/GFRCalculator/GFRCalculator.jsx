import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Typography, 
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel 
} from '@mui/material';

const GFRCalculator = ({ isVisible, onResultChange }) => {
  const [gfrData, setGfrData] = useState({
    creatinine: '',
    age: '',
    gender: '',
    race: ''
  });
  
  const [gfrResult, setGfrResult] = useState({
    gfr: '0',
    category: 'XBX D5'
  });

  const calculateGFR = () => {
    const { creatinine, age, gender, race } = gfrData;
    
    if (creatinine > 0 && age && gender && race) {
      let gfr = 0;
      const cr = creatinine / 88.4; // конвертация в mg/dL
      
      if (gender === 'male' && race === 'asian') {
        gfr = 163 * Math.pow(cr, -0.411) * Math.pow(0.993, age);
      } else if (gender === 'male' && race === 'european') {
        gfr = 163 * Math.pow(cr, -0.411) * Math.pow(0.993, age) * 1.159;
      } else if (gender === 'female' && race === 'asian') {
        gfr = 166 * Math.pow(cr, -0.329) * Math.pow(0.993, age);
      } else if (gender === 'female' && race === 'european') {
        gfr = 166 * Math.pow(cr, -0.329) * Math.pow(0.993, age) * 1.159;
      }

      const gfrRounded = Math.round(gfr);
      let category = '';

      if (gfrRounded >= 90) category = 'XBX C1';
      else if (gfrRounded >= 60 && gfrRounded <= 89) category = 'XBX C2';
      else if (gfrRounded >= 30 && gfrRounded <= 59) category = 'XBX C3';
      else if (gfrRounded >= 15 && gfrRounded <= 29) category = 'XBX C4';
      else if (gfrRounded <= 14) category = 'XBX C5';

      setGfrResult({
        gfr: gfrRounded.toString(),
        category
      });
    }
  };

  useEffect(() => {
    calculateGFR();
  }, [gfrData]);

  useEffect(() => {
    if (onResultChange) {
      onResultChange({
        fullDescription: `YUMAQCIQ FİLTRASİYASININ SÜRƏTİ\n` +
          `Kreatinin: ${gfrData.creatinine} mkmol/l\n` +
          `YFS: ${gfrResult.gfr} ml/dəq/1.73m²\n` +
          `${gfrResult.category}`,
        shortDescription: `YFS: ${gfrResult.gfr} ml/dəq/1.73m² (${gfrResult.category})`
      });
    }
  }, [gfrResult, gfrData.creatinine, onResultChange]);

  if (!isVisible) return null;

  return (
    <div className="gfr-calculator">
      <Typography variant="h6" gutterBottom>
        CKD-EPI 2011 ÜZRƏ YUMAQCIQ FİLTRASİYASININ SÜRƏTİNİN TƏYİNİ
      </Typography>

      <TextField
        label="Kreatinin,mkmol/l"
        type="number"
        value={gfrData.creatinine}
        onChange={(e) => setGfrData({...gfrData, creatinine: e.target.value})}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Yaş"
        type="number"
        value={gfrData.age}
        onChange={(e) => setGfrData({...gfrData, age: e.target.value})}
        fullWidth
        margin="normal"
      />

      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Irq</FormLabel>
        <RadioGroup
          row
          value={gfrData.race}
          onChange={(e) => setGfrData({...gfrData, race: e.target.value})}
        >
          <FormControlLabel 
            value="asian" 
            control={<Radio />} 
            label="Asiyalılar" 
          />
          <FormControlLabel 
            value="european" 
            control={<Radio />} 
            label="Avropoidlər" 
          />
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Cins</FormLabel>
        <RadioGroup
          row
          value={gfrData.gender}
          onChange={(e) => setGfrData({...gfrData, gender: e.target.value})}
        >
          <FormControlLabel 
            value="male" 
            control={<Radio />} 
            label="Kişilər" 
          />
          <FormControlLabel 
            value="female" 
            control={<Radio />} 
            label="Qadınlar" 
          />
        </RadioGroup>
      </FormControl>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 2
      }}>
        <Typography variant="body1">
          YFS: {gfrResult.gfr} ml/dəq/1,73m²
        </Typography>
        <Typography variant="body1">
          {gfrResult.category}
        </Typography>
      </Box>
    </div>
  );
};

export default GFRCalculator; 