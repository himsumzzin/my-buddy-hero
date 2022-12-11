import { inputValidationRegex } from '@/utils';
import { useState } from 'react';

const validateInput = (name: string, value: string) => {
  return !inputValidationRegex[name]
    ? true
    : RegExp(inputValidationRegex[name]).test(value);
};

export const useInput = (initialValue: any) => {
  const [state, setState] = useState({
    value: initialValue,
    isDirty: false,
    isValid: true,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setState({
      value,
      isDirty: true,
      isValid: validateInput(name, value),
    });
  };

  return { state, onChange };
};
