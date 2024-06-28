// src/TemperatureConverter.tsx

import React, { useState } from 'react';

const TemperatureConverter: React.FC = () => {
  const [celsius, setCelsius] = useState<number | string>('');
  const [fahrenheit, setFahrenheit] = useState<number | string>('');

  const handleCelsiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCelsius(value);
    if (value === '') {
      setFahrenheit('');
    } else {
      const celsiusValue = parseFloat(value);
      setFahrenheit(((celsiusValue * 9) / 5 + 32).toFixed(2));
    }
  };

  const handleFahrenheitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFahrenheit(value);
    if (value === '') {
      setCelsius('');
    } else {
      const fahrenheitValue = parseFloat(value);
      setCelsius(((fahrenheitValue - 32) * 5 / 9).toFixed(2));
    }
  };

  return (
    <div>
      <h2>Temperature Converter</h2>
      <div>
        <label>
          Celsius:
          <input type="number" value={celsius} onChange={handleCelsiusChange} />
        </label>
      </div>
      <div>
        <label>
          Fahrenheit:
          <input type="number" value={fahrenheit} onChange={handleFahrenheitChange} />
        </label>
      </div>
    </div>
  );
};

export default TemperatureConverter;
