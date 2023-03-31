import React,{ useState,useEffect } from "react";
import * as C from './styles'
import {StatusBar,Animated,Keyboard,Dimensions} from 'react-native'
import Logo from '../../assets/logo.png'
import {InputValues, RenderConditional} from "../../components/index";


export default function SingIn(){
  const { width,height } = Dimensions.get('screen')
  const [user,setUser] = useState('')
  const [password,setPassword] = useState('')
  const [error, setError] = useState(false)
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)
  const [logo] =  useState(new Animated.ValueXY({x: (height / 3), y: 250}));
  

  useEffect(() => {
    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);  

    return () => {
      Keyboard.removeAllListeners('keyboardDidShow')
    }
  }, []);

    //Teclado Aberto
    function keyboardDidShow () {
      Animated.parallel([
        Animated.timing(logo.y, {
          toValue: (Platform.OS === 'android' ? 150 : 150),
          duration: 0,
          useNativeDriver:false
        }),
        Animated.timing(logo.x, {
          toValue: (Platform.OS === 'android' ? (height / 5) : (height / 5)),
          duration: 0,
          useNativeDriver:false
        })
    ]).start();
    setIsKeyboardVisible(true)
    }
    //Teclado Fechou
    function keyboardDidHide () {
      Animated.parallel([
        Animated.timing(logo.y, {
          toValue: 250,
          duration: 150,
          useNativeDriver:false
        }),
        Animated.timing(logo.x, {
          toValue: (height / 3),
          duration: 150,
          useNativeDriver:false
        })
      ]).start();
      setIsKeyboardVisible(false)
    }

    //função de validação de dados para login 
    function validationForm(){
      if(!user || !password){
        setError(true)
      }else{
        setError(false)
      }
    }

  return ( 
    <C.Container>
      <StatusBar hidden={false} translucent={true} backgroundColor='transparent'/>
      <RenderConditional isTrue={(isKeyboardVisible && height > 640)}>
          <C.BoxLogo isKeyboardVisible={isKeyboardVisible}>
              <C.Logo 
                style={{ width: logo.x,height: logo.y}}
                source={Logo} />
          </C.BoxLogo>
      </RenderConditional>

      <RenderConditional isTrue={(!isKeyboardVisible && height >= 640)}>
          <C.BoxLogo>
              <C.Logo 
                style={{ width: logo.x,height: logo.y}}
                source={Logo} />
          </C.BoxLogo>
      </RenderConditional>

    <C.ContainerInput isKeyboardVisible={isKeyboardVisible}>
      <InputValues
        error={error && !user}
        placeholder={'Insira seu usuario'}
        type="text"
        text="Usuario"
        value={user}
        onChangeText={(value) => {setUser(value)}}
      />
      <InputValues
        error={error && !password}
        placeholder={'Insira sua senha'}
        type="password"
        text="Senha"
        value={password}
        onChangeText={(value) => {setPassword(value)}}
        secureTextEntry={true}
      />
      <C.ButtonEnter onPress={validationForm}>
        <C.TextButton>Entrar</C.TextButton>
      </C.ButtonEnter>
     </C.ContainerInput>
    </C.Container>
  )

}