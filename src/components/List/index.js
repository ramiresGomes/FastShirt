import React from 'react';
import { Image } from 'react-native';

import { List, Item } from './styles';

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

import image from '~/assets/photo.jpg';

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

export default function CustomList({ data, handle, done }) {
  function renderItem({ item, index }) {
    if (item.empty === true) {
      return <Item disabled={true} />;
    }
    return (
      <Item
        onPress={() => {
          handle(image);
          done();
        }}
      >
        {/* <Text style={{ color: '#FFF' }}>{item.key}</Text> */}
        <Image source={image} resizeMode="contain" style={{ height: 90 }} />
      </Item>
    );
  }

  return (
    <List
      data={formatData(data, numColumns)}
      renderItem={renderItem}
      numColumns={numColumns}
    />
  );
}
