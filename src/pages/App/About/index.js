import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '~/components/Header';

import { Container, PageText } from './styles';

export default function About({ navigation }) {
  AsyncStorage.setItem('var1', JSON.stringify('batatadoce'));
  return (
    <>
      <Header navigation={navigation} title="Sobre" />
      <Container>
        <PageText>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum.
        </PageText>
      </Container>
    </>
  );
}
