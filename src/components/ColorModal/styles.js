import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import {
  TouchableHighlight,
  TouchableOpacity,
  Image as RNImage,
  FlatList,
} from 'react-native';

export const Container = styled.View`
  background: #fff;
  flex: 1;
  position: relative;
`;

export const Header = styled.View`
  margin: 20px 0;
  justify-content: center;
`;

export const HeaderText = styled.Text`
  font-size: 16px;
  color: #000;
  text-align: center;
`;

export const List = styled(FlatList).attrs({
  showsHorizontalScrollIndicator: false,
})``;

export const ContainerList = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const ItemList = styled(TouchableOpacity)`
  width: 90%;
  margin: 0 auto 20px;
  padding: 0 5px;
  border: 3px dashed;
  border-color: ${props => (props.selected ? '#e23333' : 'transparent')};
  border-radius: 1px;
`;

export const Image = styled(RNImage)`
  height: 220px;
  width: 100%;
`;

export const Bottom = styled.View`
  background: #fff;
  border-style: solid;
  border-top-color: #efefef;
  border-top-width: 1px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 15px 20px;
  align-items: center;
`;

export const CancelButton = styled(TouchableHighlight)`
  flex-direction: row;
  height: 45px;
  background: #e23333;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
  width: 40%;
`;

export const ConfirmButton = styled(TouchableHighlight)`
  flex-direction: row;
  height: 45px;
  background: #5bae59;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  width: 40%;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
`;
