import { useEffect, useState } from 'react';
import { useThrottler } from './useThrottler';

const DelayApiCall = () => {
  const [value, setValue] = useState('');

  const throttleValue = useThrottler(value, 400);

  const handleTypeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (throttleValue) {
      fetch('https://jsonplaceholder.typicode.com/posts/')
        .then((d) => d.json())
        .then((data) => {
          console.log(data);
        });
    }
  }, [throttleValue]);

  return (
    <div className="container">
      <input onChange={handleTypeEvent} />
    </div>
  );
};

export default DelayApiCall;
