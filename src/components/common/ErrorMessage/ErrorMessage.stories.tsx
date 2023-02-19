import { ErrorMessage, ErrorMessageProps } from '@/components/common';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/common/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    docs: {
      description: {
        component: `
                Default 메세지를 나타내는 컴포넌트입니다.
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

export const LoginErrorMessage = Template.bind({});
LoginErrorMessage.args = {
  error: '로그인에 실패하였습니다.',
};
