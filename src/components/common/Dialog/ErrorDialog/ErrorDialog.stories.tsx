import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ErrorDialog, ErrorDialogProps } from './ErrorDialog';

export default {
  title: 'Components/Dialog/ErrorDialog',
  component: ErrorDialog,
  args: {
    onClose: () => {
      console.log('close!');
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '콘텐츠를 원하는 대로 조립할 수 있는 다이얼로그 컴포넌트입니다.',
      },
    },
  },
} as ComponentMeta<typeof ErrorDialog>;

const Template: ComponentStory<typeof ErrorDialog> = (
  args: ErrorDialogProps
) => <ErrorDialog {...args} />;

export const Default = Template.bind({});
