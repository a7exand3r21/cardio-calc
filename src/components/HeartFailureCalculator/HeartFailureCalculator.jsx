import React, { useState, useEffect } from 'react';
import { 
  FormControl, 
  Select, 
  MenuItem, 
  Typography,
  Grid
} from '@mui/material';

const HeartFailureCalculator = ({ isVisible, onResultChange }) => {
  const [shoksData, setShoksData] = useState({
    dyspnea: '0',           // Тенгнефесlik
    weightChange: '0',      // Çəki dəyişikliyi
    heartComplaints: '0',   // Ürək fəaliyyətinin pozulması
    bedPosition: '0',       // Yataq vəziyyəti
    neckVeins: '0',        // Boyun damarları
    wheezing: '0',         // Ağciyər xırıltıları
    rhythmGallop: '0',     // Çapma ritmi
    liver: '0',            // Qaraciyər
    edema: '0',            // Ödem
    systolicBP: '0'        // SAT səviyyəsi
  });

  const [totalScore, setTotalScore] = useState(0);
  const [functionalClass, setFunctionalClass] = useState('');

  const calculateShoks = () => {
    const score = Object.values(shoksData).reduce((sum, value) => sum + Number(value), 0);
    setTotalScore(score);

    // Определение функционального класса
    if (score <= 0) {
      setFunctionalClass('XÜÇ əlamətlərinin tam olmaması');
    } else if (score >= 1 && score <= 3) {
      setFunctionalClass('XÜÇ I FS (NYHA)');
    } else if (score >= 4 && score <= 6) {
      setFunctionalClass('XÜÇ II FS (NYHA)');
    } else if (score >= 7 && score <= 9) {
      setFunctionalClass('XÜÇ III FS (NYHA)');
    } else {
      setFunctionalClass('XÜÇ IV FS (NYHA)');
    }
  };

  useEffect(() => {
    calculateShoks();
  }, [shoksData]);

  useEffect(() => {
    if (onResultChange) {
      onResultChange({
        fullDescription: `XÜÇ zamanı klinik vəziyyətin qiymətləndirilməsi üçün şkala (KVQŞ)\n` +
          `Ümumi bal: ${totalScore}\n` +
          `${functionalClass}`,
        shortDescription: `${functionalClass} (${totalScore} bal)`
      });
    }
  }, [totalScore, functionalClass, onResultChange]);

  if (!isVisible) return null;

  return (
    <div className="heart-failure-calculator">
      <Typography variant="h6" gutterBottom>
        ÜRƏK ÇATIŞMAZLIĞI
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        XÜÇ zamanı klinik vəziyyətin qiymətləndirilməsi üçün şkala (KVQŞ)
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <Typography variant="body2">1. Təngnəfəslik</Typography>
            <Select
              value={shoksData.dyspnea}
              onChange={(e) => setShoksData({...shoksData, dyspnea: e.target.value})}
            >
              <MenuItem value="0">0 - yox</MenuItem>
              <MenuItem value="1">1 - yük altında</MenuItem>
              <MenuItem value="2">2 - istirahətdə</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <Typography variant="body2">2. Son bir həftə ərzində çəkiniz dəyişibmi?</Typography>
            <Select
              value={shoksData.weightChange}
              onChange={(e) => setShoksData({...shoksData, weightChange: e.target.value})}
            >
              <MenuItem value="0">0 - yox</MenuItem>
              <MenuItem value="1">1 - artıb</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <Typography variant="body2">3. Ürək fəaliyyətinin pozulması ilə bağlı şikayətlər</Typography>
            <Select
              value={shoksData.heartComplaints}
              onChange={(e) => setShoksData({...shoksData, heartComplaints: e.target.value})}
            >
              <MenuItem value="0">0 - yox</MenuItem>
              <MenuItem value="1">1 - hə</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <Typography variant="body2">4. Yataqda hansı vəziyyətdə olur</Typography>
            <Select
              value={shoksData.bedPosition}
              onChange={(e) => setShoksData({...shoksData, bedPosition: e.target.value})}
            >
              <MenuItem value="0">0 - üfüqi</MenuItem>
              <MenuItem value="1">1 - qaldırılmış başlıq ilə (2+ yastıq)</MenuItem>
              <MenuItem value="2">2 - həmçinin boğulmadan oyanır</MenuItem>
              <MenuItem value="3">3 - oturaq</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <Typography variant="body2">5. Şişmiş boyun damarları</Typography>
            <Select
              value={shoksData.neckVeins}
              onChange={(e) => setShoksData({...shoksData, neckVeins: e.target.value})}
            >
              <MenuItem value="0">0 - yox</MenuItem>
              <MenuItem value="1">1 - uzananda</MenuItem>
              <MenuItem value="2">2 - ayaq üstə olanda</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <Typography variant="body2">6. Ağciyərlərdə xırıltı</Typography>
            <Select
              value={shoksData.wheezing}
              onChange={(e) => setShoksData({...shoksData, wheezing: e.target.value})}
            >
              <MenuItem value="0">0 - yox</MenuItem>
              <MenuItem value="1">1 - aşağı bölmələr (1/3-ə qədər)</MenuItem>
              <MenuItem value="2">2 - kürək sümüklərinə kimi (2/3-ə qədər)</MenuItem>
              <MenuItem value="3">3 - ağciyərlərin bütün səthində</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <Typography variant="body2">7. Çapma ritminin olması</Typography>
            <Select
              value={shoksData.rhythmGallop}
              onChange={(e) => setShoksData({...shoksData, rhythmGallop: e.target.value})}
            >
              <MenuItem value="0">0 - yox</MenuItem>
              <MenuItem value="1">1 - hə</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <Typography variant="body2">8. Qaraciyər</Typography>
            <Select
              value={shoksData.liver}
              onChange={(e) => setShoksData({...shoksData, liver: e.target.value})}
            >
              <MenuItem value="0">0 - böyüməyib</MenuItem>
              <MenuItem value="1">1 - 5 sm-ə qədər</MenuItem>
              <MenuItem value="2">2 - 5 sm-dən çox</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <Typography variant="body2">9. Ödem</Typography>
            <Select
              value={shoksData.edema}
              onChange={(e) => setShoksData({...shoksData, edema: e.target.value})}
            >
              <MenuItem value="0">0 - yox</MenuItem>
              <MenuItem value="1">1 - pastozluq</MenuItem>
              <MenuItem value="2">2 - ödem</MenuItem>
              <MenuItem value="3">3 - anasarka</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <Typography variant="body2">10. SAT səviyyəsi</Typography>
            <Select
              value={shoksData.systolicBP}
              onChange={(e) => setShoksData({...shoksData, systolicBP: e.target.value})}
            >
              <MenuItem value="0">0 – >120 mm c.s.</MenuItem>
              <MenuItem value="1">1 – 100-120 mm c.s.</MenuItem>
              <MenuItem value="2">2 – {'<'}100 mm c.s.</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" className="result">
            Ümumi bal: {totalScore}
          </Typography>
          <Typography variant="body1" className="result">
            {functionalClass}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default HeartFailureCalculator; 