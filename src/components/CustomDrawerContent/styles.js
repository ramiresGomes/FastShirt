import styled from 'styled-components/native';
import { DrawerContentScrollView } from '@react-navigation/drawer';

export const Container = styled.View`
  background: #5bae59;
  flex: 1;
  margin: 0;
`;

export const Header = styled.View`
  flex: 1;
  padding: 30px 0;
  align-items: center;
  justify-content: center;
`;

export const DrawerContent = styled(DrawerContentScrollView)`
  flex: 6;
`;

export const Footer = styled.View`
  flex: 2;
  margin-top: 50px;
  padding: 20px 0;
  align-items: center;
  justify-content: center;
`;
