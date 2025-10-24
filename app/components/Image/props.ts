import { ImageStyle, StyleProp } from 'react-native';
import { ImageProps as ExpoImageProps } from 'expo-image';

export type ImageProps = ExpoImageProps & {
  hasZoomViewer?: boolean;
  errorImageSource?: Pick<ExpoImageProps, 'source'>;
  errorImageStyle?: StyleProp<ImageStyle>;
};
