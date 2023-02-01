import { useCallback, useEffect, useState } from 'react';

interface IinitialValues {
  [key: string]: string;
}

interface Ierror {
  [key: string]: string;
}

interface Itouched {
  [key: string]: boolean;
}

interface IuseForm {
  initialValues: IinitialValues;
  validate: (values: IinitialValues) => Ierror;
  onSubmit: (values: IinitialValues) => void;
}

export const useForm = ({ initialValues, validate, onSubmit }: IuseForm) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Ierror>({});
  const [touched, setTouched] = useState<Itouched>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTouched({
      ...touched,
      [e.target.name]: true,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(values);
  };

  const runValidator = useCallback(() => validate(values), [values]);

  const getFieldProps = (name: string) => {
    const value = values[name];
    const onBlur = handleBlur;
    const onChange = handleChange;

    return {
      name,
      value,
      onBlur,
      onChange,
    };
  };

  useEffect(() => {
    const errors = runValidator();
    setErrors(errors);
  }, [runValidator]);

  const isValid = () => {
    return (
      Object.values(errors).every((err) => err === '') &&
      Object.values(values).every((val) => val !== '')
    );
  };

  return {
    values,
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    isValid,
  };
};
