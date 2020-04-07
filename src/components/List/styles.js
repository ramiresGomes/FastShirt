import styled from 'styled-components/native';

export const List = styled.FlatList`
  height: 85%;
  background-color: #fff;
  margin-top: 20px;
`;

export const Item = styled.TouchableOpacity`
  background-color: ${(props) => (props.disabled ? 'transparent' : '#fff')};
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: 1px;
  border: 1px solid #999;
  width: 30px;
  height: 90px;
`;
