/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import {Text} from '@root/src/components';
import {AppNavigationProps} from '@root/src/navigation/AppNavigation';
import {IMG_HOST} from '@root/src/services/api';
import {colors} from '@root/src/themes';
import React from 'react';
import {Dimensions, ImageBackground, StyleSheet, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';
import {Badge} from 'react-native-ui-lib';
import {useRecoilValue} from 'recoil';
import {themeState} from '../../setting/setting.model';
import {MovieListResults} from '../home.types';

type CarousalMovieProps = {
  data: MovieListResults[] | undefined;
};

const screenWidth = Dimensions.get('window').width;

const CarousalMovie = ({data}: CarousalMovieProps) => {
  const theme = useRecoilValue(themeState);
  const navigation = useNavigation<AppNavigationProps>();

  if (data?.length === 0) {
    return (
      <View style={styles.container}>
        <Text>OKE</Text>
      </View>
    );
  }

  return (
    <Carousel
      width={screenWidth}
      height={screenWidth * 0.6}
      data={data ? data.slice(0, 8) : []}
      loop
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 50
      }}
      autoPlay={false}
      autoPlayInterval={4000}
      snapEnabled={true}
      panGestureHandlerProps={{
        activeOffsetX: [-10, 10]
      }}
      style={{backgroundColor: theme.background}}
      renderItem={({item, index}) => (
        <TouchableWithoutFeedback
          key={item.id}
          onPress={() => navigation.navigate('DetailMovie', {id: item.id})}
          style={[styles.item, {backgroundColor: theme.foreground}]}>
          <ImageBackground
            source={{uri: `${IMG_HOST}${item.backdrop_path}`}}
            imageStyle={styles.imgBg}>
            <View style={{position: 'absolute', top: 12, right: 12}}>
              <Badge label={`${index + 1}/8`} backgroundColor={colors.blackDim} />
            </View>
            <View style={styles.titleWrap}>
              <Text color={colors.white} style={styles.titleText}>
                {item.title}
              </Text>
            </View>
          </ImageBackground>
        </TouchableWithoutFeedback>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: '100%',
    backgroundColor: 'red'
  },
  item: {
    height: 200,
    width: screenWidth,
    borderRadius: 6
  },
  imgBg: {
    height: 200,
    backgroundColor: colors.grey100,
    borderRadius: 6
  },
  titleWrap: {
    height: '100%',
    padding: 8,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  titleText: {
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 10,
    textShadowColor: colors.black
  }
});

export default CarousalMovie;
