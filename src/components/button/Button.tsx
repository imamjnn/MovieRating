import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon, Text} from '..';
import {ButtonProps} from './button.types';
import {colors} from '@themes';
import {buttonDisable, buttonSize, buttonTypes} from './button.styles';

const Button = (props: ButtonProps) => {
  const {
    text = 'Button',
    type = 'primary',
    size = 'normal',
    style: styleOverride,
    textStyle: textStyleOverride,
    iconRight,
    iconLeft,
    ...rest
  } = props;

  const checkStyles = rest.disabled ? 'disable' : type;
  const viewStyles = checkStyles === 'disable' ? buttonDisable : buttonTypes[type];
  const textColor = rest.disabled
    ? colors.grey600
    : type === 'outline'
    ? colors.primary
    : colors.grey100;
  const textSize = size === 'small' ? 14 : 16;
  const iconSize = size === 'small' ? 18 : 24;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[viewStyles, buttonSize[size], styleOverride]}
      {...rest}>
      {iconRight && <Icon name={iconRight} size={iconSize} />}
      <Text
        type="fs16fw500Black"
        style={[textStyleOverride, {color: textColor, fontSize: textSize}]}>
        {text}
      </Text>
      {iconLeft && <Icon name={iconLeft} size={iconSize} />}
    </TouchableOpacity>
  );
};

export default Button;
