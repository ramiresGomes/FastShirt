import styled from 'styled-components/native';
import { TouchableOpacity, Image } from 'react-native';
import Slider from '@react-native-community/slider';

export const Container = styled.View`
  background: #00f2f2;
  flex: 1;
  padding: 20px;
  position: relative;
`;

export const Bottom = styled.View`
  background: #252424;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 20px 10px;
  align-items: center;
`;

export const BottomButton = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
`;

export const IconLabel = styled.Text`
  margin-top: 5px;
  color: #fff;
  width: 100%;
  text-align: center;
`;

export const TShirtContainer = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  padding-top: 20px;
  background-color: #fff202;
`;

export const TShirtImage = styled(Image)`
  width: 100%;
  height: 480px;
`;

export const TopButtonsContainer = styled.View`
  position: absolute;
  width: 100%;
  margin: 0 20px;
  top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const ActionButton = styled(TouchableOpacity)`
  background: ${props => (props.active ? '#038841' : '#fff')};
  border: 1px solid ${props => (props.active ? '#038841' : '#dcdcdc')};
  border-radius: 4px;
  padding: 5px 15px;
  min-width: 100px;
  align-items: center;
  margin: 0 10px;
`;

export const ActionButtonText = styled.Text`
  font-size: 16px;
  color: ${props => (props.active ? '#fff' : '#000')};
  font-weight: ${props => (props.active ? 'bold' : 'normal')};
`;

export const BottomButtonsContainer = styled.View`
  position: absolute;
  width: 100%;
  margin: 10px 20px 0;
  bottom: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Input = styled.TextInput`
  background-color: 'rgba(0, 0, 0, 0.1)';
  flex: 1;
  border-width: 1px;
  border-color: 'rgba(0, 0, 0, 0.2)';
  border-radius: 5px;
  height: 80px;
  padding: 2px 0 2px 0;
  margin: 5px 0 5px 0;
  color: #fff;
`;

export const CustomView = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: 'rgba(0, 0, 0, 0.7)';
  justify-content: center;
`;

export const PickTextButton = styled.Text`
  background-color: #7159c1;
  padding: 5px;
  border-radius: 4px;
  margin-right: 5px;
  height: 35px;
  width: 70px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const FinishButton = styled.Text`
  background-color: #038841;
  padding: 5px;
  border-radius: 4px;
  margin-right: 5px;
  height: 45px;
  width: 170px;
  align-items: center;
  align-self: center;
  justify-content: center;
  text-align: center;
`;

export const PickTextButtonText = styled.Text`
  font-size: 12px;
  color: #fff;
  text-align: center;
`;

export const ESlider = styled(Slider).attrs({
  minimumTrackTintColor: '#FFFFFF',
  maximumTrackTintColor: '#000000',
})`
  width: 100%;
  height: 35px;
  margin-top: 20px;
`;

export const AddToCart = styled.TouchableOpacity`
  background: #038841;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  padding: 5px 15px;
  min-width: 60px;
  align-items: center;
  margin: 0 10px;
`;

export const NoSlider = styled.View`
  background-color: transparent;
  width: 100%;
  height: 45px;
  margin-top: 5px;
`;

export const ContainerActions = styled.View`
  width: 200px;
  height: 35px;
  margin-top: 5px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const Actions = styled.TouchableOpacity`
  height: 30px;
  width: 30px;
  border-radius: 15px;
  margin: 10px;
`;

export const Color = styled.TouchableOpacity`
  height: 25px;
  width: 25px;
  border-radius: 12.5px;
  border-color: #e2e;
  margin: 2px 5px 0 0;
  background-color: ${props => props.color};
`;
