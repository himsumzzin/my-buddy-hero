import { ErrorPage } from '@/components/common';

export default function Custom404() {
  return (
    <ErrorPage
      title="앗! 여기는 올바른 주소가 아니에요!"
      description="주소가 잘못된 것 같아요. 다시 한 번 확인해주시겠어요?"
      redirectTo="/"
      redirectText="메인 페이지로 돌아가기"
    />
  );
}
