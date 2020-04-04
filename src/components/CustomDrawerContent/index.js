import React from 'react';
import { Image } from 'react-native';
import { DrawerItemList } from '@react-navigation/drawer';

import logoHeader from '~/assets/logo-drawer-header.png';
import logoFooter from '~/assets/logo-drawer-footer.png';

import { Container, Header, Footer, DrawerContent } from './styles';

export default function CustomDrawerContent(props) {
  return (
    <Container>
      <DrawerContent {...props}>
        <Header>
          <Image source={logoHeader} />
        </Header>

        <DrawerItemList {...props} />

        <Footer>
          <Image source={logoFooter} />
        </Footer>
      </DrawerContent>
    </Container>
  );
}
