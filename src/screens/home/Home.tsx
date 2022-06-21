/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppNavigationProps} from '@root/src/navigation/AppNavigation';
import {Dimensions, ImageBackground} from 'react-native';
import {Text} from '@components';
import homeStyles from './home.styles';
import * as RNLocalize from 'react-native-localize';
import {fecthNowPlayingMovie} from './home.model';
import {NowPlayingMovieResults} from './home.types';
import Carousel from 'react-native-reanimated-carousel';
import {colors} from '@root/src/themes';
import {IMG_HOST} from '@root/src/services/api';
import {GestureHandlerRootView, TouchableWithoutFeedback} from 'react-native-gesture-handler';

const Home = () => {
  const navigation = useNavigation<AppNavigationProps>();

  const [data, setData] = useState<NowPlayingMovieResults[]>([]);

  useEffect(() => {
    console.log(RNLocalize.getCountry());
    console.log(RNLocalize.getLocales());
    loadMovieNowPlaying();
  }, []);

  const loadMovieNowPlaying = async () => {
    const response = await fecthNowPlayingMovie();
    if (response) {
      setData(response.results);
    }
  };

  return (
    <GestureHandlerRootView style={homeStyles.container}>
      {data.length !== 0 ? (
        <Carousel
          width={Dimensions.get('screen').width}
          height={Dimensions.get('screen').width * 0.6}
          data={data}
          loop
          // vertical={true}
          mode="parallax"
          // modeConfig={{
          //   parallaxScrollingScale: 0.9,
          //   parallaxScrollingOffset: 50
          // }}
          // autoPlay={true}
          autoPlayInterval={4000}
          snapEnabled={true}
          scrollAnimationDuration={300}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10]
          }}
          // pagingEnabled={true}
          renderItem={({item: props}: {item: NowPlayingMovieResults}) => (
            <TouchableWithoutFeedback
              key={props.id}
              onPress={() => navigation.navigate('ExampleNavigation')}
              style={{
                height: 200,
                width: Dimensions.get('screen').width,
                backgroundColor: colors.grey100
              }}>
              <ImageBackground
                source={{uri: `${IMG_HOST}${props.poster_path}`}}
                imageStyle={{height: 200}}>
                <Text>{props.title}</Text>
              </ImageBackground>
            </TouchableWithoutFeedback>
          )}
        />
      ) : null}
    </GestureHandlerRootView>
  );
};

export default Home;
