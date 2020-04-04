import React, { useMemo, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import Draggable from 'react-native-draggable';
import CameraRoll from '@react-native-community/cameraroll';
import Toast from 'react-native-tiny-toast';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import { captureRef } from 'react-native-view-shot';

import { Alert, View, Image, StatusBar } from 'react-native';
import { updateShirt } from '~/store/modules/user/actions';

import { Actions, ContainerActions, ESlider as Slider } from './styles';

Icon.loadFont();

export default function PickImage({ done }) {
  const image = useSelector((state) => state.user.preview);
  const shirt = useSelector((state) => state.user.shirtType);
  const dispatch = useDispatch();

  // const source = { uri: `data:image/jpeg;base64,${response.data}` };

  const [size, setSize] = useState(200);

  const captureViewRef = useRef();
  // gera o URI e converte pra base64 antes de salvar no reducer

  function shirtDone(uritemp) {
    const source = { uri: `data:image/jpeg;base64,${uritemp}` };
    console.tron.log(`prev> ${source.uri}`);

    dispatch(updateShirt(source, shirt));
    done();
  }

  function onDone(uri, action) {
    if (action === 'save') {
      Promise.all([
        CameraRoll.saveToCameraRoll(uri, 'photo')
          .then((success) => {
            Toast.show('Aviso', 'A imagem foi salva na galeria.');
          })
          .catch((err) => {
            Toast.show('Hmm', 'Ocorreu um erro ao salvar o modelo.');
          }),
      ]);
    } else {
      console.tron.log('love');

      shirtDone(uri);
      console.tron.log(`sepa voltou pra inicial, essa eh a camisa: ${uri}`);
    }
  }

  function onCapture(action) {
    captureRef(captureViewRef, {
      format: 'jpg',
      quality: 0.9,
    }).then((uri) => {
      onDone(uri, action);
      console.tron.log(`pow vei: ${uri}`);
    });
  }

  // a camiseta puxada cai como background image
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#e6b32a" />

      <View style={{ flex: 1 }}>
        <View ref={captureViewRef} style={{ backgroundColor: '#fff' }}>
          <Image source={{ uri: shirt.uri }} style={{ height: 380 }} />
          <Draggable
            imageSource={image}
            renderSize={size}
            x={0}
            y={0}
            onDragRelease={() => console.tron.log('end of movement')}
            onLongPress={() => console.tron.log('long press')}
            onShortPressRelease={() => console.tron.log('end - short press')}
            onLongPressRelease={() => console.tron.log('end - long press')}
            onPressIn={() => console.tron.log('in press')}
            onPressOut={() => console.tron.log('out press')}
          />
        </View>
        <ContainerActions>
          <Actions
            onPress={() => onCapture('save')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="archive" size={25} color="#FFF" />
          </Actions>
          <Actions
            onPress={() => onCapture('next')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="done" size={25} color="#FFF" />
          </Actions>
        </ContainerActions>
        <Slider
          value={size}
          minimumValue={80}
          maximumValue={160}
          onValueChange={(value) => setSize(value)}
        />
      </View>
    </>
  );
}
