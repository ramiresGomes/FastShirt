import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 25px;
  height: 60px;
  background: #fff;
  border-radius: 46px;
  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#9f9f9f',
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #9f9f9f;
`;
