import styled from 'styled-components/native';

export const List = styled.FlatList`
  height: 205px;
  border-radius: 6px;
`;

export const Item = styled.TouchableOpacity`
  background-color: #ddd;
  align-items: center;
  align-self: center;
  justify-content: center;
  border-radius: 4px;
  margin: 5px 0;
  /* border: #ccc; */
  width: 260px;
  height: 35px;
`;
