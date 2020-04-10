import React, { useState, useEffect } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  Alert,
  Modal as CustomModal,
  View,
} from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import { useSelector } from 'react-redux';

import Header from '~/components/Header';
import Modal from '~/components/Modal';
import CustomList from '~/components/List';
import Carousel from '~/components/Carousel';
import FontPicker from '~/components/FontPicker';

import PickImage from './PickImage';
import PickText from './PickText';

import iconImage from '~/assets/ico-image.png';
import iconColor from '~/assets/ico-color.png';
import iconStickers from '~/assets/ico-sticker.png';
import iconText from '~/assets/ico-text.png';

import bat from '~/assets/samples/batlogo.png';
import sm from '~/assets/samples/smlogo.png';
import rs from '~/assets/samples/rocketseat.png';
import stt from '~/assets/samples/photo.jpg';

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
  Input,
  CustomView,
  PickTextButton,
  PickTextButtonText,
} from './styles';

export default function Design({ navigation }) {
  const customT = useSelector((state) => state.user.tshirt);
  const customB = useSelector((state) => state.user.bshirt);
  const customH = useSelector((state) => state.user.hoodie);

  const tFronts = useSelector((state) => state.user.tFronts);
  const tBacks = useSelector((state) => state.user.tBacks);
  const bFronts = useSelector((state) => state.user.bFronts);
  const bBacks = useSelector((state) => state.user.bBacks);
  const hFronts = useSelector((state) => state.user.hFronts);
  const hBacks = useSelector((state) => state.user.hBacks);

  const [data, setData] = useState([]);
  const [models, setModels] = useState([]);
  const [text, setText] = useState('');
  const [font, setFont] = useState('');
  const [disabled, setDisabled] = useState(false);

  const batman = resolveAssetSource(bat);
  const superman = resolveAssetSource(sm);
  const rocket = resolveAssetSource(rs);
  const stitch = resolveAssetSource(stt);

  const [images, setImages] = useState([
    {
      key: 1,
      uri: batman.uri,
      empty: false,
    },
    {
      key: 2,
      uri: superman.uri,
      empty: false,
    },
    {
      key: 3,
      uri: rocket.uri,
      empty: false,
    },
    {
      key: 4,
      uri: stitch.uri,
      empty: false,
    },
  ]);

  // console.tron.log(`models: ${data}`);

  const [stickers, setStickers] = useState([
    {
      key: 1,
      uri: batman.uri,
      empty: false,
    },
    {
      key: 2,
      uri: superman.uri,
      empty: false,
    },
    {
      key: 3,
      uri: batman.uri,
      empty: false,
    },
    {
      key: 4,
      uri: superman.uri,
      empty: false,
    },
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
  const [image, setImage] = useState('');

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
  const [visible5, setVisible5] = useState(false);
  const [visible6, setVisible6] = useState(false);

  useEffect(() => {
    switch (shirtType) {
      case 'tshirt':
        shirtSide === 'front' ? setTShirtImage(tFront) : setTShirtImage(tBack);
        shirtSide === 'front' ? setModels(tFronts) : setModels(tBacks);
        break;
      case 'babylook':
        shirtSide === 'front' ? setTShirtImage(bFront) : setTShirtImage(bBack);
        shirtSide === 'front' ? setModels(bFronts) : setModels(bBacks);
        break;
      case 'hoodie':
        shirtSide === 'front' ? setTShirtImage(hFront) : setTShirtImage(hBack);
        shirtSide === 'front' ? setModels(hFronts) : setModels(hBacks);
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

        <BottomButton onPress={() => setVisible6(true)}>
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
      <Modal
        visible={visible}
        disabled={false}
        onRequestClose={() => setVisible(false)}
      >
        <CustomList
          data={data}
          handle={(value) => {
            console.tron.log(value);
            setImage(value);
          }}
          done={() => {
            setVisible(false);
            setVisible2(true);
          }}
        />
      </Modal>
      <Modal
        visible={visible2}
        disabled={true}
        onRequestClose={() => setVisible2(false)}
      >
        <PickImage
          image={{ uri: image }}
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
        <CustomView>
          <View
            style={{
              backgroundColor: '#333',
              width: 250,
              height: 120,
              borderRadius: 5,
              alignSelf: 'center',
              alignItems: 'center',
            }}
          >
            <Input
              autoFocus
              value={text}
              onChangeText={setText}
              maxLength={15}
              returnKeyType="send"
              onSubmitEditing={() => {
                setVisible3(false);
                setVisible4(true);
              }}
              underlineColorAndroid="transparent"
            />

            <View
              style={{
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: 160,
                height: 50,
                alignSelf: 'center',
              }}
            >
              <PickTextButton
                onPress={() => {
                  setVisible3(false);
                  setVisible4(true);
                }}
              >
                <PickTextButtonText
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  Selecionar
                </PickTextButtonText>
              </PickTextButton>
              <PickTextButton
                onPress={() => setVisible3(false)}
                style={{
                  backgroundColor: '#d10000',
                }}
              >
                <PickTextButtonText>Cancelar</PickTextButtonText>
              </PickTextButton>
            </View>
          </View>
        </CustomView>
      </CustomModal>
      <Modal
        visible={visible4}
        disabledContent={true}
        onRequestClose={() => setVisible4(false)}
      >
        <FontPicker
          setFont={(value) => setFont(value)}
          done={() => {
            setVisible4(false);
            setVisible5(true);
          }}
        />
      </Modal>
      <Modal
        visible={visible5}
        disabled={true}
        onRequestClose={() => setVisible5(false)}
      >
        <PickText
          font={font}
          text={text}
          shirt={tShirtImage}
          type={shirtType}
          side={shirtSide}
          done={() => setVisible5(false)}
        />
      </Modal>
      <Modal
        visible={visible6}
        disabled={false}
        disabledContent={true}
        onRequestClose={() => setVisible6(false)}
      >
        <Carousel
          data={models}
          done={() => setVisible6(false)}
          type={shirtType}
          side={shirtSide}
        />
      </Modal>
    </>
  );
}

// transformar em styled component
// usar o HSV picker pra pegar a cor
// adicionar o header com preço e etc
// aumentar modal e mudar cor de fundo, arrumar borda de cada imagem

// limitar o posicionamento, provalmente com o draggable com um max de 60% da tela, ou algo assim.
// ja atua nas bordas entao ao aumentar o texto, ainda se mantem
