import React, { useState } from 'react';
import { Image, View } from 'react-native';

import { List, Item, Header } from './styles';

// const  = [
//   { key: 'A' },
//   { key: 'B' },
//   { key: 'C' },
//   { key: 'D' },
//   { key: 'E' },
//   { key: 'F' },
//   { key: 'G' },
//   { key: 'H' },
//   { key: 'I' },
//   { key: 'J' },
//   { key: 'K' },
//   // { key: 'L' },
// ];

import image from '~/assets/samples/photo.jpg';
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

export default function CustomList({ data, side, handle, done }) {
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
        <Text style={{ fontSize: 16, color: '#333' }}>R$ 21.19</Text>
      </Header>
      <List
        data={formatData(data, numColumns)}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Item
            onPress={() => {
              handle(item.url);
              done();
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
    </View>
  );
}
