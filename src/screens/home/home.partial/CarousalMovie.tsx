import {useNavigation} from '@react-navigation/native';
import {Text} from '@root/src/components';
import {AppNavigationProps} from '@root/src/navigation/AppNavigation';
import {IMG_HOST} from '@root/src/services/api';
import {colors} from '@root/src/themes';
import React from 'react';
import {Dimensions, ImageBackground, StyleSheet, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';
import {useRecoilValue} from 'recoil';
import {themeState} from '../../setting/setting.model';
import {MovieListResults} from '../home.types';

type CarousalMovieProps = {
  data: MovieListResults[];
};

const screenWidth = Dimensions.get('screen').width;

const CarousalMovie = ({data}: CarousalMovieProps) => {
  const theme = useRecoilValue(themeState);
  const navigation = useNavigation<AppNavigationProps>();

  return (
    <View style={styles.container}>
      {data.length !== 0 ? (
        <Carousel
          width={screenWidth}
          height={screenWidth * 0.6}
          data={data}
          loop
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50
          }}
          autoPlay={true}
          autoPlayInterval={4000}
          snapEnabled={true}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10]
          }}
          style={{backgroundColor: theme.background}}
          renderItem={({item: props}: {item: MovieListResults}) => (
            <TouchableWithoutFeedback
              key={props.id}
              onPress={() => navigation.navigate('DetailMovie', {id: props.id})}
              style={[styles.item, {backgroundColor: theme.background}]}>
              <ImageBackground
                source={{uri: `${IMG_HOST}${props.backdrop_path}`}}
                imageStyle={styles.imgBg}>
                <View style={styles.titleWrap}>
                  <Text color={colors.white} style={styles.titleText}>
                    {props.title}
                  </Text>
                </View>
              </ImageBackground>
            </TouchableWithoutFeedback>
          )}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200
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
