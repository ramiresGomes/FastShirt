import styled from 'styled-components/native';

export const List = styled.FlatList`
  height: 80%;
  background-color: #fff;
  border-radius: 8px;
  margin-top: 15px;
`;

export const Item = styled.TouchableOpacity`
  background-color: ${props => (props.disabled ? 'transparent' : '#fff')};
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  flex: 1;
  margin: 1px;
  border: ${props => (props.disabled ? 'transparent' : '0.8px solid #ccc')};
  width: 30px;
  height: 90px;
`;

export const Header = styled.View`
  flex: 1;
  align-self: center;
  height: 40px;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 2px 5px;
  margin-bottom: 10px;
  align-items: center;
`;

export const ContainerActions = styled.View`
  width: 100%;
  height: 32px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;

export const Actions = styled.TouchableOpacity`
  height: 30px;
  width: 30px;
  border-radius: 15px;
  margin: 3px;
`;

export const Border = styled.View`
  border-bottom-color: black;
  border-bottom-width: 1px;
  align-self: stretch;
  margin-top: 4px;
  margin-bottom: 4px;
`;

export const AltText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  align-self: center;
  color: ${props => (props.active ? '#fff' : '#000')};
  font-weight: ${props => (props.active ? 'bold' : 'normal')};
`;

export const AltButton = styled.TouchableOpacity`
  width: 70px;
  height: 25px;
  border-radius: 4px;
  background: ${props => (props.active ? '#038311' : '#fff')};
  border: 1px solid ${props => (props.active ? '#038311' : '#dcdcdc')};
`;

export const TextPriceContainer = styled.View`
  flex-direction: row;
  align-self: center;
  width: 130px;
  height: 30px;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const ImgStickerButtonsContainer = styled.View`
  flex-direction: row;
  align-self: center;
  width: 150px;
  height: 30px;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 15px;
`;
