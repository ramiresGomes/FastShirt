import { Platform } from 'react-native';
import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import AuthInput from '~/components/AuthInput';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const TitleText = styled.Text`
  font-size: 40px;
  font-weight: bold;
  color: #fff;
  margin-top: 20px;
`;

export const SubtitleText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 20px;
`;

export const FormInput = styled(AuthInput)`
  margin-top: 20px;
`;

export const SubmitButton = styled(RectButton)`
  height: 55px;
  background: #3b8e39;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 0 30px;
  max-width: 280px;
  width: 100%;
`;

export const SubmitButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const FacebookButton = styled(RectButton)`
  flex-direction: row;
  height: 55px;
  background: #3b5998;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  margin: 20px auto 0;
  padding: 0 30px;
  max-width: 280px;
  width: 100%;
`;

export const FacebookButtonIcon = styled(Icon)`
  font-size: 16px;
  color: #fff;
  margin-right: 15px;
`;

export const FacebookButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const RecoveryButton = styled.TouchableOpacity`
  margin: 10px 0 30px;
`;

export const RecoveryText = styled.Text`
  color: #fff;
  font-size: 16px;
  text-align: center;
`;

export const SignLink = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const SignLinkText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
