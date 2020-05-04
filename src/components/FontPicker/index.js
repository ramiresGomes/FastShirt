import React from 'react';
import { Text } from 'react-native';

import { List, Item } from './styles';

export default function FontPicker({ example, setFont, done }) {
  const data = [
    { id: 1, font: 'Montserrat' },
    { id: 2, font: 'Learning Curve' },
    { id: 3, font: 'Hunting' },
    { id: 4, font: 'Oswald' },
    { id: 5, font: 'Rotulona Hand' }, // bad fonts
    { id: 6, font: 'Shopie' },
    { id: 7, font: 'Andis' }, // bad fonts
    { id: 8, font: 'Carily' }, // bad fonts
    { id: 9, font: 'Source Sans Pro' }, // bad fonts
    { id: 10, font: 'Poppins' }, // bad fonts
    { id: 11, font: 'Titillium' }, // bad fonts
    { id: 12, font: 'Sofia' }, // bad fonts
    { id: 13, font: 'League Gothic' }, // bad fonts
    { id: 14, font: 'Cinzel' }, // bad fonts
    { id: 15, font: 'Exo 2' }, // bad fonts
    { id: 16, font: 'Art Plot' }, // bad fonts
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
