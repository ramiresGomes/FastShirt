import React, { useRef, useState, useEffect } from 'react';
// import Draggable from 'react-native-draggable';
import CameraRoll from '@react-native-community/cameraroll';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { captureRef } from 'react-native-view-shot';

import ImagePicker from 'react-native-image-picker';

import { Image, Modal as CustomModal, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import ImageResizer from 'react-native-image-resizer';
import Draggable from './PickText/CustomDraggable';

import Header from '~/components/Header';
import Modal from '~/components/Modal';
import CustomList from '~/components/List';
import Carousel from '~/components/Carousel';
import FontPicker from '~/components/FontPicker';

import PickImage from './PickImage';
import PickText from './PickText';

import base from '~/assets/base.png';

import {
  Actions,
  ContainerActions,
  ESlider as Slider,
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

import api from '~/services/api';
import apt from '~/services/apt';

Icon.loadFont();

export default function Design({ navigation }) {
  const customT = useSelector((state) => state.shirts.tshirt);
  const customB = useSelector((state) => state.shirts.bshirt);
  const customH = useSelector((state) => state.shirts.hoodie);

  const tFronts = useSelector((state) => state.shirts.tFronts);
  const tBacks = useSelector((state) => state.shirts.tBacks);
  const bFronts = useSelector((state) => state.shirts.bFronts);
  const bBacks = useSelector((state) => state.shirts.bBacks);
  const hFronts = useSelector((state) => state.shirts.hFronts);
  const hBacks = useSelector((state) => state.shirts.hBacks);

  const boomt = useSelector((state) => state.shirts.boomt);

  const captureViewRef = useRef();
  const imgRef = useRef();
  const dispatch = useDispatch();

  const baseImg = resolveAssetSource(base);

  const [data, setData] = useState([]);
  const [models, setModels] = useState([]);
  const [text, setText] = useState('');
  const [font, setFont] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [size, setSize] = useState(120); // slider de size

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
    }

    loadImages();
    // muda pra 'A', ficando 'Authorization'
    apt.defaults.headers.authorization =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTg2OTcyNzU1LCJleHAiOjE1ODc1Nzc1NTV9.089AmZc6tMLSzkkJwisOS2j7f_7KIgSjG-xI9QGfG9U';
    // write "batata doce" on asyncstorage
    // resgata em outro componente -- redux pra que né?
    // se der certo com texto, tenta com um arquivo criado pelo RNFS ou RNFetchBlob
    // com o passo acima, tenta uma imagem. passe o URI no encoding
    // posso usar o mesmo container de buttons e colocar o 'limpar camiseta', 'salvar', 'avançar'
    console.tron.log(apt.defaults.headers.authorization);
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

  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [visible5, setVisible5] = useState(false);
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
    if (editMode) {
      setGalleryIcon('clear');
      setColorsIcon('delete');
      setEditIcon('done');
      setStickersIcon('archive');
      setTextIcon('straighten');
    } else {
      setGalleryIcon('collections');
      setColorsIcon('palette');
      setEditIcon('create');
      setStickersIcon('mood');
      setTextIcon('title');
    }
  }, [editMode]);

  async function handleChange(photouri) {
    const upload = new FormData();
    const picture = new FormData();
    console.tron.log('deve enviar');
    // upload.append('file', photo);
    console.tron.log(`photouri: ${photouri}`);
    console.tron.log(`image: ${photo}`);

    // usa o RNFS pra gerar uma imagem local usando essa uri

    upload.append('file', {
      uri: photouri, // here goes the uri
      type: 'image/jpeg', // trocar pra png
      name: 'finalprint.jpeg',
    });

    picture.append('file', {
      uri: photo, // here goes the uri
      type: 'image/png', // trocar pra png
      name: 'photo.png',
    });

    const response = await apt.post('files', upload); // envia pra api
    // const respons = await apt.post('files', picture); // envia pra api

    const { id, url } = response.data;
    console.tron.log(`id: ${id} e url: ${url}`);
    setImage(baseImg.uri);
    console.tron.log(response.data);
    console.tron.log(response.data);
    setEditMode(false);

    // setFile(id); -- id da imagem retornado pelo banco
    // setPreview(url); -- seria o setImage -- com a nova uri
  }

  async function smatch(photouri) {
    const upload = new FormData();

    upload.append('file', {
      uri: photouri, // here goes the uri
      type: 'image/png', // trocar pra png
      name: 'only_logo.png',
    });

    const response = await apt.post('files', upload); // envia pra api

    const { id, url } = response.data;
    console.tron.log('actual upload: ' + response.data);

    console.tron.log(`id img: ${id} e url img: ${url}`);

    setImage(baseImg.uri);
    setEditMode(false);
  }
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
        setImage(source.uri);
        setPhoto(source.uri);
        // setPhoto(response.data);
        setEditMode(true);
      }
    });
  }

  function onCapture(action) {
    captureRef(captureViewRef, {
      format: 'jpg',
      quality: 0.9,
    }).then((uri) => {
      console.tron.log(`action: ${action}`);
      handleChange(uri);
    });
  }

  function cap() {
    captureRef(imgRef, {
      format: 'png',
      quality: 0.9,
    }).then((uri) => {
      console.tron.log(`LOOOOOOOOOOOOOOOOOOOOOOOL`);
      smatch(uri);
    });
  }

  return (
    <>
      <Header navigation={navigation} title="Design" />

      <Container>
        <TShirtContainer ref={captureViewRef}>
          <TShirtImage source={{ uri: tShirtImage }} resizeMode="contain" />
          <Draggable
            ref={imgRef}
            disabled={!editMode}
            imageSource={{ uri: image }}
            renderSize={size}
            onDragRelease={(event, gestureState) =>
              console.tron.log(gestureState)
            }
            onLongPress={() => setEditMode(true)}
            x={position.minX}
            y={position.minY}
            minX={position.minX}
            maxX={position.maxX}
            minY={position.minY}
            maxY={position.maxY}
            onDrag={() => {}}
            onShortPressRelease={() => {}}
            onDragRelease={() => {}}
            onLongPress={() => {}}
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
            // setData(images);
            // setVisible(true);
            if (editMode) setEditMode(false);
            else handleChoosePhoto();
          }}
        >
          <Icon name={galleryIcon} size={40} color="#FFF" />

          <IconLabel>{editMode ? 'Cancelar' : 'Imagem'}</IconLabel>
        </BottomButton>

        <BottomButton
          onPress={() => {
            if (editMode) {
              console.tron.log('action camiseta branca');
              setImage(baseImg.uri);
              setEditMode(false);
            } else setVisible6(true);
          }}
        >
          <Icon name={colorsIcon} size={40} color="#FFF" />
          <IconLabel>{editMode ? 'Desfazer' : 'Cores'}</IconLabel>
        </BottomButton>

        <BottomButton
          onPress={() => {
            if (editMode) {
              onCapture('next');
              cap();
            } else {
              setEditMode(true);
            }
          }}
        >
          <Icon name={editIcon} size={40} color="#FFF" />

          <IconLabel>{editMode ? 'Avançar' : 'Editar'}</IconLabel>
        </BottomButton>
        <BottomButton
          onPress={() => {
            if (editMode) {
              onCapture('save');
            } else {
              setData(stickers);
              setVisible(true);
            }
          }}
        >
          <Icon name={stickersIcon} size={40} color="#FFF" />

          <IconLabel>{editMode ? 'Salvar' : 'Stickers'}</IconLabel>
        </BottomButton>

        <BottomButton
          onPress={() => {
            if (editMode) console.tron.log('show slider');
            else setVisible3(true);
          }}
        >
          <Icon name={textIcon} size={40} color="#FFF" />
          <IconLabel>{editMode ? 'Tamanho' : 'Textos'}</IconLabel>
        </BottomButton>
      </Bottom>
      <Modal
        visible={visible}
        disabled={true}
        onRequestClose={() => setVisible(false)}
      >
        <CustomList
          data={data}
          side={shirtSide}
          handle={(value) => {
            setImage(value);
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
          done={(value) => {
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
          example={text}
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
          done={(value) => {
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

// transformar em styled component
// usar o HSV picker pra pegar a cor
// adicionar o header com preço e etc
// aumentar modal e mudar cor de fundo, arrumar borda de cada imagem

// limitar o posicionamento, provalmente com o draggable com um max de 60% da tela, ou algo assim.
// ja atua nas bordas entao ao aumentar o texto, ainda se mantem
