import styled from 'styled-components/native';

export const List = styled.FlatList`
  height: 90%;
  background-color: #fff;
  border-radius: 8px;
  margin-top: 5px;
`;

export const Item = styled.TouchableOpacity`
  background-color: ${(props) => (props.disabled ? 'transparent' : '#fff')};
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  flex: 1;
  margin: 1px;
  border: ${(props) => (props.disabled ? 'transparent' : '0.8px solid #ccc')};
  width: 30px;
  height: 90px;
`;

export const Header = styled.View`
  flex: 1;
  align-self: center;
  height: 40px;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 2px 5px;
  margin-bottom: 10px;
  align-items: center;
`;

export const ContainerActions = styled.View`
  width: 100%;
  height: 35px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

export const Actions = styled.TouchableOpacity`
  height: 30px;
  width: 30px;
  border-radius: 15px;
  margin: 5px;
`;
