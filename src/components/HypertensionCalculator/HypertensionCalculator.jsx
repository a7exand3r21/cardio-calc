import React, { useState, useEffect } from 'react';
import { 
  FormControl, 
  Select, 
  MenuItem, 
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Box,
  Divider
} from '@mui/material';

const HypertensionCalculator = ({ isVisible, onResultChange }) => {
  const [hypertensionData, setHypertensionData] = useState({
    ahDegree: '0',
    gender: '0',
    age: '0',
    smoking: '0',
    cholesterol: '0',
    uricAcid: '0',
    obesity: '0',
    familyHistory: '0',
    earlyHypertension: '0',
    earlyMenopause: '0',
    lifestyle: '0',
    psychosocial: '0',
    heartRate: '0',
    pulsePressure: '0',
    pwv: '0',
    lvh: '0',
    microalbuminuria: '0',
    abi: '0',
    retinopathy: '0',
    gfrMedium: false,
    gfrLow: false,
    cerebrovascular: '0',
    coronaryHeart: '0',
    atherosclerosis: '0',
    heartFailure: '0',
    peripheralArtery: '0',
    atrialFibrillation: '0',
    diabetesNoOrgan: false,
    diabetesWithOrgan: false
  });

  const [results, setResults] = useState({
    fullDescription: '',
    shortDescription: '',
    stage: '',
    riskLevel: '',
    details: []
  });

  const calculateRisk = () => {
    let riskScore = 0;
    let details = [];
    let stage = '';
    
    if (hypertensionData.ahDegree === '0') {
      stage = 'I';
    } else if (hypertensionData.ahDegree === '1') {
      stage = 'II';
    } else if (hypertensionData.ahDegree === '2' || hypertensionData.ahDegree === '3') {
      stage = 'III';
    }

    if (hypertensionData.ahDegree === '1') {
      details.push('1-ci dərəcə AH');
      riskScore += 1;
    } else if (hypertensionData.ahDegree === '2') {
      details.push('2-ci dərəcə AH');
      riskScore += 2;
    } else if (hypertensionData.ahDegree === '3') {
      details.push('3-ci dərəcə AH');
      riskScore += 3;
    }

    Object.entries(hypertensionData).forEach(([key, value]) => {
      if (value === '1') {
        switch(key) {
          case 'gender':
            details.push('kişi cinsi');
            riskScore += 1;
            break;
          case 'age':
            details.push('yaş riski');
            riskScore += 1;
            break;
          case 'smoking':
            details.push('tütün çəkmə');
            riskScore += 1;
            break;
          case 'cholesterol':
            details.push('Ümumi xolesterin və ASLP');
            riskScore += 1;
            break;
          case 'uricAcid':
            details.push('Sidik turşusu');
            riskScore += 1;
            break;
          case 'obesity':
            details.push('Əlavə çəki və ya piylənmə');
            riskScore += 1;
            break;
          case 'familyHistory':
            details.push('Ailədə erkən ürək-damar xəstəlikləri');
            riskScore += 1;
            break;
          case 'earlyHypertension':
            details.push('Qohumlarda və ya valideynlərdə erkən hipertenziya');
            riskScore += 1;
            break;
          case 'earlyMenopause':
            details.push('Menopauzanın erkən başlanğıcı');
            riskScore += 1;
            break;
          case 'lifestyle':
            details.push('Oturaq həyat tərzi');
            riskScore += 1;
            break;
          case 'psychosocial':
            details.push('Psixoloji və ya sosial-iqtisadi amillər');
            riskScore += 1;
            break;
          case 'heartRate':
            details.push('Ürək vurğularının tezliyi');
            riskScore += 1;
            break;
          case 'pulsePressure':
            details.push('Nəbz təzyiqi');
            riskScore += 1;
            break;
          case 'pwv':
            details.push('Karotid-femoral nəbz dalğasının sürəti');
            riskScore += 1;
            break;
          case 'lvh':
            details.push('EKQ-də SMH');
            riskScore += 1;
            break;
          case 'microalbuminuria':
            details.push('Mikroalbuminuriya');
            riskScore += 1;
            break;
          case 'abi':
            details.push('Topuq-bazu indeksi');
            riskScore += 1;
            break;
          case 'retinopathy':
            details.push('Retinopatiya');
            riskScore += 1;
            break;
          case 'gfrMedium':
            details.push('YFS>30-59 ml/dəq/1.73m2');
            riskScore += 1;
            break;
          case 'gfrLow':
            details.push('XBX C4');
            riskScore += 1;
            break;
          case 'cerebrovascular':
            details.push('Serebrovaskulyar xəstəliklər');
            riskScore += 1;
            break;
          case 'coronaryHeart':
            details.push('ÜİX');
            riskScore += 1;
            break;
          case 'atherosclerosis':
            details.push('Ateromatoz plak');
            riskScore += 1;
            break;
          case 'heartFailure':
            details.push('Ürək çatışmazlığı');
            riskScore += 1;
            break;
          case 'peripheralArtery':
            details.push('Periferik arteriyaların xəstəliyi');
            riskScore += 1;
            break;
          case 'atrialFibrillation':
            details.push('Qulaqcıqların fibrilyasiyası');
            riskScore += 1;
            break;
        }
      }
    });

    if (hypertensionData.diabetesWithOrgan) {
      details.push('orqan zədələnməsi ilə şəkərli diabet');
      riskScore += 2;
    } else if (hypertensionData.diabetesNoOrgan) {
      details.push('şəkərli diabet');
      riskScore += 1;
    }

    let riskLevel = '';
    if (riskScore <= 1) {
      riskLevel = 'ürək-damar hadisələrinin aşağı riski';
    } else if (riskScore <= 2) {
      riskLevel = 'ürək-damar hadisələrinin orta riski';
    } else if (riskScore <= 4) {
      riskLevel = 'ürək-damar hadisələrinin yüksək riski';
    } else {
      riskLevel = 'ürək-damar hadisələrinin çox yüksək riski';
    }

    const fullDescription = `ÜMUMİ ÜRƏK-DAMAR RİSKİNİN STRATİFİKASİYASI ESH/ESC 2018\n` +
      `AH dərəcəsi - ${hypertensionData.ahDegree}\n` +
      `Risk faktorları: ${details.join('; ')}\n` + 
      `Nəticə: ${riskLevel}`;
    
    const shortDescription = `Hipertoniya xəstəliyi ${stage} mərhələ, ` +
      `AH dərəcəsi-${hypertensionData.ahDegree}, ${riskLevel}`;

    setResults({
      fullDescription,
      shortDescription,
      stage,
      riskLevel,
      details
    });
  };

  useEffect(() => {
    calculateRisk();
  }, [hypertensionData]);

  useEffect(() => {
    if (onResultChange) {
      onResultChange({
        fullDescription: results.fullDescription,
        shortDescription: results.shortDescription
      });
    }
  }, [results, onResultChange]);

  if (!isVisible) return null;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        ARTERİAL HİPERTENZİYA
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        ÜMUMİ ÜRƏK-DAMAR RİSKİNİN STRATİFİKASİYASI ESH/ESC 2018
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
        Demoqrafik xüsusiyyətlər və laboratoriya parametrləri
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>AH dərəcəsi</InputLabel>
        <Select
          value={hypertensionData.ahDegree}
          onChange={(e) => setHypertensionData({...hypertensionData, ahDegree: e.target.value})}
        >
          <MenuItem value="0">yüksək normal</MenuItem>
          <MenuItem value="1">1-ci dərəcə AH</MenuItem>
          <MenuItem value="2">2-ci dərəcə AH</MenuItem>
          <MenuItem value="3">3-ci dərəcə AH</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Cins (kişilər {'>'} qadınlardan)</InputLabel>
        <Select
          value={hypertensionData.gender}
          onChange={(e) => setHypertensionData({...hypertensionData, gender: e.target.value})}
        >
          <MenuItem value="0">qadın</MenuItem>
          <MenuItem value="1">kişi</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Yaş (kişilər {'>'} 55 yaş və qadınlar {'>'} 65yaş)</InputLabel>
        <Select
          value={hypertensionData.age}
          onChange={(e) => setHypertensionData({...hypertensionData, age: e.target.value})}
        >
          <MenuItem value="0">Kişi{'<'}55 və ya Qadın{'<'}65</MenuItem>
          <MenuItem value="1">Kişi{'>'}55 və ya Qadın{'>'}65</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Typography variant="body2">Tütün çəkmə</Typography>
        <Select
          value={hypertensionData.smoking}
          onChange={(e) => setHypertensionData({...hypertensionData, smoking: e.target.value})}
        >
          <MenuItem value="0">yox</MenuItem>
          <MenuItem value="1">bəli</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Typography variant="body2">Ümumi xolesterin və ASLP</Typography>
        <Select
          value={hypertensionData.cholesterol}
          onChange={(e) => setHypertensionData({...hypertensionData, cholesterol: e.target.value})}
        >
          <MenuItem value="0">ÜX{'<'}5,0 (190); ASLP {'<'} 3,0 (115)</MenuItem>
          <MenuItem value="1">ÜX{'>'}5,0 (190); ASLP {'>'} 3,0 (115)</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Typography variant="body2">Sidik turşusu</Typography>
        <Select
          value={hypertensionData.uricAcid}
          onChange={(e) => setHypertensionData({...hypertensionData, uricAcid: e.target.value})}
        >
          <MenuItem value="0">normada</MenuItem>
          <MenuItem value="1">normadan yüksək</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Typography variant="body2">Əlavə çəki və ya piylənmə</Typography>
        <Select
          value={hypertensionData.obesity}
          onChange={(e) => setHypertensionData({...hypertensionData, obesity: e.target.value})}
        >
          <MenuItem value="0">yox</MenuItem>
          <MenuItem value="1">bəli</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Typography variant="body2">Ailədə erkən ürək-damar xəstəlikləri</Typography>
        <Select
          value={hypertensionData.familyHistory}
          onChange={(e) => setHypertensionData({...hypertensionData, familyHistory: e.target.value})}
        >
          <MenuItem value="0">yox</MenuItem>
          <MenuItem value="1">bəli</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Typography variant="body2">Qohumlarda və ya valideynlərdə erkən hipertenziya</Typography>
        <Select
          value={hypertensionData.earlyHypertension}
          onChange={(e) => setHypertensionData({...hypertensionData, earlyHypertension: e.target.value})}
        >
          <MenuItem value="0">yox</MenuItem>
          <MenuItem value="1">bəli</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Typography variant="body2">Menopauzanın erkən başlanğıcı</Typography>
        <Select
          value={hypertensionData.earlyMenopause}
          onChange={(e) => setHypertensionData({...hypertensionData, earlyMenopause: e.target.value})}
        >
          <MenuItem value="0">yox</MenuItem>
          <MenuItem value="1">bəli</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Typography variant="body2">Oturaq həyat tərzi</Typography>
        <Select
          value={hypertensionData.lifestyle}
          onChange={(e) => setHypertensionData({...hypertensionData, lifestyle: e.target.value})}
        >
          <MenuItem value="0">yox</MenuItem>
          <MenuItem value="1">bəli</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Typography variant="body2">Psixoloji və ya sosial-iqtisadi amillər</Typography>
        <Select
          value={hypertensionData.psychosocial}
          onChange={(e) => setHypertensionData({...hypertensionData, psychosocial: e.target.value})}
        >
          <MenuItem value="0">yox</MenuItem>
          <MenuItem value="1">bəli</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Typography variant="body2">Ürək vurğularının tezliyi</Typography>
        <Select
          value={hypertensionData.heartRate}
          onChange={(e) => setHypertensionData({...hypertensionData, heartRate: e.target.value})}
        >
          <MenuItem value="0">{'ürək vurğularının tezliyi<80 döyüntü/dəq'}</MenuItem>
          <MenuItem value="1">{'ürək vurğularının tezliyi>80 döyüntü/dəq sakit halda'}</MenuItem>
        </Select>
      </FormControl>

      <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
        Hədəf orqanların asimptomatik hipertenziv zədələnməsi
      </Typography>

      <FormControl fullWidth margin="normal">
        <Typography variant="body2">Nəbz təzyiqi</Typography>
        <Select
          value={hypertensionData.pulsePressure}
          onChange={(e) => setHypertensionData({...hypertensionData, pulsePressure: e.target.value})}
        >
          <MenuItem value="0">{'>60 mm c.s. yaşlılarda'}</MenuItem>
          <MenuItem value="1">{'<60 mm c.s.'}</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Typography variant="body2">Karotid-femoral nəbz dalğasının sürəti</Typography>
        <Select
          value={hypertensionData.pwv}
          onChange={(e) => setHypertensionData({...hypertensionData, pwv: e.target.value})}
        >
          <MenuItem value="0">{'<10ms'}</MenuItem>
          <MenuItem value="1">{'>10ms'}</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Typography variant="body2">EKQ-də SMH</Typography>
        <Select
          value={hypertensionData.lvh}
          onChange={(e) => setHypertensionData({...hypertensionData, lvh: e.target.value})}
        >
          <MenuItem value="0">yox</MenuItem>
          <MenuItem value="1">Sokolov-L{'>'}35mm, R-AvL{'>'}11mm, Kornel{'>'}2440mm/ms</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Typography variant="body2">Mikroalbuminuriya</Typography>
        <Select
          value={hypertensionData.microalbuminuria}
          onChange={(e) => setHypertensionData({...hypertensionData, microalbuminuria: e.target.value})}
        >
          <MenuItem value="0">yox</MenuItem>
          <MenuItem value="1">30-300 mq/sut və ya albumin/kreatinin 30-300 mq/q</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Typography variant="body2">Topuq-bazu indeksi</Typography>
        <Select
          value={hypertensionData.abi}
          onChange={(e) => setHypertensionData({...hypertensionData, abi: e.target.value})}
        >
          <MenuItem value="0">{'>0.9'}</MenuItem>
          <MenuItem value="1">{'<0.9'}</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Typography variant="body2">Retinopatiya</Typography>
        <Select
          value={hypertensionData.retinopathy}
          onChange={(e) => setHypertensionData({...hypertensionData, retinopathy: e.target.value})}
        >
          <MenuItem value="0">yox</MenuItem>
          <MenuItem value="1">hemorraqiyalar və ya ekssudat; papillanın ödemi</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Typography variant="body2">YFS {'>'} 30-59 ml/dəq/1.73m2</Typography>
        <Select
          value={hypertensionData.gfrMedium ? '1' : '0'}
          onChange={(e) => setHypertensionData({
            ...hypertensionData,
            gfrMedium: e.target.value === '1'
          })}
        >
          <MenuItem value="0">yox</MenuItem>
          <MenuItem value="1">bəli</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Typography variant="body2">XBX C4</Typography>
        <Select
          value={hypertensionData.gfrLow ? '1' : '0'}
          onChange={(e) => setHypertensionData({
            ...hypertensionData,
            gfrLow: e.target.value === '1'
          })}
        >
          <MenuItem value="0">yox</MenuItem>
          <MenuItem value="1">bəli</MenuItem>
        </Select>
      </FormControl>

      <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
        Müəyyən edilmiş ürək damar xəstəliyi və ya böyrək xəstəliyi
      </Typography>

      <FormControl fullWidth margin="normal">
        <Typography variant="body2">Serebrovaskulyar xəstəliklər</Typography>
        <Select
          value={hypertensionData.cerebrovascular}
          onChange={(e) => setHypertensionData({...hypertensionData, cerebrovascular: e.target.value})}
        >
          <MenuItem value="0">yox</MenuItem>
          <MenuItem value="1">işemik insult, TİA, beyin qanaması</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Typography variant="body2">ÜİX</Typography>
        <Select
          value={hypertensionData.coronaryHeart}
          onChange={(e) => setHypertensionData({...hypertensionData, coronaryHeart: e.target.value})}
        >
          <MenuItem value="0">yox</MenuItem>
          <MenuItem value="1">miokard infarktı, stenokardiya, koronar revaskulyarizasiya</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Typography variant="body2">Ateromatoz plak</Typography>
        <Select
          value={hypertensionData.atherosclerosis}
          onChange={(e) => setHypertensionData({...hypertensionData, atherosclerosis: e.target.value})}
        >
          <MenuItem value="0">yox</MenuItem>
          <MenuItem value="1">Görüntülərdə ateromatoz plakın (düyünün) olması</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Typography variant="body2">Ürək çatışmazlığı</Typography>
        <Select
          value={hypertensionData.heartFailure}
          onChange={(e) => setHypertensionData({...hypertensionData, heartFailure: e.target.value})}
        >
          <MenuItem value="0">yox</MenuItem>
          <MenuItem value="1">Saxlanılmış SMAF ilə XÜÇ daxil olmaqla ürək çatışmazlığı</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Typography variant="body2">Periferik arteriyaların xəstəliyi</Typography>
        <Select
          value={hypertensionData.peripheralArtery}
          onChange={(e) => setHypertensionData({...hypertensionData, peripheralArtery: e.target.value})}
        >
          <MenuItem value="0">yox</MenuItem>
          <MenuItem value="1">Periferik arteriyaların xəstəliyi</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Typography variant="body2">Qulaqcıqların fibrilyasiyası</Typography>
        <Select
          value={hypertensionData.atrialFibrillation}
          onChange={(e) => setHypertensionData({...hypertensionData, atrialFibrillation: e.target.value})}
        >
          <MenuItem value="0">yox</MenuItem>
          <MenuItem value="1">Qulaqcıqların fibrilyasiyası</MenuItem>
        </Select>
      </FormControl>

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={hypertensionData.diabetesNoOrgan}
              onChange={(e) => setHypertensionData({
                ...hypertensionData,
                diabetesNoOrgan: e.target.checked,
                diabetesWithOrgan: e.target.checked ? false : hypertensionData.diabetesWithOrgan
              })}
            />
          }
          label="Orqan zədələnməməsi ilə şəkərli diabet"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={hypertensionData.diabetesWithOrgan}
              onChange={(e) => setHypertensionData({
                ...hypertensionData,
                diabetesWithOrgan: e.target.checked,
                diabetesNoOrgan: e.target.checked ? false : hypertensionData.diabetesNoOrgan
              })}
            />
          }
          label="Orqanların zədələnməsi ilə şəkərli diabet"
        />
      </FormGroup>

      <Box sx={{ 
        mt: 3, 
        p: 2, 
        bgcolor: 'background.paper', 
        borderRadius: 1,
        whiteSpace: 'pre-line'
      }}>
        <Typography 
          variant="body1" 
          gutterBottom 
          component="pre"
          sx={{ 
            fontFamily: 'inherit',
            whiteSpace: 'pre-line',
            mb: 2
          }}
        >
          {results.fullDescription}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          {results.shortDescription}
        </Typography>
      </Box>
    </Box>
  );
};

export default HypertensionCalculator; 