import styled from 'styled-components/native';
import { TouchableOpacity, Image } from 'react-native';

export const Container = styled.View`
  background: #fff;
  flex: 1;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 5px;
  padding-right: 5px;
  position: relative;
`;

export const Bottom = styled.View`
  background: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 10px 20px 15px;
  align-items: center;
`;

export const BottomButton = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
`;

export const TShirtContainer = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  padding-top: 20px;
  margin-top: 35px;
`;

export const TShirtImage = styled(Image)`
  width: 100%;
  margin-top: 5px;
`;

export const TopButtonsContainer = styled.View`
  position: absolute;
  width: 100%;
  margin: 0 5px;
  top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const ActionButton = styled(TouchableOpacity)`
  background: ${props => (props.active ? '#E58230' : '#fff')};
  border: 1px solid ${props => (props.active ? '#E58230' : '#dcdcdc')};
  border-radius: 50px;
  padding: 8px 20px;
  align-items: center;
  margin: 0 10px;
  min-width: 100px;
`;

export const ActionButtonText = styled.Text`
  font-size: 15px;
  color: ${props => (props.active ? '#fff' : '#000')};
`;

export const AddToCart = styled(TouchableOpacity)`
  background: #5bae59;
  border-radius: 50px;
  padding: 10px 20px;
  width: 260px;
  align-items: center;
  margin: 10px 0;
  align-self: center;
`;

export const AddToCartText = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: normal;
`;

export const CannotSendAlert = styled.Text`
  background: #ccc;
  border-radius: 50px;
  padding: 10px 20px;
  width: 260px;
  align-items: center;
  margin: 10px 0;
  align-self: center;
  text-align: center;
  color: #000;
  font-size: 16px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(0,0,0,0.8)',
})`
  background-color: 'rgba(255, 255, 255, 0.8)';
  width: 260px;
  border-width: 1px;
  border-color: 'rgba(0, 0, 0, 0.4)';
  border-radius: 2px;
  height: 35px;
  padding: 2px 0 2px 0;
  margin: 5px 0 5px 0;
  color: rgba(0, 0, 0, 0.8);
`;

export const CustomView = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: 'rgba(0, 0, 0, 0.7)';
  justify-content: center;
`;

export const NoSlider = styled.View`
  background-color: transparent;
  width: 100%;
  height: 50px;
  margin-top: 30px;
  align-self: center;
`;

export const ContainerActions = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-self: center;
  display: flex;
  width: 80%;
`;

export const Color = styled.TouchableOpacity`
  height: 25px;
  width: 25px;
  border-radius: 12.5px;
  border-color: #e2e;
  margin: 5px 5px;
  background-color: ${props => props.color};
`;

export const UploadShirtLoading = styled.View`
  background-color: #333;
  width: 200px;
  height: 120px;
  border-radius: 8px;
  align-self: center;
  align-items: center;
  justify-content: center;
`;

export const FontList = styled.View`
  width: 270px;
  height: 230px;
  border-radius: 5px;
  align-self: center;
  align-items: center;
  justify-content: center;
`;

export const ColorsContainer = styled.View`
  height: 51px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Separator = styled.View`
  border-bottom-color: black;
  border-bottom-width: 1px;
  align-self: stretch;
  margin-top: 4px;
  margin-bottom: 4px;
`;

export const ChooseColorText = styled.Text`
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 14px;
  color: #111;
  text-align: center;
`;

export const TypeInText = styled.Text`
  margin-top: 3px;
  font-size: 14px;
  color: #111;
  text-align: center;
`;

export const FontMenu = styled.View`
  padding: 10px;
  background-color: #eee;
  width: 280px;
  height: 395px;
  border-radius: 5px;
  align-self: center;
  align-items: center;
  justify-content: center;
`;
