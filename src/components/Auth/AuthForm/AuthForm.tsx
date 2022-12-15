import styles from './AuthForm.module.css';
import { FormEvent, Fragment } from 'react';
import { AuthInput } from '@/components/Auth/AuthInput';
import { Button } from '@/components/common';

interface IinputValue {
  [key: string]: { value: string; isDirty: boolean };
}
interface IformInfo {
  [key: string]: {
    id: string;
    type: string;
    errMsg: string;
    labelText: string;
    size?: 'sm' | 'md' | 'lg'; // 기본값 lg
    maxLength?: number;
    className?: string;
    regex?: RegExp;
    check?: string;
  };
}
interface IserverError {
  id: string;
  message: string;
}

export type AuthFormProps = {
  /**
   * 인풋의 value를 설정해주세요 <br>
   * AuthForm 컴포넌트 외부에서 input value와 isDirty state를 관리합니다. <br>
   * ex ) <br>
   * { <br>
   *  id: {value: 'hi', isDirty: true}, <br>
   *  password: {value: '', isDirty: false} <br>
   * } <br>
   * <br>
   * step 1. useState로 inputValue를 선언해줍니다. <br>
   * const [inputValue, setInputValue] = useState<IinputValue>({}); <br>
   * <br>
   * step 2. props로 inputValue를 넘겨줍니다.
   */
  inputValue: IinputValue;

  /**
   * 인풋의 정보들을 담은 객체를 넘겨줍니다. <br>
   * 이 객체를 바탕으로 인풋을 생성합니다. 각 객체가 인풋이 됩니다.<br>
   * ex) <br>
   * { <br>
   *   password: { <br>
   *    id: 'password', <br>
   *    type: 'password', <br>
   *    errMsg: '형식에 맞는 password를 입력해주세요', <br>
   *    labelText: 'password 입력!!', <br>
   *    size: 'lg', <br>
   *    maxLength: 20, <br>
   *    className: 'red-border', <br>
   *    regex: /^[a-z]+[a-z0-9]{5,19}$/, <br>
   *   }, <br>
   *   passwordCheck: { <br>
   *    id: 'passwordCheck', <br>
   *    type: 'password', <br>
   *    errMsg: 'password가 다릅니다.', <br>
   *    labelText: 'password 입력!!', <br>
   *    size: 'lg', <br>
   *    maxLength: 20, <br>
   *    className: 'red-border', <br>
   *    check: 'password' <br>
   *   }, <br>
   * } <br>
   * <br>
   * 프로퍼티 설명 <br>
   * id : id를 통해서 각각의 인풋을 구분해줍니다. 객체의 키값과 동일해야 하고 고유해야 합니다. <br>
   * type: input의 type을 설정합니다. <br>
   * errMsg: input의 에러메세지를 설정합니다. <br>
   * labelText: label의 text를 설정합니다. <br>
   * size(optional): input의 사이즈를 설정합니다. default value -> 'lg' <br>
   * maxLength(optional): input의 최대 길이를 설정합니다. default value -> 40 <br>
   * className(optional): 페이지 내에서 컴포넌트를 선택해 특정 스타일링을 주고 싶을 때 클래스 이름으로 사용합니다. <br>
   * regex(optional): input validation 정규표현식입니다. <br>
   * check(optional): regex의 대용으로써 다른 인풋의 id를 입력해야 합니다.
   * 입력한 id를 가진 인풋의 value와 자신의 value를 비교합니다. regex보다 우선합니다. <br>
   */
  formInfo: IformInfo;

  /**
   * onSubmit 이벤트가 발생했을 때, 실행되는 함수입니다.
   */
  handleSubmit: () => void;

  /**
   * onChange 이벤트의 동작을 설정해주세요 onChange 이벤트 발생시 실행됩니다. <br>
   * 컴포넌트 외부에서 input value state를 관리할 수 있도록 input value state를 변경하는 로직을 넣어줍니다. <br>
   * 첫번째 매개변수에는 인풋 고유의 id가 들어가고
   * 두번째 매개변수에는 input의 value값이 들어갑니다. <br>
   * 이 함수에 input value state를 변경하는 로직이 들어가야 input에 입력이 가능합니다.
   */
  handleChange: (id: string, value: string) => void;

  /**
   * 서버에서 오는 에러메세지를 저장하는 state입니다. <br>
   * ex) { id: 'id', message: '이미 존재하는 아이디입니다.' } <br>
   * id 프로퍼티 값으로 해당하는 id를 갖는 input을 찾아서 에러메세지를 나타내줍니다. <br>
   * <br>
   * step 1. useState로 serverError를 선언해줍니다. <br>
   * const [serverError, setServerError] = useState({ id: '', message: '' }); <br>
   * <br>
   * step 2. props로 serverError를 넘겨줍니다.
   */
  serverError?: IserverError;

  /**
   * 사용자가 스타일을 추가하고 싶을 때 사용합니다
   */
  className?: string;
};

export const AuthForm = ({
  inputValue,
  formInfo,
  handleSubmit,
  handleChange,
  serverError,
  className,
}: AuthFormProps) => {
  const isValid = (info: { id: string; regex?: RegExp; check?: string }) => {
    const { regex, id, check } = info;
    if (check) return inputValue[check]?.value === inputValue[id]?.value;
    return regex?.test(inputValue[id]?.value);
  };

  const isAllValid = () =>
    Object.values(formInfo).every((info) => isValid(info));

  const isDirty = (id: string) => inputValue[id]?.isDirty;

  const isServerError = (id: string) => id === serverError?.id;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`${styles.formContainer} ${className ?? ''}`}
    >
      {Object.values(formInfo).map((info, i) => (
        <Fragment key={i}>
          <AuthInput
            id={info.id}
            type={info.type}
            size={info.size ?? 'lg'}
            labelText={info.labelText}
            value={inputValue[info.id]?.value ?? ''}
            handleChange={handleChange}
            maxLength={info.maxLength}
            className={info.className}
          >
            {!isDirty(info.id) ? null : !isValid(info) ? (
              <p className={styles.error}>{info.errMsg}</p>
            ) : isServerError(info.id) ? (
              <p className={styles.error}>{serverError?.message}</p>
            ) : null}
          </AuthInput>
        </Fragment>
      ))}
      <Button size="lg" type="submit" disabled={!isAllValid()}>
        가입
      </Button>
    </form>
  );
};
