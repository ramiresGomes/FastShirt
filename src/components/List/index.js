import React, { useState } from 'react';
import { Image, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  List,
  AltText,
  AltButton,
  Item,
  Header,
  ContainerActions,
  Actions,
  TextPriceContainer,
  ImgStickerButtonsContainer,
} from './styles';

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

export default function CustomList({
  images,
  stickers,
  close,
  side,
  handle,
  done,
}) {
  const [data, setData] = useState(stickers);
  const [price, setPrice] = useState('');
  const [active, setActive] = useState(false);
  const [altButton, setAltButton] = useState('stickers');
  const [selected, setSelected] = useState(null);

  return (
    <View>
      <Header>
        <TextPriceContainer>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#038841',
              marginRight: 5,
            }}
          >
            {side}
          </Text>
          <Text style={{ fontSize: 14, color: '#333' }}>
            {price === '' ? 'R$0.00' : price}
          </Text>
        </TextPriceContainer>
        <ImgStickerButtonsContainer>
          <AltButton
            active={altButton === 'estampas'}
            onPress={() => {
              setData(images);
              setAltButton('estampas');
            }}
          >
            <AltText active={altButton === 'estampas'}>Estampas</AltText>
          </AltButton>
          <AltButton
            active={altButton === 'stickers'}
            onPress={() => {
              setData(stickers);
              setAltButton('stickers');
            }}
          >
            <AltText active={altButton === 'stickers'}>Stickers</AltText>
          </AltButton>
        </ImgStickerButtonsContainer>
      </Header>
      <List
        data={formatData(data, numColumns)}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) =>
          !item.empty && (
            <Item
              onPress={() => {
                setPrice(item.price);
                setActive(true);
                setSelected(item);
              }}
            >
              <Image
                source={{ uri: item.thumbnail }}
                resizeMode="contain"
                style={{ width: 90, height: 90 }}
              />
            </Item>
          )
        }
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
