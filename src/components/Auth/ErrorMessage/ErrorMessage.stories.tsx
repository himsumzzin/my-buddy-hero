import { ErrorMessage, ErrorMessageProps } from '@/components/Auth';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/Auth/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    docs: {
      description: {
        component: `
                에러메세지를 나타내는 컴포넌트입니다.
            `,
      },
    },
  },
} as ComponentMeta<typeof ErrorMessage>;

const Template: ComponentStory<typeof ErrorMessage> = (
  args: ErrorMessageProps
) => {
  return <ErrorMessage {...args}></ErrorMessage>;
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

export const ServerErrorMessage = Template.bind({});
ServerErrorMessage.args = {
  serverError: '로그인에 실패하였습니다.',
};
