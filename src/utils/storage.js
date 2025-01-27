export const saveToSessionStorage = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getFromSessionStorage = (key) => {
  const item = sessionStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const saveCalculatorResults = (results) => {
  Object.entries(results).forEach(([key, value]) => {
    saveToSessionStorage(key, value);
  });
}; 