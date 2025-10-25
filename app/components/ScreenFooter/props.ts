import { PropsWithChildren } from 'react';
import { StackProps } from 'tamagui';

export type ScreenFooterProps = PropsWithChildren<{
  /**
   * Determine if the footer should be elevated
   * @default false
   */
  isElevated?: boolean;

  containerProps?: StackProps;
}>;
