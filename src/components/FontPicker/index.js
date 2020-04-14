import React from 'react';
import { Text } from 'react-native';

import { List, Item } from './styles';

export default function FontPicker({ example, setFont, done }) {
  const data = [
    { id: 1, font: 'Montserrat' },
    { id: 2, font: 'Arial' },
    { id: 3, font: 'Hunting' },
    { id: 4, font: 'Oswald' },
    { id: 5, font: 'Colibri' },
  ];

  return (
    <>
      <Text style={{ alignSelf: 'center', fontSize: 26, color: '#ddd' }}>
        Selecione a fonte:
      </Text>
      <List
        data={data}
        keyExtractor={(item) => String(item.id)}
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
