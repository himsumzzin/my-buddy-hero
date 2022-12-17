import { motion, Variant } from 'framer-motion';

const defaultVariants = {
  initial: (direction: Direction) => {
    return {
      x: direction === 'left' ? 500 : -500,
      opacity: 0,
    };
  },
  animate: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: Direction) => {
    return {
      zIndex: 0,
      x: direction === 'left' ? 500 : -500,
      opacity: 0,
    };
  },
};

type Direction = 'left' | 'right';

export interface SlideProps {
  /**
   * 슬라이드 방향을 결정합니다/
   */
  direction: Direction;
  /**
   * 애니메이션에 대한 세부 설정을 담은 객체입니다.
   * 설정하지 않으면 기본값을 사용합니다
   */
  variant?: any;
  /**
   * 레이아웃 등 추가 스타일을 지정할 수 있습니다.
   */
  className?: string;
  children: React.ReactNode;
  restprops?: unknown[];
}

export const Slide = ({
  direction,
  variant,
  className,
  children,
  ...restprops
}: SlideProps) => {
  return (
    <motion.div
      className={className}
      variants={variant ?? defaultVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={direction}
      {...restprops}
    >
      {children}
    </motion.div>
  );
};

Slide.defaultProps = {
  restProps: [],
};
