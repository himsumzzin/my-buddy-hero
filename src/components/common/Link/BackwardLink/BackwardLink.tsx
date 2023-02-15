import { Link, LinkProps } from '../Default';
import { ReactComponent as ArrowLeft } from '@svgs/arrow-left.svg';

export const BackwardLink = (props: LinkProps) => {
  return (
    <Link {...props}>
      <ArrowLeft width="32px" height="32px" viewBox="0 0 24 24"></ArrowLeft>
    </Link>
  );
};
