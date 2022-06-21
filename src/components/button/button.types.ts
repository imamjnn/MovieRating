import {StyleProp, TextStyle, TouchableOpacityProps, ViewStyle} from 'react-native';

export type ButtonTypeName = 'primary' | 'outline';
export type ButtonSizeName = 'normal' | 'small';

export interface ButtonProps extends TouchableOpacityProps {
  text?: string;
  color?: string | undefined;
  type?: ButtonTypeName;
  size?: ButtonSizeName;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconRight?: string;
  iconLeft?: string;
}
