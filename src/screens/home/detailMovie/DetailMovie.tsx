/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {LoadingView, Text} from '@root/src/components';
import {AppNavigationParams, AppNavigationProps} from '@root/src/navigation/AppNavigation';
import {IMG_HOST} from '@root/src/services/api';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, FlatList, Image, ImageBackground, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {themeState} from '../../setting/setting.model';
import {fecthDetailMovie} from './detailMovie.model';
import {DetailMovieData} from './detailMovie.types';
import {Chip} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '@root/src/themes';

type DetailMovieRouteProps = RouteProp<AppNavigationParams, 'DetailMovie'>;

const Setting = () => {
  const theme = useRecoilValue(themeState);
  const {params} = useRoute<DetailMovieRouteProps>();
  const navigation = useNavigation<AppNavigationProps>();

  const [data, setData] = useState<DetailMovieData | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(true);

  const yOffset = useRef(new Animated.Value(0)).current;
  const headerOpacity = yOffset.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  useEffect(() => {
    loadDetailMovie();
  }, [headerOpacity]);

  const loadDetailMovie = async () => {
    const response = await fecthDetailMovie(params.id);
    setLoadingDetail(false);
    if (response) {
      setData(response);
    }
  };

  if (loadingDetail) {
    return <LoadingView />;
  }

  if (!data) {
    return (
      <View>
        <Text>Empty</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <Animated.View
        style={{
          opacity: headerOpacity,
          backgroundColor: theme.background,
          position: 'absolute',
          top: 0,
          zIndex: 1,
          height: 50,
          width: '100%'
        }}>
        <Text>{data?.title}</Text>
      </Animated.View>
      <Animated.ScrollView
        style={{zIndex: 0}}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: yOffset
                }
              }
            }
          ],
          {useNativeDriver: true}
        )}
        scrollEventThrottle={16}>
        <ImageBackground
          source={{uri: `${IMG_HOST}${data?.backdrop_path}`}}
          imageStyle={{
            height: 200,
            width: '100%'
          }}
          style={{
            height: 200,
            width: '100%',
            justifyContent: 'flex-end'
          }}
        />
        <View style={{marginTop: -50, flexDirection: 'row'}}>
          <View style={{width: '30%', paddingLeft: 10}}>
            <Image
              source={{uri: `${IMG_HOST}${data?.poster_path}`}}
              style={{height: 160, width: 110}}
            />
          </View>
          <View style={{paddingTop: 50, padding: 6, width: '70%'}}>
            <Text color={theme.text} style={{fontSize: 18, fontWeight: '800'}} paddingVertical={6}>
              {data?.title}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Chip
                label={String(data?.vote_average)}
                labelStyle={{color: theme.text}}
                leftElement={
                  <Icon name="star" size={16} color={colors.warning} style={{paddingLeft: 6}} />
                }
                // size={{width: 60, height: 10}}
                containerStyle={{marginRight: 6}}
              />
              <Chip
                label={String(data?.vote_count)}
                labelStyle={{color: theme.text}}
                leftElement={
                  <Icon
                    name="supervised-user-circle"
                    size={16}
                    color={colors.warning}
                    style={{paddingLeft: 6}}
                  />
                }
                // size={{width: 100, height: 10}}
                containerStyle={{marginRight: 6}}
              />
              <Chip
                label={String(data?.popularity)}
                labelStyle={{color: theme.text}}
                leftElement={
                  <Icon
                    name="local-fire-department"
                    size={16}
                    color={colors.warning}
                    style={{paddingLeft: 6}}
                  />
                }
                // size={{width: 100, height: 10}}
                containerStyle={{marginRight: 6}}
              />
            </View>
            <FlatList
              keyExtractor={item => item.id.toString()}
              data={data?.genres}
              horizontal
              contentContainerStyle={{
                // height: 20,
                marginTop: 6,
                alignItems: 'center',
                flexGrow: 1
              }}
              renderItem={({item}) => (
                <Chip
                  label={item.name}
                  labelStyle={{color: colors.grey100}}
                  containerStyle={{marginRight: 6}}
                  onPress={() => navigation.navigate('MovieBy', {id: item.id})}
                  backgroundColor={colors.primary}
                />
              )}
            />
          </View>
        </View>
        <View style={{padding: 10}}>
          <Text color={theme.text}>{data?.overview}</Text>
        </View>
        <View
          style={{
            backgroundColor: data?.status === 'Released' ? colors.darkGreen : colors.darkOrange,
            elevation: 4
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <Icon
              name={data.status === 'Released' ? 'check-circle' : 'timelapse'}
              size={16}
              color={colors.white}
              style={{paddingLeft: 6}}
            />
            <Text color={colors.white}>{data?.status}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <Icon name="date-range" size={16} color={colors.white} style={{paddingLeft: 6}} />
            <Text color={colors.white}>{data?.release_date}</Text>
          </View>
          <Text color={theme.text}>Release Date: {data?.release_date}</Text>
          <Text color={theme.text}>Budget: {String(data?.budget)}</Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default Setting;
