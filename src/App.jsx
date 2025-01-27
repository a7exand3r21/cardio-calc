import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import PatientInfo from './components/PatientInfo/PatientInfo';
import CheckboxGroup from './components/CheckboxGroup/CheckboxGroup';
import BMICalculator from './components/BMICalculator/BMICalculator';
import GFRCalculator from './components/GFRCalculator/GFRCalculator';
import HypertensionCalculator from './components/HypertensionCalculator/HypertensionCalculator';
import HeartFailureCalculator from './components/HeartFailureCalculator/HeartFailureCalculator';
import AtrialFibrillationCalculator from './components/AtrialFibrillationCalculator/AtrialFibrillationCalculator';
import { CalculatorProvider } from './context/CalculatorContext';

const App = () => {
  const [activeCalculators, setActiveCalculators] = useState({
    Checkbox4: false, // BMI
    Checkbox6: false, // GFR
    Checkbox5: false, // Hypertension
    Checkbox1: false, // Heart failure
    Checkbox2: false  // Atrial fibrillation
  });
  const [calculatorResults, setCalculatorResults] = useState({});

  const handleCheckboxChange = (id, checked) => {
    setActiveCalculators(prev => ({
      ...prev,
      [id]: checked
    }));
  };

  const handleCalculatorResult = (calculatorId, result) => {
    setCalculatorResults(prev => ({
      ...prev,
      [calculatorId]: result
    }));
  };

  return (
    <CalculatorProvider>
      <div className="app">
        <Header />
        <div className="main-content">
          <div className="left-column">
            <BMICalculator 
              isVisible={activeCalculators.Checkbox4}
              onResultChange={(result) => handleCalculatorResult('bmi', result)}
            />
            <GFRCalculator 
              isVisible={activeCalculators.Checkbox6}
              onResultChange={(result) => handleCalculatorResult('gfr', result)}
            />
            <HypertensionCalculator 
              isVisible={activeCalculators.Checkbox5}
              onResultChange={(result) => handleCalculatorResult('hypertension', result)}
            />
            <HeartFailureCalculator 
              isVisible={activeCalculators.Checkbox1}
              onResultChange={(result) => handleCalculatorResult('heartFailure', result)}
            />
            <AtrialFibrillationCalculator 
              isVisible={activeCalculators.Checkbox2}
              onResultChange={(result) => handleCalculatorResult('atrialFibrillation', result)}
            />
          </div>
          <div className="right-column">
            <CheckboxGroup onCheckboxChange={handleCheckboxChange} />
            <PatientInfo results={calculatorResults} />
          </div>
        </div>
      </div>
    </CalculatorProvider>
  );
};

export default App; 