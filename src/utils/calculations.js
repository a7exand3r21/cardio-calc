const generateHasbledDetails = (data) => {
  const details = [];
  
  if (data.hypertension) {
    details.push('Arterial hipertenziya (1)');
  }
  if (data.renalLiver) {
    details.push(`Böyrək və ya qaraciyər funksiyasının pozulması (${data.renalLiver})`);
  }
  if (data.stroke) {
    details.push('İnsult (1)');
  }
  if (data.bleeding) {
    details.push('Qanaxma (1)');
  }
  if (data.labile) {
    details.push('Labil BNN (1)');
  }
  if (data.elderly) {
    details.push('Yaşlılıq (1)');
  }
  if (data.drugs) {
    details.push(`Digər dərmanların qəbulu (${data.drugs})`);
  }

  return details;
};

const generateCha2ds2vascDetails = (data) => {
  const details = [];
  
  if (data.heartFailure) {
    details.push('Durğunluq ÜÇ/SM disfunksiyası (1)');
  }
  if (data.hypertension) {
    details.push('Arterial hipertenziya (1)');
  }
  if (data.age75) {
    details.push('75 yaşdan yuxarı (2)');
  }
  if (data.diabetes) {
    details.push('Şəkərli diabet (1)');
  }
  if (data.stroke) {
    details.push('İnsult/TİA (2)');
  }
  if (data.vascular) {
    details.push('Damar xəstəliyi (1)');
  }
  if (data.age6574) {
    details.push('Yaş 65-74 (1)');
  }
  if (data.female) {
    details.push('Qadın cinsi (1)');
  }

  return details;
};

export const calculateHasbled = (data) => {
  let score = 0;
  let risk = '';
  
  // Подсчет баллов
  if (data.hypertension) score += 1;
  if (data.renalLiver) score += data.renalLiver;
  if (data.stroke) score += 1;
  if (data.bleeding) score += 1;
  if (data.labile) score += 1;
  if (data.elderly) score += 1;
  if (data.drugs) score += data.drugs;

  // Определение риска
  if (score > 3) {
    risk = 'Yüksək qanaxma riski';
  } else {
    risk = 'Aşağı qanaxma riski';
  }

  return {
    score,
    risk,
    details: generateHasbledDetails(data)
  };
};

export const calculateCha2ds2vasc = (data) => {
  let score = 0;
  let recommendation = '';
  
  // Подсчет баллов
  if (data.heartFailure) score += 1;
  if (data.hypertension) score += 1;
  if (data.age75) score += 2;
  if (data.diabetes) score += 1;
  if (data.stroke) score += 2;
  if (data.vascular) score += 1;
  if (data.age6574) score += 1;
  if (data.female) score += 1;

  // Определение рекомендаций
  if (score === 0) {
    recommendation = 'Antikoaqulyant tövsiyə edilmir';
  } else if (score === 1) {
    recommendation = 'Antikoaqulyant tövsiyə edilə bilər';
  } else {
    recommendation = 'Antikoaqulyant tövsiyə edilir';
  }

  return {
    score,
    recommendation,
    details: generateCha2ds2vascDetails(data)
  };
}; 