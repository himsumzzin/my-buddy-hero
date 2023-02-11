import {
  ValidationErrorMessage,
  ValidationErrorMessageProps,
} from '@/components/Auth';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/Auth/ValidationErrorMessage',
  component: ValidationErrorMessage,
  parameters: {
    docs: {
      description: {
        component: `
                에러메세지를 나타내는 컴포넌트입니다.
            `,
      },
    },
  },
} as ComponentMeta<typeof ValidationErrorMessage>;

const Template: ComponentStory<typeof ValidationErrorMessage> = (
  args: ValidationErrorMessageProps
) => {
  return <ValidationErrorMessage {...args}></ValidationErrorMessage>;
};

export const TouchedAndErroredErrorMessage = Template.bind({});
TouchedAndErroredErrorMessage.args = {
  name: 'id',
  touched: { id: true },
  errors: { id: '아이디를 올바르게 입력해 주세요.' },
};

export const TouchedErrorMessage = Template.bind({});
TouchedErrorMessage.args = {
  name: 'id',
  touched: { id: true },
  errors: { id: '' },
};

export const ErroredErrorMessage = Template.bind({});
ErroredErrorMessage.args = {
  name: 'id',
  touched: { id: false },
  errors: { id: '아이디를 올바르게 입력해 주세요.' },
};
