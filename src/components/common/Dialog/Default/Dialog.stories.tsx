import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Dialog, DialogProps } from './Dialog';
import { Link } from '@/components/common';

export default {
  title: 'Components/Common/Dialog/Default',
  component: Dialog,
  args: {
    modal: false,
    onClose: () => {
      console.log('close!');
    },
  },
  parameters: {
    docs: {
      description: {
        component: `콘텐츠를 원하는 대로 조립할 수 있는 다이얼로그 컴포넌트입니다.
          다이얼로그 렌더링을 결정하는 상태와 열고 닫는 함수는 직접 가지지 않습니다.
          Dialog컴포넌트는 자체적인 레이아웃을 가지지 않습니다.
          기본 레이아웃과 디자인을 활용하고 싶다면 Dialog.Header / Dialog.Body / Dialog.Footer 컴포넌트를 사용합니다.
          `,
      },
    },
  },
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = (args: DialogProps) => (
  <Dialog {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: '기본 다이얼로그',
};

export const ComposedModal = Template.bind({});
ComposedModal.args = {
  children: (
    <>
      <Dialog.Header>
        <h2>완전체 모달 다이얼로그</h2>
      </Dialog.Header>
      <Dialog.Body>
        <p>
          샘플 텍스트...!! <br /> Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Optio odit laboriosam voluptatum deleniti
          consequuntur, eos vitae explicabo? Dicta maiores, cupiditate saepe
          nobis error repellat consectetur, ipsum earum temporibus nam beatae?
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio odit
          laboriosam voluptatum deleniti consequuntur, eos vitae explicabo?
          Dicta maiores, cupiditate saepe nobis error repellat consectetur,
          ipsum earum temporibus nam beatae? Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Optio odit laboriosam voluptatum
          deleniti consequuntur, eos vitae explicabo? Dicta maiores, cupiditate
          saepe nobis error repellat consectetur, ipsum earum temporibus nam
          beatae?
        </p>
      </Dialog.Body>
      <Dialog.Footer onClose={() => alert('닫는다!')} />
    </>
  ),
};
ComposedModal.parameters = {
  docs: {
    description: {
      story: '자식 컴포넌트를 모두 사용한 모달 다이얼로그입니다.',
    },
  },
};

export const ComposedModalWithTabbable = Template.bind({});
ComposedModalWithTabbable.args = {
  children: (
    <>
      <Dialog.Header>
        <h2>내부에 tabbable 요소를 가지는 완전체 모달 다이얼로그</h2>
      </Dialog.Header>
      <Dialog.Body>
        <p>
          샘플 텍스트...!! <br /> Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Optio odit laboriosam voluptatum deleniti
          consequuntur, eos vitae explicabo? Dicta maiores, cupiditate saepe
          nobis error repellat consectetur, ipsum earum temporibus nam beatae?
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio odit
          laboriosam voluptatum deleniti consequuntur, eos vitae explicabo?
          Dicta maiores, cupiditate saepe nobis error repellat consectetur,
          ipsum earum temporibus nam beatae? Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Optio odit laboriosam voluptatum
          deleniti consequuntur, eos vitae explicabo? Dicta maiores, cupiditate
          saepe nobis error repellat consectetur, ipsum earum temporibus nam
          beatae?
        </p>
        <Link href="#" size="lg">
          내가 만든 링크
        </Link>
        <br />
        <br />
        <Link href="#" size="lg">
          내가 만든 링크2
        </Link>
      </Dialog.Body>
      <Dialog.Footer onClose={() => alert('닫는다!')} />
    </>
  ),
};
ComposedModalWithTabbable.parameters = {
  docs: {
    description: {
      story:
        '내부에 tabbable한 요소를 가지는 모달 다이얼로그입니다.<br/>키보드 트랩이 적용된 것을 확인할 수 있습니다',
    },
  },
};
