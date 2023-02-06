import { Message, MessageProps } from '@/components/Auth';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/Auth/Message',
  component: Message,
  parameters: {
    docs: {
      description: {
        component: `
                Default 메세지를 나타내는 컴포넌트입니다.
            `,
      },
    },
  },
} as ComponentMeta<typeof Message>;

const Template: ComponentStory<typeof Message> = (args: MessageProps) => {
  return <Message {...args}></Message>;
};

export const ErrorMessage = Template.bind({});
ErrorMessage.args = {
  error: '로그인에 실패하였습니다.',
};
