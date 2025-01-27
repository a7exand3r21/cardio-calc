import React, { useState, useEffect } from 'react';
import { 
  FormControl, 
  Select, 
  MenuItem, 
  Typography,
  Grid,
  Divider
} from '@mui/material';

const AtrialFibrillationCalculator = ({ isVisible, onResultChange }) => {
  const [afData, setAfData] = useState({
    // CHA2DS2-VASc факторы
    heartFailure: '0',      // Сердечная недостаточность
    hypertension: '0',      // Гипертония
    age75: '0',            // Возраст ≥75
    diabetes: '0',         // Диабет
    stroke: '0',           // Инсульт/ТИА
    vascularDisease: '0',  // Сосудистые заболевания
    age6574: '0',         // Возраст 65-74
    gender: '0',           // Женский пол

    // HAS-BLED факторы
    hasHypertension: '0',  // Гипертония
    renalLiver: '0',       // Почечная/печеночная дисфункция
    hasStroke: '0',        // Инсульт
    bleeding: '0',         // Кровотечение
    labile: '0',           // Лабильное МНО
    elderly: '0',          // Возраст >65
    drugs: '0'             // Лекарства/алкоголь
  });

  const [cha2ds2Score, setCha2ds2Score] = useState(0);
  const [hasbledScore, setHasbledScore] = useState(0);
  const [recommendation, setRecommendation] = useState('');
  const [bleedingRisk, setBleedingRisk] = useState('');

  const calculateScores = () => {
    // Расчет CHA2DS2-VASc
    let cha2ds2 = 0;
    cha2ds2 += Number(afData.heartFailure);
    cha2ds2 += Number(afData.hypertension);
    cha2ds2 += Number(afData.age75) * 2;
    cha2ds2 += Number(afData.diabetes);
    cha2ds2 += Number(afData.stroke) * 2;
    cha2ds2 += Number(afData.vascularDisease);
    cha2ds2 += Number(afData.age6574);
    cha2ds2 += Number(afData.gender);
    setCha2ds2Score(cha2ds2);

    // Расчет HAS-BLED
    let hasbled = 0;
    hasbled += Number(afData.hasHypertension);
    hasbled += Number(afData.renalLiver);
    hasbled += Number(afData.hasStroke);
    hasbled += Number(afData.bleeding);
    hasbled += Number(afData.labile);
    hasbled += Number(afData.elderly);
    hasbled += Number(afData.drugs);
    setHasbledScore(hasbled);

    // Определение рекомендаций
    if (cha2ds2 === 0) {
      setRecommendation('Antikoaqulyant tövsiyə edilmir');
    } else if (cha2ds2 === 1) {
      setRecommendation('Antikoaqulyant tövsiyə edilə bilər');
    } else {
      setRecommendation('Antikoaqulyant tövsiyə edilir');
    }

    // Оценка риска кровотечения
    if (hasbled <= 2) {
      setBleedingRisk('Aşağı qanaxma riski');
    } else if (hasbled === 3) {
      setBleedingRisk('Orta qanaxma riski');
    } else {
      setBleedingRisk('Yüksək qanaxma riski');
    }
  };

  useEffect(() => {
    calculateScores();
  }, [afData]);

  useEffect(() => {
    if (onResultChange) {
      onResultChange({
        fullDescription: `QULAQCIQLARIN FİBRİLYASİYASI\n` +
          `CHA2DS2-VASc: ${cha2ds2Score} bal\n` +
          `${recommendation}\n\n` +
          `HAS-BLED: ${hasbledScore} bal\n` +
          `${bleedingRisk}`,
        shortDescription: `QF - CHA2DS2-VASc: ${cha2ds2Score} bal, ` +
          `HAS-BLED: ${hasbledScore} bal`
      });
    }
  }, [cha2ds2Score, hasbledScore, recommendation, bleedingRisk, onResultChange]);

  if (!isVisible) return null;

  return (
    <div className="atrial-fibrillation-calculator">
      <Typography variant="h6" gutterBottom>
        QULAQCIQLARIN FİBRİLYASİYASI
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        CHA2DS2-VASc şkalası
      </Typography>

      <Grid container spacing={2}>
        {/* CHA2DS2-VASc факторы */}
        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <Typography variant="body2">Klinik ÜÇ, SM-in orta və ağır sistolik disfunksiyası</Typography>
            <Select
              value={afData.heartFailure}
              onChange={(e) => setAfData({...afData, heartFailure: e.target.value})}
            >
              <MenuItem value="0">Yox</MenuItem>
              <MenuItem value="1">Hə</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <Typography variant="body2">Arterial hipertenziya</Typography>
            <Select
              value={afData.hypertension}
              onChange={(e) => setAfData({...afData, hypertension: e.target.value})}
            >
              <MenuItem value="0">Yox</MenuItem>
              <MenuItem value="1">Hə</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <Typography variant="body2">75 yaşdan yuxarı</Typography>
            <Select
              value={afData.age75}
              onChange={(e) => setAfData({...afData, age75: e.target.value})}
            >
              <MenuItem value="0">Yox</MenuItem>
              <MenuItem value="2">Hə</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <Typography variant="body2">Şəkərli diabet</Typography>
            <Select
              value={afData.diabetes}
              onChange={(e) => setAfData({...afData, diabetes: e.target.value})}
            >
              <MenuItem value="0">Yox</MenuItem>
              <MenuItem value="1">Hə</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <Typography variant="body2">İnsult/TİA/tromboemboliya</Typography>
            <Select
              value={afData.stroke}
              onChange={(e) => setAfData({...afData, stroke: e.target.value})}
            >
              <MenuItem value="0">Yox</MenuItem>
              <MenuItem value="2">Hə</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <Typography variant="body2">Ürəyin işemik xəstəliyi, periferik arteroskleroz</Typography>
            <Select
              value={afData.vascularDisease}
              onChange={(e) => setAfData({...afData, vascularDisease: e.target.value})}
            >
              <MenuItem value="0">Yox</MenuItem>
              <MenuItem value="1">Hə</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <Typography variant="body2">Yaş 65-74</Typography>
            <Select
              value={afData.age6574}
              onChange={(e) => setAfData({...afData, age6574: e.target.value})}
            >
              <MenuItem value="0">Yox</MenuItem>
              <MenuItem value="1">Hə</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <Typography variant="body2">Qadın cinsi</Typography>
            <Select
              value={afData.gender}
              onChange={(e) => setAfData({...afData, gender: e.target.value})}
            >
              <MenuItem value="0">Yox</MenuItem>
              <MenuItem value="1">Hə</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Divider />
          <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
            HAS-BLED şkalası
          </Typography>
        </Grid>

        {/* HAS-BLED факторы */}
        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <Typography variant="body2">Arterial hipertenziya</Typography>
            <Select
              value={afData.hasHypertension}
              onChange={(e) => setAfData({...afData, hasHypertension: e.target.value})}
            >
              <MenuItem value="0">Yox</MenuItem>
              <MenuItem value="1">Hə</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <Typography variant="body2">Böyrək və ya qaraciyər funksiyasının pozulması</Typography>
            <Select
              value={afData.renalLiver}
              onChange={(e) => setAfData({...afData, renalLiver: e.target.value})}
            >
              <MenuItem value="0">Yox</MenuItem>
              <MenuItem value="1">Bir orqan</MenuItem>
              <MenuItem value="2">Hər ikisi</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <Typography variant="body2">İnsult</Typography>
            <Select
              value={afData.hasStroke}
              onChange={(e) => setAfData({...afData, hasStroke: e.target.value})}
            >
              <MenuItem value="0">Yox</MenuItem>
              <MenuItem value="1">Hə</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <Typography variant="body2">Qanaxma</Typography>
            <Select
              value={afData.bleeding}
              onChange={(e) => setAfData({...afData, bleeding: e.target.value})}
            >
              <MenuItem value="0">Yox</MenuItem>
              <MenuItem value="1">Hə</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <Typography variant="body2">Labil BNN</Typography>
            <Select
              value={afData.labile}
              onChange={(e) => setAfData({...afData, labile: e.target.value})}
            >
              <MenuItem value="0">Yox</MenuItem>
              <MenuItem value="1">Hə</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <Typography variant="body2">Yaşlılıq (65 yaşdan yuxarı)</Typography>
            <Select
              value={afData.elderly}
              onChange={(e) => setAfData({...afData, elderly: e.target.value})}
            >
              <MenuItem value="0">Yox</MenuItem>
              <MenuItem value="1">Hə</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <Typography variant="body2">Dərmanlar/alkoqol</Typography>
            <Select
              value={afData.drugs}
              onChange={(e) => setAfData({...afData, drugs: e.target.value})}
            >
              <MenuItem value="0">Yox</MenuItem>
              <MenuItem value="1">Bir faktor</MenuItem>
              <MenuItem value="2">Hər ikisi</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" className="result">
            CHA2DS2-VASc: {cha2ds2Score} bal
          </Typography>
          <Typography variant="body1" className="result">
            {recommendation}
          </Typography>
          <Typography variant="h6" className="result">
            HAS-BLED: {hasbledScore} bal
          </Typography>
          <Typography variant="body1" className="result">
            {bleedingRisk}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default AtrialFibrillationCalculator; 