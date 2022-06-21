import {Button, Icon, Text, TextInput} from '@root/src/components';
import {colors} from '@root/src/themes';
import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import {useRecoilState, useResetRecoilState} from 'recoil';
import {itemListState, ListParams} from './example.model';
import exampleStyles from './example.styles';

const ExRecoil = () => {
  const [name, setName] = useState('');
  const [updateId, setUpdateId] = useState('');
  const [itemList, setItemList] = useRecoilState(itemListState);
  const resetItemList = useResetRecoilState(itemListState);

  const saveItem = () => {
    if (updateId) {
      updateItem(updateId);
      setUpdateId('');
    } else {
      setItemList(oldData => [...oldData, {date: String(new Date().getTime()), text: name}]);
    }
    setName('');
  };

  const deleteItem = (id: string) => {
    const filterItem = itemList.filter(a => a.date !== id);
    setItemList(filterItem);
  };

  const updateItem = (id: string) => {
    const filterItem = itemList.filter(a => a.date !== id);
    setItemList([...filterItem, {date: id, text: name}]);
  };

  const onUpdateItem = (item: ListParams) => {
    setUpdateId(item.date);
    setName(item.text);
  };

  const _renderItem = ({item: props}: {item: ListParams}) => (
    <View style={exampleStyles.listItem}>
      <View style={exampleStyles.itemGrid1}>
        <Text type="fs16fw500Black">{props.text}</Text>
        <Text type="fs14fw400Black">{props.date}</Text>
      </View>
      <View style={exampleStyles.itemGrid2}>
        <Icon name="edit" color={colors.primary} onPress={() => onUpdateItem(props)} />
        <Icon name="delete" color={colors.error} onPress={() => deleteItem(props.date)} />
      </View>
    </View>
  );

  return (
    <View style={exampleStyles.container2}>
      <TextInput placeholder="Type of name" value={name} onChangeText={txt => setName(txt)} />
      <Button text={updateId ? 'UPDATE' : 'SAVE'} onPress={() => saveItem()} disabled={!name} />
      <FlatList keyExtractor={item => item.date} data={itemList} renderItem={_renderItem} />
      {itemList.length !== 0 && (
        <Button text="Reset All Item" type="outline" onPress={() => resetItemList()} />
      )}
    </View>
  );
};

export default ExRecoil;
