import styled from 'styled-components/native';
import { TouchableOpacity, Image } from 'react-native';

export const Container = styled.View`
  background: #f2f2f2;
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
`;

export const TShirtImage = styled(Image)`
  width: 100%;
  height: 500px;
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
  background: ${(props) => (props.active ? '#038841' : '#fff')};
  border: 1px solid ${(props) => (props.active ? '#038841' : '#dcdcdc')};
  border-radius: 4px;
  padding: 5px 15px;
  min-width: 100px;
  align-items: center;
  margin: 0 10px;
`;

export const ActionButtonText = styled.Text`
  font-size: 16px;
  color: ${(props) => (props.active ? '#fff' : '#000')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
`;

export const BottomButtonsContainer = styled.View`
  position: absolute;
  width: 100%;
  margin: 0 20px;
  bottom: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Input = styled.TextInput`
  background-color: 'rgba(0, 0, 0, 0.1)';
  border-width: 1px;
  border-color: 'rgba(0, 0, 0, 0.2)';
  border-radius: 5px;
  height: 44px;
  padding: 2px 10px 2px 10px;
  margin: 10px 0 10px 0;
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

export const PickTextButtonText = styled.Text`
  font-size: 12px;
  color: #fff;
  text-align: center;
`;
