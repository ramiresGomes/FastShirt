import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  LeftBlock,
  MiddleBlock,
  Side,
  SideName,
  Price,
  HeaderButton,
  RightBlock,
  HeaderTitle,
} from './styles';

export default function Header({ navigation, title = null }) {
  return (
    <Container>
      <LeftBlock>
        <HeaderButton onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={32} color="#000" />
        </HeaderButton>
      </LeftBlock>

      <MiddleBlock>
        {title === null ? (
          <>
            <Side>
              <SideName>Frente</SideName>
              <Price>R$ 39,90</Price>
            </Side>

            <Side>
              <SideName>Verso</SideName>
              <Price>R$ 9,90</Price>
            </Side>
          </>
        ) : (
          <HeaderTitle>{title}</HeaderTitle>
        )}
      </MiddleBlock>

      <RightBlock>
        <HeaderButton onPress={() => {}}>
          <Icon name="search" size={30} color="#000" />
        </HeaderButton>

        <HeaderButton onPress={() => {}}>
          <Icon name="shopping-basket" size={30} color="#000" />
        </HeaderButton>
      </RightBlock>
    </Container>
  );
}
