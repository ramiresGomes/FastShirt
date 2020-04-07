import React, { useState, useEffect } from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Modal as CustomModal,
  KeyboardAvoidingView,
} from 'react-native';

import { useSelector } from 'react-redux';

import Header from '~/components/Header';
import Modal from '~/components/Modal';
import CustomList from '~/components/List';

import PickImage from './PickImage';
import PickText from './PickText';

import iconImage from '~/assets/ico-image.png';
import iconColor from '~/assets/ico-color.png';
import iconStickers from '~/assets/ico-sticker.png';
import iconText from '~/assets/ico-text.png';

import {
  Container,
  Bottom,
  BottomButton,
  IconLabel,
  TShirtContainer,
  TShirtImage,
  TopButtonsContainer,
  ActionButton,
  ActionButtonText,
  BottomButtonsContainer,
} from './styles';

export default function Design({ navigation }) {
  const customT = useSelector((state) => state.user.tshirt);
  const customB = useSelector((state) => state.user.bshirt);
  const customH = useSelector((state) => state.user.hoodie);

  const [data, setData] = useState([]);
  const [text, setText] = useState('');

  const [images, setImages] = useState([
    { key: 'A' },
    { key: 'B' },
    { key: 'C' },
    { key: 'D' },
    { key: 'E' },
    { key: 'F' },
  ]);
  const [stickers, setStickers] = useState([
    { key: 'F' },
    { key: 'E' },
    { key: 'D' },
    { key: 'C' },
    { key: 'B' },
    { key: 'A' },
  ]);

  const [shirtType, setShirtType] = useState('tshirt');
  const [shirtSide, setShirtSide] = useState('front');

  const [tFront, setTFront] = useState(customT.front);
  const [tBack, setTBack] = useState(customT.back);

  const [bFront, setBFront] = useState(customB.front);
  const [bBack, setBBack] = useState(customB.back);

  const [hFront, setHFront] = useState(customH.front);
  const [hBack, setHBack] = useState(customH.back);

  const [tShirtImage, setTShirtImage] = useState(tFront);
  const [image, setImage] = useState(null);

  useEffect(() => {
    setTFront(customT.front);
    setTBack(customT.back);
  }, [customT]);

  useEffect(() => {
    setBFront(customB.front);
    setBBack(customB.back);
  }, [customB]);

  useEffect(() => {
    setHFront(customH.front);
    setHBack(customH.back);
  }, [customH]);

  // eh uma verificação de 3 campos. deve ser de apenas 1 que representa os 3. tshirt-front
  // alterar a logica do switch ou monitorar alteração no estado para
  // renderizar apenas quando não há a camiseta do estado
  // viabilizar o 'useCallback', 'useMemo', dimnuir funções e ganhar performance

  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);

  useEffect(() => {
    switch (shirtType) {
      case 'tshirt':
        shirtSide === 'front' ? setTShirtImage(tFront) : setTShirtImage(tBack);
        break;
      case 'babylook':
        shirtSide === 'front' ? setTShirtImage(bFront) : setTShirtImage(bBack);
        break;
      case 'hoodie':
        shirtSide === 'front' ? setTShirtImage(hFront) : setTShirtImage(hBack);
        break;
    }
  }, [shirtType, shirtSide]);

  return (
    <>
      <Header navigation={navigation} title="Design" />

      <Container>
        <TShirtContainer>
          <TShirtImage source={{ uri: tShirtImage }} resizeMode="contain" />
        </TShirtContainer>

        <TopButtonsContainer>
          <ActionButton
            active={shirtType === 'tshirt'}
            onPress={() => setShirtType('tshirt')}
          >
            <ActionButtonText active={shirtType === 'tshirt'}>
              T-Shirt
            </ActionButtonText>
          </ActionButton>

          <ActionButton
            active={shirtType === 'babylook'}
            onPress={() => setShirtType('babylook')}
          >
            <ActionButtonText active={shirtType === 'babylook'}>
              Babylook
            </ActionButtonText>
          </ActionButton>

          <ActionButton
            active={shirtType === 'hoodie'}
            onPress={() => setShirtType('hoodie')}
          >
            <ActionButtonText active={shirtType === 'hoodie'}>
              Moletom
            </ActionButtonText>
          </ActionButton>
        </TopButtonsContainer>

        <BottomButtonsContainer>
          <ActionButton
            active={shirtSide === 'front'}
            onPress={() => setShirtSide('front')}
          >
            <ActionButtonText active={shirtSide === 'front'}>
              Frente
            </ActionButtonText>
          </ActionButton>

          <ActionButton
            active={shirtSide === 'back'}
            onPress={() => setShirtSide('back')}
          >
            <ActionButtonText active={shirtSide === 'back'}>
              Verso
            </ActionButtonText>
          </ActionButton>
        </BottomButtonsContainer>
      </Container>

      <Bottom>
        <BottomButton
          onPress={() => {
            setData(images);
            setVisible(true);
          }}
        >
          <Image source={iconImage} resizeMode="contain" />
          <IconLabel>Imagem</IconLabel>
        </BottomButton>

        <BottomButton onPress={() => {}}>
          <Image source={iconColor} resizeMode="contain" />
          <IconLabel>Cores</IconLabel>
        </BottomButton>

        <BottomButton
          onPress={() => {
            setData(stickers);
            setVisible(true);
          }}
        >
          <Image source={iconStickers} resizeMode="contain" />
          <IconLabel>Stickers</IconLabel>
        </BottomButton>

        <BottomButton
          onPress={() => {
            setVisible3(true);
          }}
        >
          <Image source={iconText} resizeMode="contain" />
          <IconLabel>Textos</IconLabel>
        </BottomButton>
      </Bottom>
      <Modal visible={visible} onRequestClose={() => setVisible(false)}>
        <CustomList
          data={data}
          handle={setImage}
          done={() => {
            setVisible(false);
            setVisible2(true);
          }}
        />
      </Modal>
      <Modal visible={visible2} onRequestClose={() => setVisible2(false)}>
        <PickImage
          image={image}
          shirt={tShirtImage}
          type={shirtType}
          side={shirtSide}
          done={() => setVisible2(false)}
        />
      </Modal>

      <CustomModal
        visible={visible3}
        animationType="slide"
        transparent
        onRequestClose={() => setVisible3(false)}
      >
        <KeyboardAvoidingView
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: '#B9BBBE',
              marginBottom: 5,
            }}
          >
            Nome
          </Text>
          <TextInput
            value={text}
            onChangeText={setText}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              borderWidth: 1,
              borderColor: 'rgba(0, 0, 0, 0.2)',
              borderRadius: 5,
              height: 44,
              paddingHorizontal: 10,
              marginBottom: 20,
              color: '#FFF',
            }}
            autoFocus
            underlineColorAndroid="transparent"
            maxLength={15}
            returnKeyType="send"
            onSubmitEditing={() => {
              setVisible3(false);
              setVisible4(true);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setVisible3(false);
              setVisible4(true);
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFF' }}>
              Criar time
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setVisible3(false)}>
            <Text style={{ alignItems: 'center', marginTop: 20 }}>
              Cancelar
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </CustomModal>
      <Modal visible={visible4} onRequestClose={() => setVisible4(false)}>
        <PickText
          text={text}
          shirt={tShirtImage}
          type={shirtType}
          side={shirtSide}
          done={() => setVisible4(false)}
        />
      </Modal>
    </>
  );
}
