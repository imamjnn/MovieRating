/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {colors} from '@root/src/themes';
import {StyleSheet, TextInput as NativeTextInput, View} from 'react-native';
import {Icon, Text} from '..';
import {TextInputProps} from './textInput.types';
import {fontFamily} from '../text/text.typography';

const TextInput = (props: TextInputProps, ref: any) => {
  const {
    placeholder = 'Text Input',
    disabled = false,
    paddingHorizontal = 0,
    paddingVertical = 0,
    paddingTop = 0,
    paddingBottom = 10,
    label = '',
    iconLeft,
    iconRight,
    secureTextEntry = false,
    ...rest
  } = props;

  const [onFocus, setOnFocus] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const onTextInputFocus = () => {
    setOnFocus(true);
  };

  const onTextInputBlur = () => {
    setOnFocus(false);
  };

  return (
    <View style={{paddingHorizontal, paddingVertical, paddingTop, paddingBottom}}>
      {label !== '' && <Text type="fs12fw400Black">{label}</Text>}
      <View
        style={[styles.wrapTextInput, {borderColor: onFocus ? colors.primary : colors.grey300}]}>
        {iconLeft && <Icon name={iconLeft} size={24} />}
        <NativeTextInput
          ref={ref}
          placeholder={placeholder}
          editable={!disabled}
          onFocus={onTextInputFocus}
          onBlur={onTextInputBlur}
          secureTextEntry={secureTextEntry && !showPassword}
          style={[
            styles.textInput,
            {
              paddingLeft: iconLeft ? 0 : 8,
              paddingRight: iconRight ? 0 : 8,
              width: iconLeft || iconRight || secureTextEntry ? '90%' : '100%'
            }
          ]}
          {...rest}
        />
        {secureTextEntry ? (
          <Icon
            name={showPassword ? 'visibility' : 'visibility-off'}
            size={24}
            onPress={() => setShowPassword(!showPassword)}
          />
        ) : iconRight ? (
          <Icon name={iconRight} size={24} />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapTextInput: {
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: colors.grey300,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textInput: {
    height: 48,
    fontFamily: fontFamily.fw400
  }
});

export default React.forwardRef(TextInput);
