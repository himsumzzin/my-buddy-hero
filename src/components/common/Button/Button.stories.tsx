import { Button, ButtonProps } from '@/../stories/Button';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `
                버튼 컴포넌트 입니다.
            `,
      },
    },
  },
};

const Template = (args) => <Button {...args} />;

export const SmallButton = Template.bind({});
SmallButton.args = {
  size: 'sm',
};

export const MediumButton = Template.bind({});
SmallButton.args = {
  size: 'md',
};

export const LargeButton = Template.bind({});
SmallButton.args = {
  size: 'lg',
};
