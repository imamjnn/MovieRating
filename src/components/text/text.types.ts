import {StyleProp, TextProps as NativeTextProps, TextStyle} from 'react-native';
import {fontType} from './text.typography';

export type FontTypeStyle = keyof typeof fontType;

export interface TextProps extends NativeTextProps {
  children?: string | number | string[];
  center?: boolean;
  paddingVertical?: number;
  paddingHorizontal?: number;
  type?: FontTypeStyle;
  style?: StyleProp<TextStyle>;
  color?: string;
}
