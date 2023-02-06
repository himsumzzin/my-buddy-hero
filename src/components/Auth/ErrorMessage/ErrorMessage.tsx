import styles from './ErrorMessage.module.css';
import { Message } from '../Message';
interface Ierror {
  [key: string]: string;
}

interface Itouched {
  [key: string]: boolean;
}

export type ErrorMessageProps = {
  /**
   * 어떤 인풋의 에러메세지로 사용할건지 양식을 선택하세요. <br>
   * 사용할 input에 짝을 맞춰 넣어주세요.<br>
   * name을 키값으로 사용해 error, touched 객체의 value를 확인하여 error 발생 유무를 판단합니다. <br>
   * touched의 value가 true이고 error의 value가 빈문자열이 아닐 때, 에러로 판단하여 에러메세지를 나타냅니다.
   */
  name?: string;
  /**
   * onBlur 이벤트가 발생했는지 나타내는 객체입니다. <br>
   * key는 name, value는 boolean 값으로 되어있습니다. <br>
   * useForm 훅의 return 값을 사용합니다.
   */
  touched: Itouched;
  /**
   * 각 input의 에러메세지를 나타내는 객체입니다. <br>
   * key는 name, value는 string 값으로 되어있습니다. <br>
   * useForm 훅의 return 값을 사용합니다.
   */
  errors: Ierror;
  /**
   * 페이지 내에서 컴포넌트를 선택해 특정 스타일링을 주고 싶을 때 클래스 이름으로 사용
   */
  className?: string;
};

export function ErrorMessage({
  name,
  touched,
  errors,
  className,
}: ErrorMessageProps) {
  if (!name) return null;
  if (!touched[name] || !errors[name]) {
    return null;
  }
  return <Message className={className} error={errors[name]} />;
}
