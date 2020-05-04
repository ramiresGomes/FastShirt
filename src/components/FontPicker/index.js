import React from 'react';
import { Text } from 'react-native';

import { List, Item } from './styles';

export default function FontPicker({ example, setFont, done }) {
  const data = [
    { id: 1, font: 'Montserrat' },
    { id: 2, font: 'Hunting' },
    { id: 3, font: 'Oswald' },
    { id: 4, font: 'Rotulona Hand' }, // cu
    { id: 5, font: 'Shopie' },
    { id: 6, font: 'Carily' }, // cu
    { id: 7, font: 'Andis' }, // cu
  ];

  return (
    <>
      <Text
        style={{
          fontFamily: 'Colibri',
          alignSelf: 'center',
          fontSize: 18,
          color: '#ddd',
        }}
      >
        Selecione a fonte:
      </Text>
      <List
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Item
            onPress={() => {
              setFont(item.font);
              done();
            }}
          >
            <Text
              style={{ color: '#ddd', fontSize: 18, fontFamily: item.font }}
            >
              {example}
            </Text>
          </Item>
        )}
      />
    </>
  );
}
