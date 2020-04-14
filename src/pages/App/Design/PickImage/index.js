import React, { useEffect, useRef, useState } from 'react';
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

  const [size, setSize] = useState(115); // slider de size

  const [position, setPosition] = useState({
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0,
  });

  // tshirt = 120

  useEffect(() => {
    switch (type) {
      case 'tshirt': {
        side === 'front'
          ? setPosition({ minX: 85, maxX: 215, minY: 50, maxY: 290 })
          : setPosition({ minX: 88, maxX: 217, minY: 35, maxY: 285 });
        break;
      }
      case 'babylook': {
        setPosition({ minX: 90, maxX: 213, minY: 35, maxY: 281 });
        break;
      }
      case 'hoodie': {
        setPosition({ minX: 89, maxX: 205, minY: 75, maxY: 270 });
        break;
      }
      default:
    }
  }, []); // eslint-disable-line

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
            style={{ height: 310, borderRadius: 8 }}
          />
          <Draggable
            imageSource={image}
            renderSize={size}
            onDragRelease={(event, gestureState) =>
              console.tron.log(gestureState)
            }
            x={150}
            y={150}
            minX={position.minX}
            maxX={position.maxX}
            minY={position.minY}
            maxY={position.maxY}
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
          maximumValue={120}
          onValueChange={(value) => setSize(value)}
        />
      </View>
    </>
  );
}
