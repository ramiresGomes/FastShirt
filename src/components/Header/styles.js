import styled from 'styled-components/native';
import { TouchableWithoutFeedback, Text } from 'react-native';

export const Container = styled.View`
  background: #fff;
  display: flex;
  flex-direction: row;
  padding: 0 10px;
  position: relative;
  align-items: center;
  height: 55px;
`;

export const LeftBlock = styled.View`
  width: 10%;
  height: 100%;
  align-items: flex-start;
  justify-content: center;
`;

export const MiddleBlock = styled.View`
  flex-direction: row;
  justify-content: center;
  width: 70%;
`;

export const Side = styled.View`
  flex-direction: row;
  margin: 0 5px;
`;

export const SideName = styled.Text`
  font-size: 18px;
`;

export const HeaderTitle = styled(Text)`
  font-size: 22px;
  font-weight: bold;
`;

export const Price = styled.Text`
  color: #5bae59;
  margin-left: 5px;
  font-size: 18px;
`;

export const HeaderButton = styled(TouchableWithoutFeedback)`
  margin: 0 10px;
`;

export const RightBlock = styled.View`
  width: 20%;
  flex-direction: row;
  height: 100%;
  align-items: center;
  justify-content: space-around;
`;
