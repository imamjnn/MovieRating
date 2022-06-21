import {useNavigation} from '@react-navigation/native';
import {Button, Text} from '@root/src/components';
import {ExampleNavigationProps} from '@root/src/navigation/AppNavigation';
import {image} from '@root/src/themes/images';
import React from 'react';
import {Image, View} from 'react-native';
import exampleStyles from './example.styles';

const Example = () => {
  const navigation = useNavigation<ExampleNavigationProps>();

  return (
    <View style={exampleStyles.container}>
      <Text center paddingVertical={20}>
        Example
      </Text>
      <Image source={image.example} style={exampleStyles.img} />
      <Button text="Components" onPress={() => navigation.navigate('ExComponents')} />
      <Button text="Recoil" onPress={() => navigation.navigate('ExRecoil')} />
      <Button text="CoinGecko" onPress={() => navigation.navigate('CoinGecko')} />
    </View>
  );
};

export default Example;
