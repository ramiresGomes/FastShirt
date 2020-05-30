import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { captureRef } from 'react-native-view-shot'; // tirar um screenshot
import ImagePicker from 'react-native-image-picker'; // puxar imagem da galeria ou tirar foto
import Toast from 'react-native-tiny-toast'; // toast de notificação após o envio da camisa, ou caso de erro

import {
  Modal as RNModal,
  Text,
  ActivityIndicator, // loading no momento do envio
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'; // pega imagem e cria uma URI (caminho local da imagem)

import ImageIcon from '~/assets/ico-image.svg';
import ColorIcon from '~/assets/ico-colors.svg';
import StickerIcon from '~/assets/ico-stickers.svg';
import TextIcon from '~/assets/ico-text.svg';

import MinusIcon from '~/assets/ico-minus.svg';
import MoreIcon from '~/assets/ico-more.svg';
import TrashIcon from '~/assets/ico-trash.svg';
import ConfirmationIcon from '~/assets/ico-confirm.svg';

import Header from '~/components/Header';
import Modal from '~/components/Modal';
import ColorModal from '~/components/ColorModal';
import CustomList from '~/components/List';
import FontPicker from '~/components/FontPicker';

import Draggable from './PickText/CustomDraggable';
import base from '~/assets/base.png';

import {
  Container,
  Bottom,
  BottomButton,
  TShirtContainer,
  TShirtImage,
  TopButtonsContainer,
  ActionButton,
  ActionButtonText,
  AddToCart,
  AddToCartText,
  CannotSendAlert,
  Input,
  CustomView,
  NoSlider,
  ContainerActions,
  Color,
  UploadShirtLoading,
  FontList,
  ColorsContainer,
  Separator,
  ChooseColorText,
  FontMenu,
  TypeInText,
} from './styles';

import api from '~/services/api';

Icon.loadFont();

export default function Design({ navigation }) {
  const customT = useSelector(state => state.shirts.tshirt); // puxa camisetas do redux
  const customB = useSelector(state => state.shirts.bshirt); // puxa camisetas babylook do redux
  const customH = useSelector(state => state.shirts.hoodie);

  const tFronts = useSelector(state => state.shirts.tFronts); // puxa array de camisetas do redux
  const bFronts = useSelector(state => state.shirts.bFronts);
  const hFronts = useSelector(state => state.shirts.hFronts);

  const captureViewRef = useRef(); // ref para capturar a view (container) e a imagem
  const imgRef = useRef(); // ref repassada ao draggable com 'forwardRef'

  const baseImg = resolveAssetSource(base); // imagem transparente para inicializar

  const [models, setModels] = useState([]); // array com as cores de camisetas

  const [text, setText] = useState(''); // estado pra salvar o texto da camiseta

  const [font, setFont] = useState(''); // guardar a fonte

  const [finalSize, setFinalSize] = useState(0); // valor unitário pra somar à fonte.
  const [textHeight, setTextHeight] = useState(0); // altura do texto após o render

  const [selected, setSelected] = useState('none'); // alterna aquela borda vermelha de seleção entre imagem/sticker
  const [color, setColor] = useState('#fff'); // cor do texto

  const [size, setSize] = useState(0.1); // tamanho da imagem. começa pequeno pro usuário não clicar e selecionar
  const [sizeSticker, setSizeSticker] = useState(0.1); // tamanho do sticker
  const [textSize, setTextSize] = useState(10); // tamanho do texto

  const [position, setPosition] = useState({
    // posição máxima e mínima da imagem ou do sticker
    minX: 300,
    maxX: 900,
    minY: 10,
    maxY: 900,
  });

  const [images, setImages] = useState([]); // array de imagens puxados da api
  const [stickers, setStickers] = useState([]); // array de stickers que também puxa da api

  const [shirtType, setShirtType] = useState('tshirt');

  const [tFront, setTFront] = useState(customT.front); // caḿpo para salvar a camiseta t-hirt
  const [bFront, setBFront] = useState(customB.front); // campo para salvar a camiseta babylook
  const [hFront, setHFront] = useState(customH.front); // campo para salvar o moletom

  const [tShirtImage, setTShirtImage] = useState(tFront); // imagem da camisa que aparece, começa mostrando a tshirt na tela
  const [image, setImage] = useState(baseImg.uri); // imagem transparente para botar no lugar da imagem, pra 'apagar' a imagem

  const [sticker, setSticker] = useState(baseImg.uri); // sticker baixado que está exibido na tela

  const [topLimitReached, setTopLimitReached] = useState(false);
  const [downLimitReached, setDownLimitReached] = useState(false);

  useEffect(() => {
    async function loadImages() {
      const [imgs, stk] = await Promise.all([
        api.get('design-shirt/image'), // puxar da rota de imagens
        api.get('design-shirt/sticker'), // puxa da rota de stickers
      ]);

      setImages(imgs.data); // salva o que recebe da api, no estado
      setStickers(stk.data);
    }

    loadImages();
  }, []);

  useEffect(() => {
    if (selected === 'imagem' && size > 130) {
      setTopLimitReached(true);
    } else if (selected === 'figura' && sizeSticker > 130) {
      setTopLimitReached(true);
    } else {
      setTopLimitReached(false);
    }
  }, [selected, size, sizeSticker]);

  useEffect(() => {
    switch (selected) {
      case 'imagem':
        if (size > 130) setTopLimitReached(true);
        else setTopLimitReached(false);
        break;
      case 'figura':
        if (sizeSticker > 130) setTopLimitReached(true);
        else setTopLimitReached(false);
        break;
      case 'frase':
        if (finalSize > 55) setTopLimitReached(true);
        else setTopLimitReached(false);
        break;
      default:
    }
  }, [selected, size, sizeSticker, finalSize]);

  useEffect(() => {
    switch (selected) {
      case 'imagem':
        if (size < 50) setDownLimitReached(true);
        else setDownLimitReached(false);
        break;
      case 'figura':
        if (sizeSticker < 50) setDownLimitReached(true);
        else setDownLimitReached(false);
        break;
      case 'frase':
        if (finalSize < 2) setDownLimitReached(true);
        else setDownLimitReached(false);
        break;
      default:
    }
  }, [selected, size, sizeSticker, finalSize]);

  useEffect(() => {
    // sempre que altera a camiseta no estado do redux, reflete aqui
    setTFront(customT.front);
  }, [customT]);

  useEffect(() => {
    setBFront(customB.front);
  }, [customB]);

  useEffect(() => {
    setHFront(customH.front);
  }, [customH]);

  // modais
  const [visibleStickerModal, setStickerModalVisible] = useState(false);
  const [visibleTextModal, setTextModalVisible] = useState(false);
  const [visibleUploadingModal, setUploadingModalVisible] = useState(false);
  const [visibleModalColor, setVisibleModalColor] = useState(false);

  const [zindexImg, setZindexImg] = useState(0); // alterna a sobreposição de imagem e figura, quem fica por cima
  const [zindexSticker, setZindexSticker] = useState(1); // zindex do sticker

  const [distanceX, setDistanceX] = useState(0);
  const [distanceY, setDistanceY] = useState(55); // variavel que calcula o tamanho da tela pra definir o limite minimo superior

  const [paddingX, setPaddingX] = useState(0);
  const [paddingY, setPaddingY] = useState(20);

  const [internalX, setInternalX] = useState(0);
  const [internalY, setInternalY] = useState(0); // limitar tamanho que o usuario pode movimentar a imagem

  const [width, setWidth] = useState(0); // largura do container de camiseta
  const [height, setHeight] = useState(0); // altura do container de camiseta

  const [canSend, setCanSend] = useState(false); // boolean que só permite enviar a camisa após ela aparecer na tela, em caso de lag

  useEffect(() => {
    // definindo posição maxima do draggable de acordo com a imagem selecionada
    switch (shirtType) {
      case 'tshirt':
        setTShirtImage(tFront);
        setModels(tFronts);
        setPosition({
          // calcula os limite da tela
          minX: distanceX + internalX,
          maxX: distanceX + paddingX + internalX + width,
          minY: /* distanceY + */ 10 /* + internalY */,
          maxY: /* distanceY + */ paddingY + internalY + height,
        });
        break;

      case 'babylook':
        setTShirtImage(bFront);
        setModels(bFronts);
        setPosition({
          minX: distanceX + internalX,
          maxX: distanceX + paddingX + internalX + width,
          minY: /* distanceY + */ 10 /* + internalY */,
          maxY: /* distanceY + */ paddingY + internalY + height,
        });
        break;

      case 'hoodie':
        setTShirtImage(hFront);
        setModels(hFronts);
        setPosition({
          minX: distanceX + internalX,
          maxX: distanceX + paddingX + internalX + width,
          minY: /* distanceY + */ 10 /* + internalY */,
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
    // pra atualizar o texto, muda o tamanho do texto pra forçar o render (refresh)
    if (selected === 'none' || selected === 'frase') {
      setFinalSize(finalSize + 0.01);
    }
  }, [selected]); //eslint-disable-line

  useEffect(() => {
    // pra atualizar a fonte ou a cor, muda o tamanho do texto pra forçar o render
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

  async function uploadShirt(id, uri) {
    // envio da camiseta pra api
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
      upload.append('front_printable_image_id', id);
      upload.append('back_printable_image_id', id);

      await api.post('design-shirt/purchase', upload); // envia pra api

      setImage(baseImg.uri); // apaga a imagem - coloca imagem transparente
      setSticker(baseImg.uri); // apaga o sticker - coloca imagem transparente

      setText(''); // apaga o texto
      Toast.show('Sua camiseta foi enviada!');

      setUploadingModalVisible(false); // fecha modal de 'enviando imagem'
    } catch (err) {
      setUploadingModalVisible(false); // fecha modal de 'enviando imagem'

      Toast.show('Houve um erro no envio da imagem.'); // toast pra erro no envio
    }
  }

  async function captureShirt(id) {
    try {
      const uri = await captureRef(captureViewRef, {
        // tirar o print da camiseta
        format: 'png',
        quality: 1,
      });

      await uploadShirt(id, uri);
    } catch (err) {
      Toast.show('Erro na captura da camiseta');
    }
  }

  async function uploadPrintable(photouri) {
    try {
      const upload = new FormData();

      upload.append('name', `${photouri}.jpeg`);
      upload.append('image', {
        uri: photouri,
        type: 'image/jpeg',
        name: `${photouri}.jpeg`,
      });

      const { id } = await api.post('design-shirt/printables/sticker', upload); // envia pra api

      await captureShirt(id); // tira print da camiseta
    } catch (err) {
      Toast.show('Erro no envio da imagem'); // printe o err.status
    }
  }

  async function capturePic() {
    try {
      if (image === baseImg.uri) {
        await captureShirt(33); // caso nao tenha adicionado imagem, printa com o sticker.
        // passa esse id pro campo 'id' do upload não ficar em branco
      } else {
        const uri = await captureRef(imgRef, {
          // captura a imagem que o usuário acrescentou da galeria
          format: 'png',
          quality: 1,
        });

        await uploadPrintable(uri);
      }
    } catch (err) {
      Toast.show('Verifique sua conexão à internet.');
      setUploadingModalVisible(false);
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
      if (response.error) Toast.show('Houve um erro ao selecionar a imagem. ');
      else {
        const source = { uri: `data:image/jpeg;base64,${response.data}` };

        setImage(source.uri); // salva a imagem selecionada

        setSelected('imagem'); // selecionar a imagem e aparecer a borda vermelha
        setSize(80);
      }
    });
  }

  function changeSize(operation) {
    switch (selected) {
      case 'imagem':
        if (operation === 'add') setSize(size + 4);
        else setSize(size - 4);
        break;
      case 'figura':
        if (operation === 'add') setSizeSticker(sizeSticker + 4);
        else setSizeSticker(sizeSticker - 4);
        break;
      case 'frase':
        if (operation === 'add') setFinalSize(finalSize + 2);
        else setFinalSize(finalSize - 2);
        break;
      default:
    }
  }

  function clearElement() {
    switch (selected) {
      case 'imagem':
        if (canSend) {
          setImage(baseImg.uri);
        }
        setSelected('none');
        break;
      case 'figura':
        setSticker(baseImg.uri); // imagem transparente
        setSizeSticker(0.1);
        setSelected('none');
        break;
      case 'frase':
        setText('');
        setSelected('none');
        break;
      default:
    }
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
            style={{ height: Dimensions.get('window').height - 174 }}
            source={{ uri: tShirtImage }}
            resizeMode="contain"
          />
          {image !== baseImg.uri && ( // foto da camiseta, puxada da galeria
            <Draggable
              ref={imgRef}
              selected={image !== baseImg.uri && selected === 'imagem'} // aqui sepa
              imageSource={{ uri: image }}
              renderSize={size}
              onLongPress={() => {}}
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
              onDragRelease={() => {}}
              onPressIn={() => setSelected('imagem')} // seleciona a imagem ao clicar em cima
              onPressOut={() => {}}
              onRelease={() => {}}
            />
          )}
          {sticker !== baseImg.uri && ( // puxa a figura da galeria de stickers
            <Draggable
              selected={selected === 'figura'}
              imageSource={{ uri: sticker }}
              renderSize={sizeSticker}
              onLongPress={() => {}}
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
              onDragRelease={() => {}}
              onPressIn={() => {
                // seleciona a figura ao clicar em cima
                setSelected('figura');
              }}
              onPressOut={() => {}}
              onRelease={() => {}}
            />
          )}
          <Draggable // draggable de texto
            renderText={text}
            adaptive={value => setTextSize(value)}
            adaptiveHeight={value => setTextHeight(value)}
            font={font}
            selected={selected === 'frase'} // aqui sepa
            textSize={20 + finalSize / 4}
            onLongPress={() => {}}
            renderHeight={textHeight}
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
            onDragRelease={() => {}}
            onPressIn={() => {
              // quando clicar no texto, ele é selecionado
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
          {selected !== 'none' && (
            <>
              <ContainerActions>
                <TouchableOpacity
                  disabled={downLimitReached}
                  onPress={() => changeSize('subtract')}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <MinusIcon width={35} height={35} />
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={topLimitReached}
                  onPress={() => changeSize('add')}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <MoreIcon width={35} height={35} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => clearElement()}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <TrashIcon width={35} height={35} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSelected('none')}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <ConfirmationIcon width={35} height={35} />
                </TouchableOpacity>
              </ContainerActions>
            </>
          )}

          {selected === 'none' && (
            <>
              {canSend ? (
                <AddToCart
                  onPress={() => {
                    if (canSend) {
                      setUploadingModalVisible(true); // abre o modal de 'enviando camiseta...aguarde
                      capturePic(); // função que tira o print da camiseta
                    } else {
                      Toast.show('Edite alguma camiseta antes de enviar.');
                    }
                  }}
                >
                  <AddToCartText>Escolher Tamanho</AddToCartText>
                </AddToCart>
              ) : (
                <CannotSendAlert>Edite para continuar</CannotSendAlert>
              )}
            </>
          )}
        </NoSlider>
        {/** adicionar lixeira pra apagar o elemento */}
      </Container>

      <Bottom>
        <BottomButton onPress={() => handleChoosePhoto()}>
          {/** função de puxar imagem da galeria */}
          <ImageIcon height={40} width={40} />
        </BottomButton>

        <BottomButton onPress={() => setVisibleModalColor(true)}>
          <ColorIcon height={40} width={40} />
        </BottomButton>

        <BottomButton onPress={() => setStickerModalVisible(true)}>
          <StickerIcon height={40} width={40} />
        </BottomButton>

        <BottomButton onPress={() => setTextModalVisible(true)}>
          <TextIcon height={40} width={40} />
        </BottomButton>
      </Bottom>

      <Modal // modal da galeria dos stickers
        visible={visibleStickerModal}
        disabled={true}
        onRequestClose={() => {
          setStickerModalVisible(false);
        }}
      >
        <CustomList // galeria de stickers
          images={images} // estampas
          stickers={stickers} // stickers
          side="front"
          handle={value => {
            setSticker(value);
            setSelected('figura');
            setSizeSticker(80);
          }}
          close={() => setStickerModalVisible(false)}
          done={() => {
            setStickerModalVisible(false);
          }}
        />
      </Modal>

      <RNModal // selecionar texto
        visible={visibleTextModal}
        animationType="slide"
        transparent
        onRequestClose={() => setTextModalVisible(false)}
      >
        <CustomView style={{ alignItems: 'center', justifyContent: 'center' }}>
          <FontMenu>
            <TypeInText>Informe o texto abaixo:</TypeInText>
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
                setTextModalVisible(false);
              }}
              underlineColorAndroid="transparent"
            />
            <Separator />
            <ChooseColorText>Selecione a cor do texto:</ChooseColorText>
            <Separator />
            <ColorsContainer>
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
            </ColorsContainer>

            <FontList>
              <FontPicker // lista de fontes
                example="A frase fica assim"
                setFont={value => setFont(value)}
                done={() => setTextModalVisible(false)}
              />
            </FontList>
          </FontMenu>
        </CustomView>
      </RNModal>

      <RNModal // modal de envio da camiseta aparece escrito 'enviando...aguarde'
        visible={visibleUploadingModal}
        animationType="slide"
        transparent
        onRequestClose={() => setUploadingModalVisible(false)}
      >
        <CustomView>
          <UploadShirtLoading>
            <Text style={{ fontSize: 12, color: '#fff', textAlign: 'center' }}>
              Enviando a camiseta, aguarde...
            </Text>
            <ActivityIndicator size="large" color="#fff" />
          </UploadShirtLoading>
        </CustomView>
      </RNModal>

      <ColorModal // modal de selecionar cores da camiseta
        visible={visibleModalColor}
        onCancelPress={() => setVisibleModalColor(false)}
        listData={models}
        listDone={value => {
          setTShirtImage(value);
          setVisibleModalColor(false);
        }}
      />
    </>
  );
}
