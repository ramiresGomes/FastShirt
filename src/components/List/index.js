import React, { useState } from 'react';
import { Image, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { List, Item, Header, ContainerActions, Actions } from './styles';

import { Text } from '../Button/styles';

function formatData(data, numColumns) {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow += 1;
  }

  return data;
}

const numColumns = 3;

export default function CustomList({ data, close, side, handle, done, setId }) {
  const [price, setPrice] = useState('');
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState(null);
  const [id, stId] = useState(null);

  return (
    <View>
      <Header>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#038841',
            marginRight: 5,
          }}
        >
          {side}
        </Text>
        <Text style={{ fontSize: 16, color: '#333' }}>
          {price === '' ? 'R$0.00' : price}
        </Text>
      </Header>
      <List
        data={formatData(data, numColumns)}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Item
            onPress={() => {
              setPrice(item.price);
              setActive(true);
              setSelected(item);
              stId(item.id);
            }}
          >
            <Image
              source={{ uri: item.thumbnail }}
              resizeMode="contain"
              style={{ width: 90, height: 90 }}
            />
          </Item>
        )}
        numColumns={numColumns}
      />
      <ContainerActions>
        <Actions
          onPress={close}
          style={{ backgroundColor: '#d10000' }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon name="close" size={30} color="#FFF" />
        </Actions>
        <Actions
          disabled={!active}
          onPress={() => {
            handle(selected.url);
            setId(id);
            done();
          }}
          style={{ backgroundColor: '#038311' }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon name="done" size={30} color="#FFF" />
        </Actions>
      </ContainerActions>
    </View>
  );
}
