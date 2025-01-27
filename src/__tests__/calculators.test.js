import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Утилита для генерации случайного числа из диапазона
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Утилита для случайного выбора из массива
const getRandomFromArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// Типичные возрастные группы для медицинских исследований
const AGE_GROUPS = [
  45, // Средний возраст
  55, // Пограничный для мужчин
  65, // Пограничный для женщин
  75, // Пожилой возраст
];

describe('Calculator Integration Tests', () => {
  beforeEach(() => {
    // Мокаем clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });
    
    // Мокаем window.location
    delete window.location;
    window.location = { href: jest.fn() };
  });

  const fillBMICalculator = async () => {
    const weight = getRandomInt(50, 120);
    const height = getRandomInt(150, 190);
    
    await userEvent.type(screen.getByLabelText(/Çəki/i), weight.toString());
    await userEvent.type(screen.getByLabelText(/Boy/i), height.toString());
    
    return { weight, height };
  };

  const fillGFRCalculator = async () => {
    const creatinine = getRandomInt(50, 200);
    const age = getRandomFromArray(AGE_GROUPS);
    const gender = getRandomFromArray(['male', 'female']);
    const race = getRandomFromArray(['asian', 'european']);
    
    await userEvent.type(screen.getByLabelText(/Kreatinin/i), creatinine.toString());
    await userEvent.type(screen.getByLabelText(/Yaş/i), age.toString());
    await userEvent.click(screen.getByLabelText(gender === 'male' ? /Kişilər/i : /Qadınlar/i));
    await userEvent.click(screen.getByLabelText(race === 'asian' ? /Asiyalılar/i : /Avropoidlər/i));
    
    return { creatinine, age, gender, race };
  };

  const fillHypertensionCalculator = async () => {
    const data = {
      ahDegree: getRandomFromArray(['0', '1', '2', '3']),
      gender: getRandomFromArray(['0', '1']),
      age: getRandomFromArray(['0', '1']),
      // ... другие поля
    };

    // Заполняем все селекты случайными значениями
    for (const [key, value] of Object.entries(data)) {
      const select = screen.getByLabelText(new RegExp(key, 'i'));
      await userEvent.selectOptions(select, value);
    }

    return data;
  };

  const fillAtrialFibrillationCalculator = async () => {
    const data = {
      heartFailure: getRandomFromArray(['0', '1']),
      hypertension: getRandomFromArray(['0', '1']),
      age75: getRandomFromArray(['0', '2']),
      // ... другие поля
    };

    for (const [key, value] of Object.entries(data)) {
      const select = screen.getByLabelText(new RegExp(key, 'i'));
      await userEvent.selectOptions(select, value);
    }

    return data;
  };

  test('should calculate all values correctly', async () => {
    const { container } = render(<App />);
    
    // Заполняем базовую информацию
    await userEvent.type(screen.getByPlaceholderText(/Xəstənin SAA/i), 'Mammed');
    await userEvent.type(screen.getByPlaceholderText(/Təvəllüd/i), getRandomFromArray(AGE_GROUPS).toString());

    // Активируем все калькуляторы
    const checkboxes = screen.getAllByRole('checkbox');
    for (const checkbox of checkboxes) {
      await userEvent.click(checkbox);
    }

    // Заполняем данные для каждого калькулятора
    const bmiData = await fillBMICalculator();
    const gfrData = await fillGFRCalculator();
    const hypertensionData = await fillHypertensionCalculator();
    const atrialFibrillationData = await fillAtrialFibrillationCalculator();

    // Получаем результаты из текстового поля
    const results = screen.getByRole('textbox', { name: /results/i }).value;

    // Проверяем результаты с помощью оригинальных функций из cardiocalculator.js
    const expectedBMI = calculateBMIOriginal(bmiData);
    const expectedGFR = calculateGFROriginal(gfrData);
    const expectedHypertension = calculateHypertensionOriginal(hypertensionData);
    const expectedAF = calculateAFOriginal(atrialFibrillationData);

    // Логируем результаты
    console.log('Test Run Results:');
    console.log('Input Data:', {
      bmiData,
      gfrData,
      hypertensionData,
      atrialFibrillationData
    });
    console.log('Actual Results:', results);
    console.log('Expected Results:', {
      bmi: expectedBMI,
      gfr: expectedGFR,
      hypertension: expectedHypertension,
      atrialFibrillation: expectedAF
    });

    // Проверяем, что результаты совпадают
    expect(results).toContain(expectedBMI.shortDescription);
    expect(results).toContain(expectedGFR.shortDescription);
    expect(results).toContain(expectedHypertension.shortDescription);
    expect(results).toContain(expectedAF.shortDescription);
  });
});

// Функции для расчета ожидаемых результатов из оригинального JS
function calculateBMIOriginal(data) {
  // Копируем логику из оригинального index_mt()
  const { weight, height } = data;
  const bmi = weight / Math.pow(height/100, 2);
  // ... остальная логика из оригинального файла
}

function calculateGFROriginal(data) {
  // Копируем логику из оригинального skf_epi()
  const { creatinine, age, gender, race } = data;
  // ... логика из оригинального файла
}

function calculateHypertensionOriginal(data) {
  // Копируем логику из оригинального str()
  // ... логика из оригинального файла
}

function calculateAFOriginal(data) {
  // Копируем логику из оригинальных chadvasc() и hasbled()
  // ... логика из оригинального файла
} 