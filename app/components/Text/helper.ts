import { getTokens } from 'tamagui';

export const getTextLineHeight = (fontSize: any) => {
  const fontSizeValue =
    typeof fontSize === 'string'
      ? (getTokens()?.fontSize as any)?.[`${fontSize}`]?.val
      : fontSize;

  switch (fontSizeValue) {
    case 12:
      return 18;
    case 13:
      return 19;
    case 14:
      return 20;
    case 16:
      return 22;
    case 18:
      return 26;
    case 20:
      return 26;
    case 24:
      return 32;
    case 28:
      return 36;
    case 30:
      return 38;
    case 32:
      return 40;
    case 34:
      return 44.2;
    case 40:
      return 46;
    default:
      return 21;
  }
};
