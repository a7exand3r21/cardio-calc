import React from 'react';

const PrintView = ({ patientData, calculatorResults }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="print-view">
      <div className="print-controls">
        <button onClick={handleBack}>Geri</button>
        <button onClick={handlePrint}>Çap</button>
      </div>
      
      <div className="patient-info">
        <table>
          <tbody>
            <tr>
              <td>{patientData.name}</td>
              <td>{patientData.birthYear}</td>
              <td>{patientData.date}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {calculatorResults.map((result, index) => (
        <div key={index} className="calculator-result">
          <table>
            <thead>
              <tr>
                <td colSpan="2">
                  <strong>{result.title}</strong>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{result.value}</td>
                <td>{result.interpretation}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default PrintView; 