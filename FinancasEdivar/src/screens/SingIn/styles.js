import styled from "styled-components/native";
import { getStatusBarHeight} from 'react-native-status-bar-height'
import { Animated } from "react-native";


export const Container = styled.View`
  flex: 2;
  background-color:#171f25;
`
export const BoxLogo = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
 export const Logo = styled(Animated.Image).attrs({
    paddingTop: 0 + getStatusBarHeight(),
    resizeMode: 'contain',
  })`
  flex: 1;
  margin-top: 25%;
  justify-content: center;
  align-items: center;
  /* background-color: red; */
  margin: 5px;
`;
export const ContainerInput = styled.View`
  flex: ${({isKeyboardVisible}) => isKeyboardVisible ? '2' : '1'};
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
export const ButtonEnter = styled.TouchableOpacity`
  height: 50px;
  width: 50%;
  align-items: center;
  background-color: #5fb74c;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin: 15px;
`;
export const TextButton = styled.Text`
  font-size: 18px;
  color: black;
`;