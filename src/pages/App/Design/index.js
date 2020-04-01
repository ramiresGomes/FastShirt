import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';

import Header from '~/components/Header';

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

export default function Design({navigation}) {
  const [shirtType, setShirtType] = useState('tshirt');
  const [shirtSide, setShirtSide] = useState('front');
  const [tShirtImage, setTShirtImage] = useState(tShirtFront);

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
            onPress={() => setShirtType('tshirt')}>
            <ActionButtonText active={shirtType === 'tshirt'}>
              T-Shirt
            </ActionButtonText>
          </ActionButton>

          <ActionButton
            active={shirtType === 'babylook'}
            onPress={() => setShirtType('babylook')}>
            <ActionButtonText active={shirtType === 'babylook'}>
              Babylook
            </ActionButtonText>
          </ActionButton>

          <ActionButton
            active={shirtType === 'moletom'}
            onPress={() => setShirtType('moletom')}>
            <ActionButtonText active={shirtType === 'moletom'}>
              Moletom
            </ActionButtonText>
          </ActionButton>
        </TopButtonsContainer>

        <BottomButtonsContainer>
          <ActionButton
            active={shirtSide === 'front'}
            onPress={() => setShirtSide('front')}>
            <ActionButtonText active={shirtSide === 'front'}>
              Frente
            </ActionButtonText>
          </ActionButton>

          <ActionButton
            active={shirtSide === 'back'}
            onPress={() => setShirtSide('back')}>
            <ActionButtonText active={shirtSide === 'back'}>
              Verso
            </ActionButtonText>
          </ActionButton>
        </BottomButtonsContainer>
      </Container>

      <Bottom>
        <BottomButton onPress={() => {}}>
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
    </>
  );
}
