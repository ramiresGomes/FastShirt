import React, { useMemo, useState, useEffect } from 'react';
import { Image } from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import { useDispatch, useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-picker';

import Header from '~/components/Header';
import Modal from '~/components/Modal';

import PickImage from './PickImage';

import { updateShirt } from '~/store/modules/user/actions';

import iconImage from '~/assets/ico-image.png';
import iconColor from '~/assets/ico-color.png';
import iconStickers from '~/assets/ico-sticker.png';
import iconText from '~/assets/ico-text.png';

import tShirtFront from '~/assets/t-shirt-front.png';
import tShirtBack from '~/assets/t-shirt-back.png';

import babylookFront from '~/assets/babylook-front.png';
import babylookBack from '~/assets/babylook-back.png';

import moletomFront from '~/assets/moletom-front.png';
import moletomBack from '~/assets/moletom-back.png';

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
  const [shirtType, setShirtType] = useState('tshirt');
  const [shirtSide, setShirtSide] = useState('front');
  const [tShirtImage, setTShirtImage] = useState(tShirtFront);
  // const [tShirtImage, setTShirtFront] = useState(tShirtFront);

  const updated = useSelector((state) => state.user.preview);
  // const whichUpdated = useSelector((state) => state.user.shirtType);

  // cons;

  // if (updated !== null) {
  //   setTShirtImage(updated);
  // }

  // alterar a logica do switch ou monitorar alteração no estado para
  // renderizar apenas quando não há a camiseta do estado
  // viabilizar o 'useCallback', 'useMemo', dimnuir funções e ganhar performance

  const dispatch = useDispatch();

  const [image, setImage] = useState(null);

  const [visible, setVisible] = useState(false);

  const shirt = useMemo(() => {
    return resolveAssetSource(tShirtImage);
  }, [tShirtImage]);

  useEffect(() => {
    switch (shirtType) {
      case 'tshirt':
        shirtSide === 'front'
          ? setTShirtImage(tShirtFront)
          : setTShirtImage(tShirtBack);
        break;
      case 'babylook':
        shirtSide === 'front'
          ? setTShirtImage(babylookFront)
          : setTShirtImage(babylookBack);
        break;
      case 'moletom':
        shirtSide === 'front'
          ? setTShirtImage(moletomFront)
          : setTShirtImage(moletomBack);
        break;
    }
  }, [shirtType, shirtSide]);

  function handleChoosePhoto() {
    const options = {
      title: 'Escolha uma imagem da galeria',
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.tron.log('Response = ', response);

      if (response.didCancel) {
        console.tron.log('User cancelled image picker');
      } else if (response.error) {
        console.tron.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: `data:image/jpeg;base64,${response.data}` };
        console.tron.log(`camisa${shirt.uri}`);
        dispatch(updateShirt(source, shirt));
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
          <TShirtImage source={tShirtImage} resizeMode="contain" />
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
            active={shirtType === 'moletom'}
            onPress={() => setShirtType('moletom')}
          >
            <ActionButtonText active={shirtType === 'moletom'}>
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
        <PickImage done={() => setVisible(false)} />
      </Modal>
    </>
  );
}
