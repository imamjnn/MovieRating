import React, {useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppNavigationProps} from '@root/src/navigation/AppNavigation';
import {Alert, ScrollView, TextInput as NativeTextInput} from 'react-native';
import {Button, Icon, Text, TextInput} from '@components';
import exampleStyles from './example.styles';
import {colors} from '@root/src/themes';

const ExComponents = () => {
  const navigation = useNavigation<AppNavigationProps>();

  const lastNameRef = useRef<NativeTextInput>(null);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Icon name="favorite" size={26} onPress={() => console.log('OK')} />
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={exampleStyles.container}>
      <TextInput
        label="First Name"
        placeholder="Fist name"
        iconLeft="person"
        onSubmitEditing={() => lastNameRef.current?.focus()}
        returnKeyType="next"
        blurOnSubmit={false}
      />
      <TextInput ref={lastNameRef} label="Last Name" placeholder="Last name" iconRight="person" />
      <TextInput ref={lastNameRef} label="Password" placeholder="Password" secureTextEntry={true} />
      <Button
        size="normal"
        type="primary"
        text="Button Primary"
        onPress={() => Alert.alert('OK')}
      />
      <Button
        size="normal"
        type="outline"
        text="Button Outline"
        onPress={() => Alert.alert('OK')}
      />
      <Button
        size="normal"
        type="outline"
        text="Button Right Icon"
        onPress={() => Alert.alert('OK')}
        iconRight="check-circle"
      />
      <Button
        size="normal"
        type="primary"
        text="Button Left Icon"
        onPress={() => Alert.alert('OK')}
        iconLeft="chevron-right"
      />
      <Button size="small" type="primary" text="Button Small" onPress={() => Alert.alert('OK')} />
      <Button
        size="normal"
        type="primary"
        text="Button Disable"
        onPress={() => Alert.alert('OK')}
        disabled
      />
      <Text type="fs18fw700Black">Typography fs18fw700Black</Text>
      <Text type="fs16fw500Black" color={colors.grey300}>
        Typography fs16fw500Black
      </Text>
      <Text type="fs14fw400Black">Typography fs14fw400Black</Text>
      <Text type="fs12fw300Black">Typography fs12fw300Black</Text>
    </ScrollView>
  );
};

export default ExComponents;
