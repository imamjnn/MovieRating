import {Text} from '@root/src/components';
import {colors} from '@root/src/themes';
import {toRupiah} from '@root/src/utils/formatter';
import React from 'react';
import {FlatList, Image, RefreshControl, StyleSheet, View} from 'react-native';
import {getMarket} from './coinGecko.model';
import {MarketResults} from './coinGecko.types';

const CoinGecko = () => {
  const {isFetching, data, reload, fetchNextPage} = getMarket();

  const mergeData = data?.pages
    .map(page => page ?? [])
    .reduce((prev, current) => {
      current = [...prev, ...current];
      return current;
    }, []);

  const _renderItem = ({item: props}: {item: MarketResults}) => (
    <View style={styles.card}>
      <View style={styles.cardGrid1}>
        <Image source={{uri: props.image}} style={styles.icon} />
      </View>
      <View style={styles.cardGrid2}>
        <Text>{props.name}</Text>
      </View>
      <View style={styles.cardGrid3}>
        <Text type="fs16fw400Black">{toRupiah(Number(props.current_price))}</Text>
      </View>
    </View>
  );

  return (
    <View>
      <FlatList
        keyExtractor={item => item.id}
        data={mergeData}
        renderItem={_renderItem}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={() => reload()} />}
        contentContainerStyle={styles.list}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: colors.grey200,
    borderRadius: 4
  },
  cardGrid1: {
    width: '10%'
  },
  cardGrid2: {
    width: '60%'
  },
  cardGrid3: {
    width: '30%',
    alignItems: 'flex-end'
  },
  icon: {
    height: 20,
    width: 20
  },
  list: {
    flexGrow: 1,
    padding: 12
  }
});

export default CoinGecko;
