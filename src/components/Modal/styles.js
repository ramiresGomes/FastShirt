import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: 'rgba(0, 0, 0, 0.7)';
  justify-content: center;
`;

export const Content = styled.View`
  padding: 15px 20px 15px 20px;
  margin: 10px;
  height: 90%;
  border-radius: 5px;
  align-items: stretch;
  background-color: ${props => (props.disabled ? 'transparent' : '#ddd')};
`;

export const CancelButton = styled.TouchableOpacity`
  height: 40px;
  width: 240px;
  background-color: #d10000;
  border-radius: 8px;
  margin-top: 10px;
  align-items: center;
  align-self: center;
  justify-content: center;
  display: ${props => (props.disabled ? 'none' : 'flex')};
`;
