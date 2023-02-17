import { Button, Title, Slide, BackwardLink } from '@/components/common';
import {
  Form,
  Input,
  ValidationErrorMessage,
  Textarea,
} from '@/components/Auth';
import { useForm } from '@/hooks';
import { Summary } from '../MissionCard';
import styles from './MissionForm.module.css';

export interface MissionFormProps {
  /**
   * mission에 대한 전체 상태입니다. 렌더링에 필요한 title, maxReceiver, description값만 사용합니다.
   */
  mission: Mission;
  /**
   * summary 정보를 MissionCard 컴포넌트에 전달합니다.
   */
  onSubmit: (newMissionInfo: Summary) => void;
}

export const MissionForm = ({
  mission,
  onSubmit: onSubmitCallback,
}: MissionFormProps) => {
  const { title, maxReceiver, description } = mission;

  const { errors, touched, handleSubmit, getFieldProps, isValid } = useForm({
    initialValues: { title, maxReceiver, description },
    validate: (values) => {
      const { title, description, maxReceiver } = values;
      const errors = {
        title: '',
        maxReceiver: '',
        description: '',
      };

      if (typeof title !== 'string' || title.length < 2) {
        errors.title = '2글자 이상 입력해주세요.';
      }

      if (+maxReceiver < 1) {
        errors.maxReceiver = '1명 이상으로 입력해주세요';
      }
      if (typeof description !== 'string' || description.length < 10) {
        errors.description = '2글자 이상 입력해주세요.';
      }

      return errors;
    },
    onSubmit: async (values) => {
      onSubmitCallback(values as Summary);
    },
  });

  return (
    <Slide direction="left" className={styles.container}>
      <header className={styles.header}>
        <Title lv={1} className={styles.title}>
          임무 등록
        </Title>
      </header>
      <Form description={'임무 등록'} handleSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          size="lg"
          labelText="어떤 임무인가요?"
          placeholder="어떤 임무인가요?"
          border="rec"
          className={styles.missionTitle}
          getFieldProps={getFieldProps}
        >
          <ValidationErrorMessage touched={touched} errors={errors} />
        </Input>
        <Input
          type="number"
          name="maxReceiver"
          size="sm"
          labelText="몇 명이 필요한가요?"
          placeholder=" "
          border="rec"
          className={styles.maxReceiver}
          getFieldProps={getFieldProps}
        >
          <>
            <span>몇 명이 필요한가요?</span>
            <span>명</span>
            <ValidationErrorMessage
              name="maxReceiver"
              touched={touched}
              errors={errors}
            />
          </>
        </Input>
        <Textarea
          name="description"
          labelText="좀 더 자세히 설명해주세요!"
          hiddenLabel={true}
          placeholder="좀 더 자세히 설명해주세요!"
          getFieldProps={getFieldProps}
          className={styles.description}
        >
          <ValidationErrorMessage touched={touched} errors={errors} />
        </Textarea>
        <Button size="lg" className={styles.submitButton} disabled={!isValid()}>
          등록
        </Button>
      </Form>
      <BackwardLink href="/missionlist" size="xs" className={styles.backLink} />
    </Slide>
  );
};
