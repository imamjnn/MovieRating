/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import {Text, TextInput} from '@root/src/components';
import {AppNavigationProps} from '@root/src/navigation/AppNavigation';
import {IMG_HOST} from '@root/src/services/api';
import {colors} from '@root/src/themes';
import {movieGenres} from '@root/src/utils/static';
import React, {useState} from 'react';
import {FlatList, Image, Pressable, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {MovieListResults} from '../home/home.types';
import {themeState} from '../setting/setting.model';
import {fecthSearchMovie} from './search.model';
import searchStyles from './search.styles';

const Search = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const theme = useRecoilValue(themeState);
  const [query, setQuery] = useState('');

  const searchMovie = fecthSearchMovie(query);

  const onSearch = (txt: string) => {
    setQuery(txt);
    if (txt.length > 3) {
      setTimeout(() => {
        searchMovie.refetch();
      }, 3000);
    }
  };

  const _renderItem = ({item: props}: {item: MovieListResults}) => (
    <Pressable
      style={searchStyles.item}
      onPress={() => navigation.navigate('DetailMovie', {id: props.id})}>
      <View style={{width: '20%'}}>
        <Image source={{uri: `${IMG_HOST}${props.poster_path}`}} style={searchStyles.itemImg} />
      </View>
      <View style={{width: '80%'}}>
        <Text color={theme.text} style={{fontSize: 18, fontWeight: 'bold'}}>
          {props.title}
        </Text>
        <Text color={colors.grey600}>{new Date(props.release_date).getFullYear()}</Text>
        <View style={{flexDirection: 'row'}}>
          {movieGenres
            .filter(a => props.genre_ids.includes(a.id))
            .map(genre => (
              <Text color={colors.grey600} style={{paddingRight: 6, fontSize: 14}}>
                {genre.name}
              </Text>
            ))}
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={[searchStyles.container, {backgroundColor: theme.background}]}>
      <TextInput
        placeholder="Search movie"
        onChangeText={txt => onSearch(txt)}
        iconRight="search"
        backgroundColor={theme.foreground}
        textColor={theme.text}
        placeholderTextColor={colors.grey600}
      />
      <FlatList
        data={searchMovie.data?.results}
        contentContainerStyle={searchStyles.list}
        renderItem={_renderItem}
        keyboardShouldPersistTaps
      />
    </View>
  );
};

export default Search;
