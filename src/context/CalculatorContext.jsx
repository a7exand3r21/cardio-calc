import React, { createContext, useContext, useState } from 'react';
import { saveToSessionStorage } from '../utils/storage';

const CalculatorContext = createContext();

export const CalculatorProvider = ({ children }) => {
  const [patientData, setPatientData] = useState({
    name: '',
    birthYear: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [calculatorResults, setCalculatorResults] = useState({
    bmi: null,
    gfr: null,
    hypertension: null,
    heartFailure: null,
    atrialFibrillation: null
  });

  const updatePatientData = (data) => {
    setPatientData(prev => ({...prev, ...data}));
    saveToSessionStorage('patientData', {...patientData, ...data});
  };

  const updateCalculatorResults = (type, results) => {
    setCalculatorResults(prev => ({...prev, [type]: results}));
    saveToSessionStorage(`${type}Results`, results);
  };

  return (
    <CalculatorContext.Provider value={{
      patientData,
      calculatorResults,
      updatePatientData,
      updateCalculatorResults
    }}>
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => useContext(CalculatorContext); 