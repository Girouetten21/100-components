import { FC } from 'react';

export interface PixelTransitionProps {
  images: string[];
  currentIndex: number;
  gridSize?: number;
  pixelColor?: string;
  animationStepDuration?: number;
  className?: string;
  style?: React.CSSProperties;
  aspectRatio?: string;
}

declare const PixelTransition: FC<PixelTransitionProps>;

export default PixelTransition;
