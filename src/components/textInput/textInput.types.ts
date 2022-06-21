import {TextInputProps as NativeTextInputProps} from 'react-native';

export interface TextInputProps extends NativeTextInputProps {
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  paddingHorizontal?: number;
  paddingVertical?: number;
  paddingTop?: number;
  paddingBottom?: number;
  iconRight?: string;
  iconLeft?: string;
  secureTextEntry?: boolean;
}
