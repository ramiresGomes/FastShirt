import React, { useRef, useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import CameraRoll from '@react-native-community/cameraroll';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { captureRef } from 'react-native-view-shot';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-tiny-toast';

import {
  Image,
  Modal as CustomModal,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { useSelector } from 'react-redux';

import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import Header from '~/components/Header';
import Modal from '~/components/Modal';
import CustomList from '~/components/List';
import Carousel from '~/components/Carousel';
import FontPicker from '~/components/FontPicker';

import Draggable from './PickText/CustomDraggable';

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
  // FinishButton,
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

  const tutorial = useSelector(state => state.shirts.tutorial);

  // const boomt = useSelector(state => state.shirts.boomt);

  const captureViewRef = useRef(); // ref para capturar a imagem
  const imgRef = useRef(); // ref repassada ao draggable com 'forwardRef'

  const baseImg = resolveAssetSource(base); // imagem transparente para inicializar

  const [data, setData] = useState([]);
  const [models, setModels] = useState([]);
  const [text, setText] = useState('');
  const [font, setFont] = useState('');
  const [finalSize, setFinalSize] = useState(0);

  const [selected, setSelected] = useState('none');
  const [color, setColor] = useState('#fff');

  const [size, setSize] = useState(0.1);
  const [sizeSticker, setSizeSticker] = useState(0.1);
  const [textSize, setTextSize] = useState(10);

  const [position, setPosition] = useState({
    minX: 300,
    maxX: 700,
    minY: 300,
    maxY: 700,
  });

  const [images, setImages] = useState([]);
  const [stickers, setStickers] = useState([]);

  // const nw = {
  //   id: 5,
  //   name: 'Blank One',
  //   url: boomt.uri,
  //   price: '34,90',
  //   thumbnail:
  //     'https://clubedocavalo.shop/uploads/design_shirt/printable_images/5/image/indiferente.png/thumbs/indiferente.png',
  // };

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

  const [frontImage, setFrontImage] = useState(baseImg.uri);
  const [backImage, setBackImage] = useState(baseImg.uri);

  const [sticker, setSticker] = useState(baseImg.uri);
  const [stickerID, setStickerID] = useState(1);

  const [photo, setPhoto] = useState(tutorial[0].uri);

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

  // modais
  const [visible, setVisible] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [visible6, setVisible6] = useState(false);
  const [visible7, setVisible7] = useState(false);

  const [indexTutorial, setIndexTutorial] = useState(0); // indice do array de imagens no modal de tutorial

  const [zindexImg, setZindexImg] = useState(0);
  const [zindexSticker, setZindexSticker] = useState(1);

  const [editMode, setEditMode] = useState(false);

  // inicializando icones
  const [galleryIcon, setGalleryIcon] = useState('collections');
  const [colorsIcon, setColorsIcon] = useState('palette');
  const [editIcon, setEditIcon] = useState('create');
  const [stickersIcon, setStickersIcon] = useState('mood');
  const [textIcon, setTextIcon] = useState('title');

  const [tutorialBackIcon, setTutorialBackIcon] = useState('close');
  const [tutorialNextIcon, setTutorialNextIcon] = useState('arrow-forward');

  const [distanceX, setDistanceX] = useState(0);
  const [distanceY, setDistanceY] = useState(0);

  const [paddingX, setPaddingX] = useState(0);
  const [paddingY, setPaddingY] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    // definindo posição maxima do draggable de acordo com a imagem selecionada
    switch (shirtType) {
      case 'tshirt':
        shirtSide === 'front' ? setTShirtImage(tFront) : setTShirtImage(tBack);
        shirtSide === 'front' ? setModels(tFronts) : setModels(tBacks);
        shirtSide === 'front' ? setImage(frontImage) : setImage(backImage);
        shirtSide === 'front' //eslint-disable-line
          ? setPosition({
              minX: paddingX + ((22.5 * width) / 100), // prettier-ignore
              maxX: paddingX + ((64.4 * width) / 100), // prettier-ignore
              minY: paddingY + ((15.4 * height) / 100), // prettier-ignore
              maxY: paddingY + ((90.4 * height) / 100) // prettier-ignore
            })
          : setPosition({
              minX: paddingX + ((24.06 * width) / 100), // prettier-ignore
              maxX: paddingX + ((64.06 * width) / 100), // prettier-ignore
              minY: paddingY + ((15.4 * height) / 100), // prettier-ignore
              maxY: paddingY + ((90.4 * height) / 100) // prettier-ignore
            });

        break;
      case 'babylook':
        shirtSide === 'front' ? setTShirtImage(bFront) : setTShirtImage(bBack);
        shirtSide === 'front' ? setModels(bFronts) : setModels(bBacks);
        shirtSide === 'front' ? setImage(frontImage) : setImage(backImage);

        setPosition({
          minX: paddingX + ((25.31 * width) / 100), // prettier-ignore
          maxX: paddingX + ((62.18 * width) / 100), // prettier-ignore
          minY: paddingY + ((15.4 * height) / 100), // prettier-ignore
          maxY: paddingY + ((88.4 * height) / 100) // prettier-ignore
        });
        break;
      case 'hoodie':
        shirtSide === 'front' ? setTShirtImage(hFront) : setTShirtImage(hBack);
        shirtSide === 'front' ? setModels(hFronts) : setModels(hBacks);
        shirtSide === 'front' ? setImage(frontImage) : setImage(backImage);

        setPosition({
          minX: paddingX + ((23.43 * width) / 100), // prettier-ignore
          maxX: paddingX + ((62.18 * width) / 100), // prettier-ignore
          minY: paddingY + ((20.4 * height) / 100), // prettier-ignore
          maxY: paddingY + ((85.4 * height) / 100) // prettier-ignore
        });
        break;
      default:
    }
  }, [shirtType, selected, shirtSide, image, text, sticker, editMode]);

  useEffect(() => {
    // gambiarra pra renderizar o texto após mudar cor ou fonte
    setText(`${text} `);
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

  useEffect(() => {
    // mudando os icones quando entramos no modo de edição / normal
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

  useEffect(() => {
    switch (indexTutorial) {
      case -1:
        setPhoto(tutorial[0].uri); // apos fechar, reseta pro icone normal
        setVisible7(false); // fecha o modal
        setIndexTutorial(0); // apenas altera o index

        break;
      case 0: // primeiro elemento do tutorial. muda o icone e fecha o modal
        setPhoto(tutorial[indexTutorial].uri);
        setTutorialBackIcon('close');
        break;
      case 1: // a partir do primeiro elemento do tutorial, muda o icone pra seta
        setPhoto(tutorial[indexTutorial].uri);
        setTutorialBackIcon('arrow-back');
        break;
      case 9: // penultimo elemento. muda o icone caso o usuario vá pro done e volte
        setPhoto(tutorial[indexTutorial].uri);
        setTutorialNextIcon('arrow-forward');
        break;
      case 10:
        setPhoto(tutorial[indexTutorial].uri); // ultimo elemento. muda o icone para 'done' e fecha o modal
        setTutorialNextIcon('done');
        break;
      case 11:
        setPhoto(tutorial[0].uri); // apos fechar, reseta pro icone normal
        setVisible7(false); // fecha o modal
        setIndexTutorial(0); // apenas altera o index

        break;
      default:
        setPhoto(tutorial[indexTutorial].uri); // apenas altera a foto
        setIndexTutorial(indexTutorial); // apenas altera o index
    }
  }, [indexTutorial]);

  async function handleChange(photouri, idimg) {
    try {
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
        name: `${photouri}.jpeg`,
      });

      upload.append(`${otherSide}`, null);
      upload.append('front_printable_image_id', idimg);
      upload.append('back_printable_image_id', idimg);
      upload.append('text', text);
      upload.append('font_family', 'Oswald');

      await api.post('design-shirt/purchase', upload);

      setImage(baseImg.uri); // apaga a imagem - coloca imagem transparente
      setSticker(baseImg.uri); // apaga o sticker - coloca imagem transparente

      setText('');
      setEditMode(false);
      Toast.show('Sua camiseta foi enviada!');

      setVisible4(false); // fecha modal de 'enviando imagem'
    } catch (err) {
      Toast.show('Houve um erro no envio da imagem.');
    }
  }

  function onCapture(id) {
    captureRef(captureViewRef, {
      format: 'jpg',
      quality: 1,
    }).then(uri => {
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

    const { id } = response.data;

    onCapture(id);
    setEditMode(false);
  }

  function capturePrintable() {
    captureRef(imgRef, {
      format: 'png',
      quality: 1,
    }).then(uri => {
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
      if (response.didCancel) setEditMode(false);
      else if (response.error)
        Toast.show('Houve um erro ao selecionar a imagem. ');
      else {
        const source = { uri: `data:image/jpeg;base64,${response.data}` };

        if (shirtSide === 'front') {
          setFrontImage(source.uri);
        } else {
          setBackImage(source.uri);
        }

        setImage(source.uri);

        setSelected('imagem');
        setSize(120);
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
            Toast.show('A imagem foi salva na galeria.');
          })
          .catch(() => Toast.show('Erro ao salvar imagem.'));
      })
      .catch(() => Toast.show('Erro ao salvar imagem.'));
  }

  return (
    <>
      <Header navigation={navigation} title="Design" />

      <Container
        onLayout={({ nativeEvent: { layout } }) => {
          // console.tron.log(`width container: ${layout.width}`);
          // console.tron.log(`height container: ${layout.height}`);
          // console.tron.log(`x container: ${layout.x}`);
          // console.tron.log(`y container: ${layout.y}`);
          setDistanceX(layout.x);
          setDistanceY(layout.y);
        }}
      >
        <TShirtContainer
          onLayout={({ nativeEvent: { layout } }) => {
            console.tron.log(`width shirt container: ${layout.width}`);
            console.tron.log(`height shirt container: ${layout.height}`);
            console.tron.log(`x shirt container: ${layout.x}`);
            console.tron.log(`y shirt container: ${layout.y}`);
            setPaddingX(layout.x);
            setPaddingY(layout.y);
            // setWidth(layout.width);
            // setHeight(layout.height);
          }}
          ref={captureViewRef}
        >
          <TShirtImage
            onLayout={({ nativeEvent: { layout } }) => {
              console.tron.log(`width imagem: ${layout.width}`);
              console.tron.log(`height imagem: ${layout.height}`);
              console.tron.log(`x imagem: ${layout.x}`);
              console.tron.log(`y imagem: ${layout.y}`);
              setPaddingX(layout.x);
              setPaddingY(layout.y);
              setWidth(layout.width);
              setHeight(layout.height);
            }}
            source={{ uri: tShirtImage }}
            resizeMode="contain"
          />
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
            renderColor="darkgoldenrod"
            adaptive={value => setTextSize(value)}
            font={font}
            textSize={14 + finalSize / 4}
            onLongPress={() => setSelected('frase')}
            renderHeight={12}
            renderSize={textSize}
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
              setPhoto(tutorial[0].uri);
              setVisible7(true);
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
              backgroundColor: '#333',
              width: 250,
              height: 200,
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
                color: '#ddd',
                textAlign: 'center',
              }}
            >
              Informe o texto:{' '}
            </Text>
            <Input
              autoFocus
              value={text}
              onLayout={({ nativeEvent: { layout } }) => {
                setTextSize(layout.width);
                setFinalSize(0);
              }}
              onChangeText={setText}
              maxLength={13}
              returnKeyType="send"
              onSubmitEditing={() => {
                setText(text);

                setVisible3(false);
              }}
              underlineColorAndroid="transparent"
            />
            <Text
              style={{
                marginBottom: 5,
                fontSize: 14,
                color: '#ddd',
                textAlign: 'center',
              }}
            >
              Selecione a cor:{' '}
            </Text>
            <ScrollView
              contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
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
                <PickTextButtonText>Fechar</PickTextButtonText>
              </PickTextButton>
            </View>
          </View>
          <View
            style={{
              width: 270,
              height: 180,
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

      <CustomModal // tutorial
        visible={visible7}
        animationType="slide"
        transparent
        onRequestClose={() => setVisible7(false)}
      >
        <CustomView
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
          }}
        >
          <View
            style={{
              height: 420,
              width: 400,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              style={{ width: 380, height: 380 }}
              source={{ uri: photo }}
              resizeMode="contain"
            />
            <Text
              style={{
                // marginTop: -10,
                fontSize: 14,
                color: '#ddd',
                textAlign: 'center',
              }}
            >
              {`${indexTutorial + 1} de 12`}
            </Text>
            <ContainerActions>
              <Actions
                onPress={() => setIndexTutorial(indexTutorial - 1)}
                style={{ backgroundColor: '#038311' }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Icon name={tutorialBackIcon} size={30} color="#FFF" />
              </Actions>
              <Actions
                onPress={() => setIndexTutorial(indexTutorial + 1)}
                style={{ backgroundColor: '#038311' }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Icon name={tutorialNextIcon} size={30} color="#FFF" />
              </Actions>
            </ContainerActions>
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
          side={shirtSide}
        />
      </Modal>
    </>
  );
}
