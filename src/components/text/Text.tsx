/* eslint-disable react-native/no-inline-styles */
import {colors} from '@root/src/themes';
import React from 'react';
import {Text as NativeText} from 'react-native';
import {TextProps} from './text.types';
import {fontType} from './text.typography';

const Text = (props: TextProps) => {
  const {
    children,
    center = false,
    style: styleOverride,
    paddingVertical = 0,
    paddingHorizontal = 0,
    type = 'fs16fw400Black',
    color = colors.black,
    ...rest
  } = props;
  return (
    <NativeText
      style={[
        fontType[type],
        center && {textAlign: 'center'},
        {paddingVertical, paddingHorizontal, color},
        styleOverride
      ]}
      {...rest}>
      {children}
    </NativeText>
  );
};

export default Text;
