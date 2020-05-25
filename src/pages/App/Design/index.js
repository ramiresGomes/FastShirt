import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { captureRef } from 'react-native-view-shot';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-tiny-toast';

import {
  Modal as CustomModal,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';

import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import Header from '~/components/Header';
import Modal from '~/components/Modal';
import CustomList from '~/components/List';
import Carousel from '~/components/Carousel';
import FontPicker from '~/components/FontPicker';

import Draggable from './PickText/CustomDraggable';

import base from '~/assets/base.png';

import {
  AddToCart,
  AddToCartText,
  Color,
  ESlider as Slider,
  NoSlider,
  Container,
  Bottom,
  BottomButton,
  // FinishButton,
  IconLabel,
  TShirtContainer,
  TShirtImage,
  TopButtonsContainer,
  ActionButton,
  ActionButtonText,
  Input,
  CustomView,
} from './styles';

import api from '~/services/api';

Icon.loadFont();

export default function Design({ navigation }) {
  const customT = useSelector(state => state.shirts.tshirt);
  const customB = useSelector(state => state.shirts.bshirt);
  const customH = useSelector(state => state.shirts.hoodie);

  const tFronts = useSelector(state => state.shirts.tFronts);
  const bFronts = useSelector(state => state.shirts.bFronts);
  const hFronts = useSelector(state => state.shirts.hFronts);

  // const boomt = useSelector(state => state.shirts.boomt);

  const captureViewRef = useRef(); // ref para capturar a imagem
  const imgRef = useRef(); // ref repassada ao draggable com 'forwardRef'

  const baseImg = resolveAssetSource(base); // imagem transparente para inicializar

  const [data, setData] = useState([]);
  const [models, setModels] = useState([]);

  const [text, setText] = useState('');

  const [font, setFont] = useState('');

  const [finalSize, setFinalSize] = useState(0);
  const [textHeight, setTextHeight] = useState(0);

  const [selected, setSelected] = useState('none');
  const [color, setColor] = useState('#fff');

  const [size, setSize] = useState(0.1);
  const [sizeSticker, setSizeSticker] = useState(0.1);
  const [textSize, setTextSize] = useState(10);

  const [position, setPosition] = useState({
    minX: 300,
    maxX: 900,
    minY: 300,
    maxY: 900,
  });

  const [images, setImages] = useState([]);
  const [stickers, setStickers] = useState([]);

  const [shirtType, setShirtType] = useState('tshirt');

  const [tFront, setTFront] = useState(customT.front);
  const [bFront, setBFront] = useState(customB.front);
  const [hFront, setHFront] = useState(customH.front);

  const [tShirtImage, setTShirtImage] = useState(tFront);
  const [image, setImage] = useState(baseImg.uri);

  const [sticker, setSticker] = useState(baseImg.uri);
  const [stickerID, setStickerID] = useState(1);

  useEffect(() => {
    async function loadImages() {
      const [imgs, stk] = await Promise.all([
        api.get('design-shirt/image'),
        api.get('design-shirt/sticker'),
      ]);
      // stk.data.push(nw);

      setImages(imgs.data);
      setStickers(stk.data);
      setData(stk.data);
    }
    loadImages();
  }, []);

  useEffect(() => {
    setTFront(customT.front);
  }, [customT]);

  useEffect(() => {
    setBFront(customB.front);
  }, [customB]);

  useEffect(() => {
    setHFront(customH.front);
  }, [customH]);

  // modais
  const [visible, setVisible] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [visible6, setVisible6] = useState(false);

  const [zindexImg, setZindexImg] = useState(0);
  const [zindexSticker, setZindexSticker] = useState(1);

  const [editMode, setEditMode] = useState(false);

  const [distanceX, setDistanceX] = useState(0);
  const [distanceY, setDistanceY] = useState(55);

  const [paddingX, setPaddingX] = useState(0);
  const [paddingY, setPaddingY] = useState(20);

  const [internalX, setInternalX] = useState(0);
  const [internalY, setInternalY] = useState(0);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [canSend, setCanSend] = useState(false);

  useEffect(() => {
    // definindo posição maxima do draggable de acordo com a imagem selecionada
    switch (shirtType) {
      case 'tshirt':
        setTShirtImage(tFront);
        setModels(tFronts);
        setPosition({
          minX: distanceX + internalX,
          maxX: distanceX + paddingX + internalX + width,
          minY: /* distanceY + */ paddingY /* + internalY */,
          maxY: /* distanceY + */ paddingY + internalY + height,
        });
        break;

      case 'babylook':
        setTShirtImage(bFront);
        setModels(bFronts);
        setPosition({
          minX: distanceX + internalX,
          maxX: distanceX + paddingX + internalX + width,
          minY: /* distanceY + */ paddingY /* + internalY */,
          maxY: /* distanceY + */ paddingY + internalY + height,
        });
        break;

      case 'hoodie':
        setTShirtImage(hFront);
        setModels(hFronts);
        setPosition({
          minX: distanceX + internalX,
          maxX: distanceX + paddingX + internalX + width,
          minY: /* distanceY + */ paddingY /* + internalY */,
          maxY: /* distanceY + */ paddingY + internalY + height,
        });
        break;
      default:
    }
    if (image === baseImg.uri && sticker === baseImg.uri) {
      setCanSend(false);
    }
  }, [shirtType, selected, image, sticker]); // aqui sepa

  useEffect(() => {
    if (selected === 'none' || selected === 'frase') {
      // setTextB(`${text} `);
      setFinalSize(finalSize + 0.01);
    }
  }, [selected]); //eslint-disable-line

  useEffect(() => {
    // setTextB(`${text} `);
    setFinalSize(finalSize + 0.01);
  }, [color, font]); //eslint-disable-line

  useEffect(() => {
    // alterna qual imagem fica no topo, se a imagem ou a figura
    if (selected === 'imagem') {
      setZindexImg(1);
      setZindexSticker(0);
    } else {
      setZindexImg(0);
      setZindexSticker(1);
    }
  }, [selected]);

  async function handleChange(id, uri) {
    try {
      const upload = new FormData();

      upload.append('front_printscreen', {
        uri, // here goes the uri
        type: 'image/jpeg', // trocar pra png
        name: `${uri}.jpeg`,
      });

      upload.append('back_printscreen', {
        uri, // here goes the uri
        type: 'image/jpeg', // trocar pra png
        name: `${uri}.jpeg`,
      });

      upload.append('font_family', 'Oswald');
      upload.append('text', text);
      // upload.append('front_printable_image_id', frontPrintableId);
      upload.append('front_printable_image_id', id);
      // upload.append('back_printable_image_id', backPrintableId);
      upload.append('back_printable_image_id', id);

      // const {
      //   data: { front_printscreen, back_printscreen },
      // } =
      await api.post('design-shirt/purchase', upload);

      setImage(baseImg.uri); // apaga a imagem - coloca imagem transparente
      setSticker(baseImg.uri); // apaga o sticker - coloca imagem transparente

      setText('');
      Toast.show('Sua camiseta foi enviada!');

      setVisible4(false); // fecha modal de 'enviando imagem'
    } catch (err) {
      setVisible4(false); // fecha modal de 'enviando imagem'

      Toast.show('Houve um erro no envio da imagem.');
    }
  }

  async function captureShirt(id) {
    try {
      const uri = await captureRef(captureViewRef, {
        format: 'png',
        quality: 1,
      });

      await handleChange(id, uri);
    } catch (err) {
      Toast.show('Erro na captura da camiseta');
    }
  }

  async function uploadPrintable(photouri) {
    try {
      const upload = new FormData();

      upload.append('name', `${photouri}.jpeg`);
      upload.append('image', {
        uri: photouri, // here goes the uri
        type: 'image/jpeg', // trocar pra png
        name: `${photouri}.jpeg`,
      });

      const { id } = await api.post('design-shirt/printables/sticker', upload); // envia pra api

      await captureShirt(id);

      setEditMode(false);
    } catch (err) {
      Toast.show('Erro no envio da imagem'); // printe o err.status
    }
  }

  async function capturePic() {
    try {
      if (image === baseImg.uri) {
        await captureShirt(33); // tem que ver isso dps
      } else {
        const uri = await captureRef(imgRef, {
          format: 'png',
          quality: 1,
        });

        await uploadPrintable(uri);
      }
    } catch (err) {
      Toast.show('Verifique sua conexão à internet.');
      setVisible4(false);
    }
  }

  function handleChoosePhoto() {
    const options = {
      title: 'Selecionar imagem',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Tirar foto',
      chooseFromLibraryButtonTitle: 'Selecionar imagem da galeria',
      mediaType: 'photo',
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) setEditMode(false);
      else if (response.error)
        Toast.show('Houve um erro ao selecionar a imagem. ');
      else {
        const source = { uri: `data:image/jpeg;base64,${response.data}` };

        setImage(source.uri);

        setSelected('imagem');
        setSize(120);
      }
    });
  }

  return (
    <>
      <Header navigation={navigation} title="Design" />

      <Container
        onLayout={({ nativeEvent: { layout } }) => {
          setDistanceX(layout.x);
          setDistanceY(layout.y);
        }}
      >
        <TShirtContainer
          onLayout={({ nativeEvent: { layout } }) => {
            setPaddingX(layout.x);
            setPaddingY(layout.y);
          }}
          ref={captureViewRef}
        >
          <TShirtImage
            onLayout={({ nativeEvent: { layout } }) => {
              setInternalX(layout.x);
              setInternalY(layout.y);
              setWidth(layout.width);
              setHeight(layout.height);
            }}
            source={{ uri: tShirtImage }}
            resizeMode="cover"
          />
          {image !== baseImg.uri && (
            <Draggable
              ref={imgRef}
              selected={image !== baseImg.uri && selected === 'imagem'} // aqui sepa
              imageSource={{ uri: image }}
              renderSize={size}
              // onLongPress={() => setSelected('imagem')}
              onLongPress={() => {
                if (canSend) {
                  setImage(baseImg.uri);
                }
                setSelected('none');
              }}
              x={position.minX + 100}
              y={position.minY + 100}
              z={zindexImg}
              minX={position.minX}
              maxX={position.maxX}
              minY={position.minY}
              maxY={position.maxY}
              loaded={value => setCanSend(value)}
              onDrag={() => {}}
              onShortPressRelease={() => {}}
              onDragRelease={() => {
                setTimeout(() => setSelected('none'), 3000);
              }}
              onPressIn={() => setSelected('imagem')}
              onPressOut={() => {}}
              onRelease={() => {}}
            />
          )}
          {sticker !== baseImg.uri && (
            <Draggable
              selected={selected === 'figura'}
              imageSource={{ uri: sticker }}
              renderSize={sizeSticker}
              // onLongPress={() => setSelected('figura')}
              onLongPress={() => {
                setSticker(baseImg.uri);
                setSizeSticker(0.1);
                setSelected('none');
              }}
              x={position.minX + 100}
              y={position.minY + 100}
              z={zindexSticker}
              minX={position.minX}
              maxX={position.maxX}
              minY={position.minY}
              maxY={position.maxY}
              loaded={value => setCanSend(value)}
              onDrag={() => {}}
              onShortPressRelease={() => {}}
              onDragRelease={() => {
                setTimeout(() => setSelected('none'), 3000);
              }}
              onPressIn={() => {
                setSelected('figura');
              }}
              onPressOut={() => {}}
              onRelease={() => {}}
            />
          )}
          <Draggable
            renderText={text}
            adaptive={value => setTextSize(value)}
            adaptiveHeight={value => setTextHeight(value)}
            font={font}
            selected={selected === 'frase'} // aqui sepa
            textSize={20 + finalSize / 4}
            onLongPress={() => {
              setText('');
              setSelected('none');
            }}
            renderHeight={textHeight} // alt1
            renderSize={textSize}
            textColor={color}
            x={position.minX + 100}
            y={position.minY + 100}
            z={2}
            minX={position.minX - 10}
            maxX={position.maxX + 10}
            minY={position.minY}
            maxY={position.maxY}
            onDrag={() => {}}
            onShortPressRelease={() => {}}
            onDragRelease={() => {
              setTimeout(() => setSelected('none'), 3000);
            }}
            onPressIn={() => {
              setSelected('frase');
            }}
            onPressOut={() => {}}
            onRelease={() => {}}
          />
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

        <NoSlider>
          {selected !== 'none' ? (
            <>
              <Slider
                value={1}
                minimumValue={20}
                maximumValue={120}
                onValueChange={value => {
                  switch (selected) {
                    case 'imagem':
                      setSize(value);

                      break;
                    case 'figura':
                      setSizeSticker(value);
                      break;
                    case 'frase':
                      setFinalSize(value);
                      break;
                    default:
                  }
                }}
              />
              <Text
                style={{
                  marginTop: -10,
                  fontSize: 14,
                  color: '#333',
                  textAlign: 'center',
                }}
              >{`Tamanho da ${selected}`}</Text>
            </>
          ) : (
            <AddToCart
              onPress={() => {
                if (canSend) {
                  setVisible4(true);
                  capturePic();
                } else {
                  Toast.show('Edite alguma camiseta antes de enviar.');
                }
              }}
            >
              <AddToCartText>Adicionar ao Carrinho</AddToCartText>
            </AddToCart>
          )}
        </NoSlider>
      </Container>

      <Bottom>
        <BottomButton
          onPress={() => {
            if (editMode) {
              // aqui sepa -- nao vai utilizar mais
              setSelected('none');
              setEditMode(false);
            } else handleChoosePhoto();
          }}
        >
          <Icon name="collections" size={40} color="#FFF" />

          <IconLabel>Imagem</IconLabel>
        </BottomButton>

        <BottomButton onPress={() => setVisible6(true)}>
          <Icon name="palette" size={40} color="#FFF" />
          <IconLabel>Cores</IconLabel>
        </BottomButton>

        <BottomButton onPress={() => setVisible(true)}>
          <Icon name="mood" size={40} color="#FFF" />

          <IconLabel>Stickers</IconLabel>
        </BottomButton>

        <BottomButton onPress={() => setVisible3(true)}>
          <Icon name="title" size={40} color="#FFF" />
          <IconLabel>Textos</IconLabel>
        </BottomButton>
      </Bottom>
      <Modal
        visible={visible}
        disabled={true}
        onRequestClose={() => {
          setVisible(false);
        }}
      >
        <CustomList
          images={images}
          stickers={stickers}
          side="front"
          handle={(value, id) => {
            setSticker(value);
            setSelected('figura');
            setSizeSticker(120);
            setStickerID(id);
          }}
          setId={value => {
            setStickerID(value);
          }}
          close={() => setVisible(false)}
          done={() => {
            setVisible(false);
          }}
        />
      </Modal>

      <CustomModal // selecionar texto
        visible={visible3}
        animationType="slide"
        transparent
        onRequestClose={() => setVisible3(false)}
      >
        <CustomView style={{ alignItems: 'center', justifyContent: 'center' }}>
          <View
            style={{
              padding: 10,
              backgroundColor: '#eee',
              width: 280,
              height: 395,
              borderRadius: 5,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                marginTop: 3,
                fontSize: 14,
                color: '#111',
                textAlign: 'center',
              }}
            >
              Informe o texto abaixo:
            </Text>
            <Input
              autoFocus
              value={text}
              onLayout={({ nativeEvent: { layout } }) => {
                setTextSize(layout.width);
                // setFinalSize(0); // alt1
              }}
              placeholderTextColor="rgba(0,0,0,0.8)"
              onChangeText={txt => setText(txt)}
              maxLength={15}
              returnKeyType="send"
              onSubmitEditing={() => {
                setSelected('frase');
                setText(text);
                setVisible3(false);
              }}
              underlineColorAndroid="transparent"
            />
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                alignSelf: 'stretch',
                marginTop: 4,
                marginBottom: 4,
              }}
            />
            <Text
              style={{
                marginTop: 5,
                marginBottom: 5,
                fontSize: 14,
                color: '#111',
                textAlign: 'center',
              }}
            >
              Selecione a cor do texto:
            </Text>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                alignSelf: 'stretch',
                marginTop: 4,
                marginBottom: 4,
              }}
            />
            <View
              style={{
                height: 51,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Color
                hitSlop={{ top: 2, bottom: 2, left: 2, right: 2 }}
                color="#000"
                onPress={() => setColor('#000')}
              />
              <Color
                hitSlop={{ top: 2, bottom: 2, left: 2, right: 2 }}
                color="#000ff0"
                onPress={() => setColor('#000ff0')}
              />
              <Color
                hitSlop={{ top: 2, bottom: 2, left: 2, right: 2 }}
                color="#e6b32a"
                onPress={() => setColor('#e6b32a')}
              />
              <Color
                hitSlop={{ top: 2, bottom: 2, left: 2, right: 2 }}
                color="#ff0000"
                onPress={() => setColor('#ff0000')}
              />

              <Color
                hitSlop={{ top: 2, bottom: 2, left: 2, right: 2 }}
                color="#008800"
                onPress={() => setColor('#008800')}
              />

              <Color
                hitSlop={{ top: 2, bottom: 2, left: 2, right: 2 }}
                color="#ff00f0"
                onPress={() => setColor('#ff00f0')}
              />

              <Color
                hitSlop={{ top: 2, bottom: 2, left: 2, right: 2 }}
                color="#fff"
                onPress={() => setColor('#fff')}
              />
            </View>
            {/* <View
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
                  // setSelected('frase');
                  setVisible3(false);
                  setText(text);
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
                <PickTextButtonText>Fechar</PickTextButtonText>
              </PickTextButton>
            </View> */}
            {/* </View> */}
            <View
              style={{
                width: 270,
                height: 230,
                borderRadius: 5,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FontPicker
                example="A frase fica assim"
                setFont={value => setFont(value)}
                done={() => setVisible3(false)}
              />
            </View>
          </View>
        </CustomView>
      </CustomModal>

      <CustomModal
        visible={visible4}
        animationType="slide"
        transparent
        onRequestClose={() => setVisible4(false)}
      >
        <CustomView>
          <View
            style={{
              backgroundColor: '#333',
              width: 200,
              height: 120,
              borderRadius: 8,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 12, color: '#fff', textAlign: 'center' }}>
              Enviando a camiseta, aguarde...
            </Text>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        </CustomView>
      </CustomModal>

      <Modal
        visible={visible6}
        disabled={false}
        disabledContent={true}
        onRequestClose={() => setVisible6(false)}
      >
        <Carousel
          data={models}
          done={value => {
            setTShirtImage(value);
            setVisible6(false);
          }}
          type={shirtType}
          side="front"
        />
      </Modal>
    </>
  );
}
