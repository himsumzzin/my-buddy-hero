import { Camera } from '@/components/common';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/Camera',
  component: Camera,
  parameters: {
    docs: {
      description: {
        component: `
                카메라 컴포넌트 입니다. 
                각 버튼을 클릭하면 3초의 카운트 다운 후에 사진이 찍힙니다. 
                완료 버튼을 누르면 이미지URL로 저장됩니다. 
            `,
      },
    },
  },
} as ComponentMeta<typeof Camera>;

const Template: ComponentStory<typeof Camera> = (args) => {
  return <Camera page="Camera"></Camera>;
};

export const camera = Template.bind({});
