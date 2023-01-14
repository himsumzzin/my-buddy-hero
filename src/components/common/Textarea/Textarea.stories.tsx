import { Textarea, TextareaProps } from './Textarea';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/Common/Textarea',
  component: Textarea,
  args: {
    labelValue: 'Textarea 컴포넌트입니다',
    placeholder: 'Textarea 컴포넌트입니다',
  },
  parameters: {
    docs: {
      description: {
        component: `공통 스타일을 적용한 textarea 컴포넌트입니다`,
      },
    },
  },
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = (args: TextareaProps) => (
  <Textarea {...args} />
);

export const Default = Template.bind({});

export const HiddenLabel = Template.bind({});
HiddenLabel.args = {
  placeholder: 'label을 숨긴 Textarea 컴포넌트입니다',
  hiddenLabel: true,
};
