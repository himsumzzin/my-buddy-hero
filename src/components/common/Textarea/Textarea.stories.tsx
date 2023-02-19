import {
  Textarea,
  TextareaProps,
  ValidationErrorMessage,
} from '@/components/common';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useForm } from '@/hooks';

export default {
  title: 'Components/common/Textarea',
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component: `공통 스타일을 적용한 textarea 컴포넌트입니다`,
      },
    },
  },
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = (args: TextareaProps) => {
  const { errors, touched, getFieldProps } = useForm({
    initialValues: {
      missionDescription: '',
    },
    validate: (values) => {
      const errors = {
        missionDescription: '',
      };
      if (values.missionDescription.length === 0) {
        errors.missionDescription = '임무를 작성해 주세요';
      }

      return errors;
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return (
    <Textarea getFieldProps={getFieldProps} {...args}>
      <ValidationErrorMessage touched={touched} errors={errors} />
    </Textarea>
  );
};

export const Default = Template.bind({});
Default.args = {
  placeholder: '좀 더 자세히 설명해 주세요',
  name: 'missionDescription',
  labelText: '미션 상세 설명',
};

export const HiddenLabel = Template.bind({});
HiddenLabel.args = {
  placeholder: 'label을 숨긴 Textarea 컴포넌트입니다',
  name: 'missionDescription',
  labelText: '미션 상세 설명',
  hiddenLabel: true,
};
