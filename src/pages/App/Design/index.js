import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';

import { useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-picker';

import Header from '~/components/Header';
import Modal from '~/components/Modal';

import PickImage from './PickImage';

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

  // console.tron.log(`tfront: ${customT.front}`);
  // console.tron.log(`tback: ${customT.back}`);

  // console.tron.log(`bfront: ${customB.front}`);
  // console.tron.log(`bback: ${customB.back}`);

  // console.tron.log(`hfront: ${customH.front}`);
  // console.tron.log(`hback: ${customH.back}`);

  // se der certo, tira o import dai e popula com o reducer, já poupa inicializaçao e codigo

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

  function handleChoosePhoto() {
    const options = {
      title: 'Selecionar imagem',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Tirar foto',
      chooseFromLibraryButtonTitle: 'Selecionar imagem da galeria',
      mediaType: 'photo',
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.tron.log('User cancelled image picker');
      } else if (response.error) {
        console.tron.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: `data:image/jpeg;base64,${response.data}` };
        setVisible(true);
        setImage(source);
      }
    });
  }

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
        <BottomButton onPress={() => handleChoosePhoto()}>
          <Image source={iconImage} resizeMode="contain" />
          <IconLabel>Imagem</IconLabel>
        </BottomButton>

        <BottomButton onPress={() => {}}>
          <Image source={iconColor} resizeMode="contain" />
          <IconLabel>Cores</IconLabel>
        </BottomButton>

        <BottomButton onPress={() => {}}>
          <Image source={iconStickers} resizeMode="contain" />
          <IconLabel>Stickers</IconLabel>
        </BottomButton>

        <BottomButton onPress={() => {}}>
          <Image source={iconText} resizeMode="contain" />
          <IconLabel>Textos</IconLabel>
        </BottomButton>
      </Bottom>
      <Modal visible={visible} onRequestClose={() => setVisible(false)}>
        <PickImage
          image={image}
          shirt={tShirtImage}
          type={shirtType}
          side={shirtSide}
          done={() => setVisible(false)}
        />
      </Modal>
    </>
  );
}
