import styled from 'styled-components/native';
import Slider from '@react-native-community/slider';

export const PickPhoto = styled.TouchableOpacity`
  width: 250px;
  height: 20px;
  border-radius: 10px;
  background-color: #116333;
  align-items: center;
`;

export const ESlider = styled(Slider).attrs({
  minimumTrackTintColor: '#FFFFFF',
  maximumTrackTintColor: '#000000',
})`
  width: 100%;
  height: 50px;
  margin-top: 5px;
`;

export const ContainerActions = styled.View`
  width: 100%;
  height: 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Actions = styled.TouchableOpacity`
  height: 30px;
  width: 30px;
  border-radius: 15px;
  margin: 5px;
`;
