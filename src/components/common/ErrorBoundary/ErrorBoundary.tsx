import { Component } from 'react';
import { ErrorPage } from '../ErrorPage';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}
interface ErrorBoundaryState {
  error: boolean;
}

export class ErrorBoundary extends Component {
  state: ErrorBoundaryState = { error: false };
  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI

    return { error: true };
  }
  componentDidCatch(error: any) {
    // You can use your own error logging service here
    this.setState({ error });
  }
  render() {
    if (this.state.error) {
      return (
        <ErrorPage
          title="히어로들을 불러오는데 실패했어요!"
          description="인터넷 연결이 잘 되어있는지 확인해주세요"
          linkTo={window.location.pathname}
          linkText="새로고침하기"
        />
      );
    }

    return this.props.children;
  }
}
