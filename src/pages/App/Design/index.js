import React, { useMemo, useRef, useState, useEffect } from 'react';
import CameraRoll from '@react-native-community/cameraroll';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { captureRef } from 'react-native-view-shot';

import ImagePicker from 'react-native-image-picker';

import {
  Image,
  Modal as CustomModal,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { useSelector } from 'react-redux';

import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-tiny-toast';
import Draggable from './PickText/CustomDraggable';

import Header from '~/components/Header';
import Modal from '~/components/Modal';
import CustomList from '~/components/List';
import Carousel from '~/components/Carousel';
// import FontPicker from '~/components/FontPicker';

import PickImage from './PickImage';

import photoTeste from '~/assets/fu.jpeg';

import base from '~/assets/base.png';

import {
  Actions,
  ContainerActions,
  Color,
  ESlider as Slider,
  NoSlider,
  Container,
  Bottom,
  BottomButton,
  FinishButton,
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

import api from '~/services/api';
// import api from '~/services/apt';

Icon.loadFont();

export default function Design({ navigation }) {
  const customT = useSelector(state => state.shirts.tshirt);
  const customB = useSelector(state => state.shirts.bshirt);
  const customH = useSelector(state => state.shirts.hoodie);

  const tFronts = useSelector(state => state.shirts.tFronts);
  const tBacks = useSelector(state => state.shirts.tBacks);
  const bFronts = useSelector(state => state.shirts.bFronts);
  const bBacks = useSelector(state => state.shirts.bBacks);
  const hFronts = useSelector(state => state.shirts.hFronts);
  const hBacks = useSelector(state => state.shirts.hBacks);

  const boomt = useSelector(state => state.shirts.boomt);

  const [main, setMain] = useState('');

  const captureViewRef = useRef();
  const imgRef = useRef();

  const baseImg = resolveAssetSource(base);

  const [data, setData] = useState([]);
  const [models, setModels] = useState([]);
  const [text, setText] = useState('');
  const [font, setFont] = useState('');
  const [finalSize, setFinalSize] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const [slider, setSlider] = useState(1); // slider de size
  const [selected, setSelected] = useState('none'); // slider de size
  const [disableslider, setDSlider] = useState(false); // slider de size
  const [color, setColor] = useState('#fff'); // slider de size

  const [size, setSize] = useState(0.1); // slider de size
  const [sizeSticker, setSizeSticker] = useState(0.1); // slider de size
  const [maxSize, setMaxSize] = useState(1); // slider de size
  const [textSize, setTextSize] = useState(10);

  const [position, setPosition] = useState({
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0,
  });

  const [images, setImages] = useState([]);
  const [stickers, setStickers] = useState([]);

  const nw = {
    id: 5,
    name: 'Blank One',
    url: boomt.uri,
    price: '34,90',
    thumbnail:
      'https://clubedocavalo.shop/uploads/design_shirt/printable_images/5/image/indiferente.png/thumbs/indiferente.png',
  };

  const [shirtType, setShirtType] = useState('tshirt');
  const [shirtSide, setShirtSide] = useState('front');

  const [tFront, setTFront] = useState(customT.front);
  const [tBack, setTBack] = useState(customT.back);

  const [bFront, setBFront] = useState(customB.front);
  const [bBack, setBBack] = useState(customB.back);

  const [hFront, setHFront] = useState(customH.front);
  const [hBack, setHBack] = useState(customH.back);

  const [tShirtImage, setTShirtImage] = useState(tFront);
  const [image, setImage] = useState(baseImg.uri);
  const [sticker, setSticker] = useState(baseImg.uri);
  const [stickerID, setStickerID] = useState(1);

  const [photo, setPhoto] = useState(baseImg.uri);

  useEffect(() => {
    async function loadImages() {
      const [imgs, stk] = await Promise.all([
        api.get('design-shirt/image'),
        api.get('design-shirt/sticker'),
      ]);
      stk.data.push(nw);

      setImages(imgs.data);
      setStickers(stk.data);
      setData(stk.data);
    }
    loadImages();
  }, []);

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

  // const finalSize = useMemo(() => {
  //   return (textSize / 1.5) * slider;
  // }, [textSize, slider]);

  // useEffect(() => {
  //   if (finalSize > 140) {
  //     setDSlider(true);
  //   } else setDSlider(false);
  // }, [finalSize, textSize, slider]);

  // useEffect(() => {
  //   setMaxSize(154 / textSize);
  //   console.tron.log(`max size: ${maxSize}`);
  //   setSlider(1);
  // }, [textSize]);

  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [visible5, setVisible5] = useState(false);

  const [zindexImg, setZindexImg] = useState(0);
  const [zindexSticker, setZindexSticker] = useState(1);

  const [visible6, setVisible6] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [galleryIcon, setGalleryIcon] = useState('collections');
  const [colorsIcon, setColorsIcon] = useState('palette');
  const [editIcon, setEditIcon] = useState('create');
  const [stickersIcon, setStickersIcon] = useState('mood');
  const [textIcon, setTextIcon] = useState('title');

  useEffect(() => {
    switch (shirtType) {
      case 'tshirt':
        shirtSide === 'front' ? setTShirtImage(tFront) : setTShirtImage(tBack);
        shirtSide === 'front' ? setModels(tFronts) : setModels(tBacks);
        shirtSide === 'front'
          ? setPosition({ minX: 92, maxX: 223, minY: 100, maxY: 300 })
          : setPosition({ minX: 97, maxX: 225, minY: 80, maxY: 310 });

        break;
      case 'babylook':
        shirtSide === 'front' ? setTShirtImage(bFront) : setTShirtImage(bBack);
        shirtSide === 'front' ? setModels(bFronts) : setModels(bBacks);
        setPosition({ minX: 101, maxX: 219, minY: 80, maxY: 301 });

        break;
      case 'hoodie':
        shirtSide === 'front' ? setTShirtImage(hFront) : setTShirtImage(hBack);
        shirtSide === 'front' ? setModels(hFronts) : setModels(hBacks);
        setPosition({ minX: 95, maxX: 219, minY: 130, maxY: 285 });

        break;
      default:
    }
  }, [shirtType, shirtSide]);

  useEffect(() => {
    setText(`${text} `);
  }, [color]);

  useEffect(() => {
    if (selected === 'imagem') {
      setZindexImg(1);
      setZindexSticker(0);
    } else {
      setZindexImg(0);
      setZindexSticker(1);
    }
  }, [selected]);

  useEffect(() => {
    if (editMode) {
      setGalleryIcon('clear');
      setColorsIcon('delete');
      setEditIcon('info');
      setStickersIcon('archive');
      setTextIcon('done');
    } else {
      setGalleryIcon('collections');
      setColorsIcon('palette');
      setEditIcon('create');
      setStickersIcon('mood');
      setTextIcon('title');
    }
  }, [editMode]);

  async function handleChange(photouri, idimg) {
    const upload = new FormData();
    let side = 'lado_principal';
    let otherSide = 'outro_lado';

    if (shirtSide === 'front') {
      side = 'front_printscreen';
      otherSide = 'back_printscreen';
    } else {
      side = 'back_printscreen';
      otherSide = 'front_printscreen';
    }

    upload.append(`${side}`, {
      uri: photouri, // here goes the uri
      type: 'image/jpeg', // trocar pra png
      name: `${photoTeste}.jpeg`,
    });

    upload.append(`${otherSide}`, null);
    upload.append('front_printable_image_id', idimg);
    upload.append('back_printable_image_id', idimg);
    upload.append('text', text);
    upload.append('font_family', 'Oswald');

    const response = await api.post('design-shirt/purchase', upload);

    const {
      id,
      front_printscreen,
      back_printscreen,
      text: txt,
      font_family,
    } = response.data;
    console.tron.log(
      `id: ${id}, front: ${front_printscreen}, back: ${back_printscreen}, text: ${txt}, font ${font_family}`
    );
    setImage(baseImg.uri);
    setSticker(baseImg.uri);

    setText('');
    console.tron.log(`response: ${response.data}`);
    setEditMode(false);
    Toast.show('Sua camiseta foi enviada!');
    setVisible4(false);
  }

  function onCapture(id) {
    captureRef(captureViewRef, {
      format: 'jpg',
      quality: 1,
    }).then(uri => {
      setMain(uri);
      handleChange(uri, id);
    });
  }

  async function uploadPrintable(photouri) {
    const upload = new FormData();

    upload.append('name', `${photouri}.jpeg`);
    upload.append('image', {
      uri: photouri, // here goes the uri
      type: 'image/jpeg', // trocar pra png
      name: `${photouri}.jpeg`,
    });

    const response = await api.post('design-shirt/printables/sticker', upload); // envia pra api

    const { id, url } = response.data;
    console.tron.log(`actual upload: ${response.data}`);

    console.tron.log(`id img printable: ${id} e url img: ${url}`);

    onCapture(id);
    setEditMode(false);
  }

  function capturePrintable() {
    captureRef(imgRef, {
      format: 'png',
      quality: 1,
    }).then(uri => {
      console.tron.log(`LOOOOOOOOOOOOOOOOOOOOOOOL`);
      console.tron.log(`printable: ${uri}`);
      uploadPrintable(uri);
    });
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
      if (response.didCancel) {
        console.tron.log('User cancelled image picker');
      } else if (response.error) {
        console.tron.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: `data:image/jpeg;base64,${response.data}` };
        setImage(source.uri);
        setEditMode(true);
        setSelected('imagem');
        setSize(120);
        setPhoto(source.uri);
      }
    });
  }

  function saveToGallery() {
    setSelected('none');
    captureRef(captureViewRef, {
      format: 'jpg',
      quality: 1,
    })
      .then(uri => {
        CameraRoll.saveToCameraRoll(uri, 'photo')
          .then(() => {
            console.tron.log('salvou na galeria.');
            Toast.show('A imagem foi salva na galeria.');
          })
          .catch(() => console.tron.log('erro no salvamento'));
      })
      .catch(() => console.tron.log('erro no print'));
  }

  console.tron.log('width final: ', finalSize + textSize);
  console.tron.log('this: ', finalSize);
  return (
    <>
      <Header navigation={navigation} title="Design" />

      <Container>
        <TShirtContainer ref={captureViewRef}>
          <TShirtImage source={{ uri: tShirtImage }} resizeMode="contain" />
          <Draggable
            ref={imgRef}
            selected={editMode && selected === 'imagem'}
            disabled={!editMode}
            imageSource={{ uri: image }}
            renderSize={size}
            onLongPress={() => setSelected('imagem')}
            x={position.minX}
            y={position.minY}
            z={zindexImg}
            minX={position.minX}
            maxX={position.maxX}
            minY={position.minY}
            maxY={position.maxY}
            onDrag={() => {}}
            onShortPressRelease={() => {}}
            onDragRelease={() => {}}
            onPressIn={() => {}}
            onPressOut={() => {}}
            onRelease={() => {}}
          />
          <Draggable
            disabled={!editMode}
            selected={editMode && selected === 'figura'}
            imageSource={{ uri: sticker }}
            renderSize={sizeSticker}
            onLongPress={() => setSelected('figura')}
            x={position.minX}
            y={position.minY + 30}
            z={zindexSticker}
            minX={position.minX}
            maxX={position.maxX}
            minY={position.minY}
            maxY={position.maxY}
            onDrag={() => {}}
            onShortPressRelease={() => {}}
            onDragRelease={() => {}}
            onPressIn={() => {}}
            onPressOut={() => {}}
            onRelease={() => {}}
          />
          <Draggable
            disabled={!editMode}
            renderText={text}
            textSize={11 + finalSize / 5}
            onLongPress={() => setSelected('frase')}
            renderHeight={12}
            renderSize={textSize + finalSize}
            textColor={color}
            x={position.minX + 10}
            y={position.minY + 30}
            z={2}
            minX={position.minX - 10}
            maxX={position.maxX + 10}
            minY={position.minY}
            maxY={position.maxY}
            onDrag={() => {}}
            onShortPressRelease={() => {}}
            onDragRelease={() => {}}
            onPressIn={() => {}}
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
        {editMode && selected !== 'none' ? (
          <>
            <Slider
              value={slider}
              minimumValue={2}
              maximumValue={86}
              onValueChange={value => {
                switch (selected) {
                  case 'imagem':
                    setSize(value);
                    break;
                  case 'figura':
                    setSizeSticker(value);
                    break;
                  case 'frase':
                    if (finalSize + textSize < 136) setFinalSize(value);

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
          <NoSlider />
        )}

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
            if (editMode) setEditMode(false);
            else handleChoosePhoto();
          }}
        >
          <Icon name={galleryIcon} size={40} color="#FFF" />

          <IconLabel>{editMode ? 'Fechar' : 'Imagem'}</IconLabel>
        </BottomButton>

        <BottomButton
          onPress={() => {
            if (editMode) {
              if (selected === 'imagem') {
                setImage(baseImg.uri);
                setSelected('none');
              } else if (selected === 'frase') {
                setText('');
                setSelected('none');
              } else {
                setSticker(baseImg.uri);
                setSelected('none');
              }
            } else {
              setVisible6(true);
            }
            setSelected('none');
          }}
        >
          <Icon name={colorsIcon} size={40} color="#FFF" />
          <IconLabel>{editMode ? 'Apagar' : 'Cores'}</IconLabel>
        </BottomButton>

        <BottomButton
          onPress={() => {
            if (editMode) {
              console.tron.log('none');
            } else {
              setEditMode(true);
            }
          }}
        >
          <Icon name={editIcon} size={40} color="#FFF" />

          <IconLabel>{editMode ? 'Tutorial' : 'Editar'}</IconLabel>
        </BottomButton>
        <BottomButton
          onPress={() => {
            if (editMode) {
              setSelected('none');
              Toast.show('Clique novamente para salvar a camista');

              if (selected === 'none') saveToGallery();
            } else {
              setVisible(true);
            }
          }}
        >
          <Icon name={stickersIcon} size={40} color="#FFF" />

          <IconLabel>{editMode ? 'Salvar' : 'Stickers'}</IconLabel>
        </BottomButton>

        <BottomButton
          onPress={() => {
            if (editMode) {
              setSelected('none');
              Toast.show('Clique novamente para enviar a camista');
              if (selected === 'none') {
                setVisible4(true);
                capturePrintable();
              }
            } else setVisible3(true);
          }}
        >
          <Icon name={textIcon} size={40} color="#FFF" />
          <IconLabel>{editMode ? 'Enviar' : 'Textos'}</IconLabel>
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
          data={data}
          side={shirtSide}
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
            setEditMode(true);
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
          done={value => {
            console.tron.log(`value: ${value}`);
            setTShirtImage(value);
            setVisible2(false);
          }}
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
              height: 180,
              borderRadius: 5,
              alignSelf: 'center',
              alignItems: 'center',
            }}
          >
            <Input
              autoFocus
              value={text}
              onLayout={event => {
                console.tron.log('event properties: ', event);
                console.tron.log('width: ', event.nativeEvent.layout.width);
                setTextSize(event.nativeEvent.layout.width);
                setFinalSize(0);
              }}
              onChangeText={setText}
              maxLength={11}
              returnKeyType="send"
              onSubmitEditing={() => {
                setText(text);
                setVisible3(false);
              }}
              underlineColorAndroid="transparent"
            />
            <ScrollView
              style={{
                height: 35,
                backgroundColor: '#222',
              }}
              horizontal={true}
            >
              <Color
                hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                color="#ff0000"
                onPress={() => {
                  setColor('#ff0000');
                }}
              />
              <Color
                hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                color="#000ff0"
                onPress={() => {
                  setColor('#000ff0');
                }}
              />
              <Color
                hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                color="#f0f00f"
                onPress={() => {
                  setColor('#f0f00f');
                }}
              />
              <Color
                hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                color="#7159c1"
                onPress={() => {
                  setColor('#7159c1');
                }}
              />
              <Color
                hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                color="#00ff00"
                onPress={() => {
                  setColor('#00ff00');
                }}
              />
              <Color
                hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                color="#ff0000"
                onPress={() => {
                  setColor('#ff0000');
                }}
              />
              <Color
                hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                color="#ff00f0"
                onPress={() => {
                  setColor('#ff00f0');
                }}
              />
              <Color
                hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                color="#e6b32a"
                onPress={() => {
                  setColor('#e6b32a');
                }}
              />
              <Color
                hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                color="#fff"
                onPress={() => {
                  setColor('#fff');
                }}
              />

              <Color
                hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                color="#000"
                onPress={() => {
                  setColor('#000');
                }}
              />
              <Color
                hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                color="#f0f"
                onPress={() => {
                  setColor('#f0f');
                }}
              />
            </ScrollView>
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
                  setText(text);

                  // setVisible4(true);
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
            console.tron.log(`value image: ${value}`);
            setTShirtImage(value);
            setVisible6(false);
          }}
          type={shirtType}
          side={shirtSide}
        />
      </Modal>
    </>
  );
}
