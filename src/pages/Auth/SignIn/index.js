import React, { useRef, useState } from 'react';
import { Image, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { signInRequest } from '~/store/modules/auth/actions';

import Background from '~/components/Background';

import logo from '~/assets/selo.png';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SubmitButtonText,
  TitleText,
  SubtitleText,
  RecoveryButton,
  RecoveryText,
  FacebookButton,
  FacebookButtonText,
  FacebookButtonIcon,
} from './styles';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(email, password));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <TitleText>Bem-vindo</TitleText>
        <SubtitleText>Cadastre-se gratuitamente em 15 segundos</SubtitleText>

        <Form>
          <FormInput
            autoFocus
            icon="person-outline"
            placeholder="Seu email"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />
          <FormInput
            icon="lock-outline"
            placeholder="Sua senha"
            secureTextEntry
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />
          <RecoveryButton
            onPress={() => {
              navigation.navigate('SignUp');
            }}
          >
            <RecoveryText>Recuperar Senha?</RecoveryText>
          </RecoveryButton>
          <SubmitButton onPress={handleSubmit}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <SubmitButtonText>Entrar ou Cadastrar</SubmitButtonText>
            )}
          </SubmitButton>
          <FacebookButton onPress={() => {}}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <FacebookButtonIcon name="facebook-f" />
                <FacebookButtonText>Entrar com Facebook</FacebookButtonText>
              </>
            )}
          </FacebookButton>
        </Form>
      </Container>
    </Background>
  );
}
