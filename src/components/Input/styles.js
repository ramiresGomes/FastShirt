import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 25px;
  height: 60px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 46px;
  border: 1px rgba(3, 88, 17, 0.5);
  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255,255,255,0.8)',
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #fff;
`;
