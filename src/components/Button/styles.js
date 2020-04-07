import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton).attrs({
  shadowColor: '#fff',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 3,
})`
  height: 46px;
  background: #fff;
  border-radius: 23px;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 0 60px;
  min-width: 240px;
`;

export const Text = styled.Text`
  color: #035811;
  font-weight: bold;
  font-size: 16px;
`;
