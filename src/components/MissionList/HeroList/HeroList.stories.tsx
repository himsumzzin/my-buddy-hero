import { ComponentMeta, ComponentStory } from '@storybook/react';
import { HeroList, HeroListProps } from './HeroList';
import { defaultMission } from '@/states';

export default {
  title: 'Components/missionlist/HeroList',
  component: HeroList,
  args: {
    mission: defaultMission,
    missionStatus: 'create',
    onSubmit: (heroInfo: Hero) => {
      console.log(heroInfo);
      alert('히어로 선택!');
    },
    onGoBack: () => {
      alert('뒤로 간다!');
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '히어로 정보를 입력하는 창입니다. 히어로를 선택하고 히어로 코드를 검사하여, 통과한 히어로 정보를 상위 컴포넌트에 전달합니다.',
      },
    },
  },
} as ComponentMeta<typeof HeroList>;

const Template: ComponentStory<typeof HeroList> = (args: HeroListProps) => (
  <HeroList {...args} />
);

export const Default = Template.bind({});
Default.parameters = {
  docs: {
    description: {
      story: '임무 수행 중인 히어로가 없는 기본 UI입니다.',
    },
  },
};

export const WithReceivers = Template.bind({});
WithReceivers.args = {
  mission: {
    ...defaultMission,
    receivers: ['1', '3', '5'],
  },
};
WithReceivers.parameters = {
  docs: {
    description: {
      story:
        '임무 수행 중인 히어로가 있을 때 UI입니다. 임무 수행 중인 히어로는 선택할 수 없습니다',
    },
  },
};
