import React, { useState } from 'react';
import { Modal as RNModal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Container,
  Bottom,
  CancelButton,
  ConfirmButton,
  ButtonText,
  Header,
  HeaderText,
  ContainerList,
  ItemList,
  Image,
  List,
} from './styles';

export default function ColorModal({
  visible,
  onCancelPress,
  listData,
  listDone,
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);

  // baseado no type filtra os indices do array, extrai usando o slice ou sla oq
  const dispatch = useDispatch();

  const tFronts = useSelector(state => state.shirts.tFronts);
  const bFronts = useSelector(state => state.shirts.bFronts);
  const hFronts = useSelector(state => state.shirts.hFronts);

  function handleChangeSelected({ item, index }) {
    setSelectedIndex(index);
    setSelectedItem(item);
  }

  function handleDispath() {
    dispatch({
      type: `@shirts/update_color`,
      payload: {
        tf: tFronts[selectedIndex].uri,
        bf: bFronts[selectedIndex].uri,
        hf: hFronts[selectedIndex].uri,
      },
    });
    listDone(selectedItem.uri);
  }

  return (
    <RNModal visible={visible} animated={true}>
      <Container>
        <Header>
          <HeaderText>Escolha a cor abaixo</HeaderText>
        </Header>
        <List
          data={listData}
          keyExtractor={item => String(item.uri)}
          renderItem={({ item, index }) => (
            <ContainerList>
              <ItemList
                selected={index === selectedIndex}
                onPress={() => handleChangeSelected({ item, index })}
              >
                <Image source={{ uri: item.uri }} resizeMode="contain" />
              </ItemList>
            </ContainerList>
          )}
          numColumns={2}
        />
      </Container>
      <Bottom>
        <CancelButton onPress={onCancelPress}>
          <ButtonText>Cancelar</ButtonText>
        </CancelButton>
        <ConfirmButton onPress={handleDispath}>
          <ButtonText>Adicionar</ButtonText>
        </ConfirmButton>
      </Bottom>
    </RNModal>
  );
}

ColorModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancelPress: PropTypes.func.isRequired,
};
