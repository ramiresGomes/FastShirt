import React, { useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import Draggable from 'react-native-draggable';
import CameraRoll from '@react-native-community/cameraroll';
import Toast from 'react-native-tiny-toast';

import { captureRef } from 'react-native-view-shot';

import { View, Image } from 'react-native';

import { Actions, ContainerActions, ESlider as Slider } from './styles';

Icon.loadFont();

export default function PickImage({ image, shirt, type, side, done }) {
  const dispatch = useDispatch();

  const [size, setSize] = useState(130); // slider de size

  const captureViewRef = useRef();

  function onDone(uri, action) {
    if (action === 'save') {
      Promise.all([
        CameraRoll.saveToCameraRoll(uri, 'photo')
          .then((success) => {
            Toast.show('A imagem foi salva na galeria.');
          })
          .catch((err) => {
            Toast.show('Ocorreu um erro ao salvar o modelo.');
          }),
      ]);
    } else {
      dispatch({
        type: `@shirts/update_${type}_${side}`,
        payload: { uri },
      });
      done();
    }
  }

  function onCapture(action) {
    captureRef(captureViewRef, {
      format: 'jpg',
      quality: 0.9,
    }).then((uri) => {
      onDone(uri, action);
    });
  }

  return (
    <>
      <View style={{ flex: 1 }}>
        <View ref={captureViewRef} style={{ backgroundColor: '#f2f2f2' }}>
          <Image
            source={{ uri: shirt }}
            style={{ height: 420, borderRadius: 8 }}
          />
          <Draggable
            imageSource={image}
            renderSize={size}
            x={100}
            y={100}
            minX={70}
            maxX={230}
            minY={60}
            maxY={320}
          />
        </View>
        <ContainerActions>
          <Actions
            onPress={done}
            style={{ backgroundColor: '#d10000' }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="close" size={30} color="#FFF" />
          </Actions>
          <Actions
            onPress={() => onCapture('next')}
            style={{ backgroundColor: '#038311' }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="done" size={30} color="#FFF" />
          </Actions>
          <Actions
            onPress={() => onCapture('save')}
            style={{ backgroundColor: '#999' }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="archive" size={25} color="#FFF" />
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
