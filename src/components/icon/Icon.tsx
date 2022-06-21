/* eslint-disable react-native/no-inline-styles */
import {colors} from '@root/src/themes';
import React, {useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import colored from 'color';
import {IconProps} from './icon.types';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const Icon = (props: IconProps) => {
  const {name = 'heart', size = 20, color = colors.grey600, onPress} = props;

  const [isPress, setIsPress] = useState(false);

  const onPressIn = () => {
    setIsPress(true);
  };

  const onPressOut = () => {
    setIsPress(false);
  };

  const wrapIconSize = size + 12;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={!onPress}
      style={[
        styles.container,
        {
          height: wrapIconSize,
          width: wrapIconSize,
          borderRadius: wrapIconSize / 2,
          backgroundColor: isPress
            ? colored(colors.primary).alpha(0.26).rgb().string()
            : 'transparent'
        }
      ]}>
      <MaterialIcon name={name} size={size} color={color} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Icon;
