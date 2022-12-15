import { Input, Textarea, Button, Title, Slide } from '@/components/common';
import { ReactComponent as CloseIcon } from '@svgs/close.svg';
import { Summary } from '../MissionCard';
import styles from './MissionForm.module.css';

interface CustomElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  maxReceiver: HTMLInputElement;
  description: HTMLTextAreaElement;
}

interface SummaryForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

export interface MissionFormProps {
  /**
   * mission 상태 중 렌더링에 필요한 title, maxReceiver, description값만 사용하는 객체입니다.
   */
  summary: Summary;
  /**
   * summary 정보를 MissionCard 컴포넌트에 전달합니다.
   */
  onSubmit: (newMissionInfo: Summary) => void;
  /**
   * MissionCard 컴포넌트를 언마운트하는 로직을 담은 함수입니다.
   * MissionCard를 감싸고 있는 Dialog 컴포넌트를 닫는 함수를 사용할 예정입니다.
   */
  onClose: () => void;
}

export const MissionForm = ({
  summary,
  onSubmit,
  onClose,
}: MissionFormProps) => {
  const { title, maxReceiver, description } = summary;

  const handleSubmit = (e: React.FormEvent<SummaryForm>) => {
    e.preventDefault();
    const elements = e.currentTarget.elements;

    onSubmit({
      title: elements.title.value,
      maxReceiver: +elements.maxReceiver.value,
      description: elements.description.value,
    });
  };

  return (
    <Slide direction="left" className={styles.container}>
      <header className={styles.header}>
        <Title lv={3}>임무 등록</Title>
      </header>
      <form onSubmit={handleSubmit}>
        <fieldset className={styles.fieldset}>
          <legend>임무 등록 폼</legend>
          <Input
            name="title"
            initialValue={title}
            size="md"
            labelText="어떤 임무인가요?"
            placeholder="어떤 임무인가요?"
          />
          <Input
            name="maxReceiver"
            initialValue={maxReceiver}
            size="md"
            labelText="몇 명의 히어로가 필요한가요?"
            placeholder="몇 명의 히어로가 필요한가요?"
          />
          <Textarea
            name="description"
            initialValue={description}
            placeholder="더 자세하게 설명해주세요!"
            labelValue="임무 상세 설명"
            hiddenLabel={true}
          />
          <Button size="sm">등록</Button>
        </fieldset>
      </form>
      <Button size="xs" className={styles.closeButton} onClick={onClose}>
        <CloseIcon width="32px" height="32px" viewBox="0 0 24 24" />
      </Button>
    </Slide>
  );
};
