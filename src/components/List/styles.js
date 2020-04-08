import styled from 'styled-components/native';

export const List = styled.FlatList`
  height: 90%;
  background-color: #fff;
`;

export const Item = styled.TouchableOpacity`
  background-color: ${(props) => (props.disabled ? 'transparent' : '#e6b32a')};
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: 1px;
  border: 0.8px solid #ccc;
  width: 30px;
  height: 90px;
`;
