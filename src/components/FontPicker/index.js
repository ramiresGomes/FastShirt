import React from 'react';
import { View, Text } from 'react-native';

import { List, Item } from './styles';

export default function FontPicker({ example, setFont, done }) {
  const data = [
    { id: 1, font: 'Montserrat' },
    { id: 2, font: 'Learning Curve' },
    { id: 3, font: 'Hunting' },
    { id: 4, font: 'Oswald' },
    { id: 5, font: 'Rotulona Hand' },
    { id: 6, font: 'Shopie' },
    { id: 7, font: 'Andis' },
    { id: 8, font: 'Carily' },
    { id: 9, font: 'Source Sans Pro' },
    { id: 10, font: 'Poppins' },
    { id: 11, font: 'Titillium' },
    { id: 12, font: 'Sofia' },
    { id: 13, font: 'League Gothic' },
    { id: 14, font: 'Cinzel' },
    { id: 15, font: 'Exo 2' },
    { id: 16, font: 'Art Plot' },
    { id: 17, font: 'Dancing Script OT' },
  ];

  return (
    <>
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          alignSelf: 'stretch',
          marginTop: 4,
          marginBottom: 4,
        }}
      />
      <Text
        style={{
          fontFamily: 'Colibri',
          alignSelf: 'center',
          fontSize: 14,
          color: '#111',
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        Selecione a fonte:
      </Text>
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          alignSelf: 'stretch',
          marginTop: 4,
          marginBottom: 4,
        }}
      />
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
              style={{ color: '#111', fontSize: 18, fontFamily: item.font }}
            >
              {example}
            </Text>
          </Item>
        )}
      />
    </>
  );
}
