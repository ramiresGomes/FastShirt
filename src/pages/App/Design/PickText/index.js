import React, { useMemo, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';

import { captureRef } from 'react-native-view-shot';

import { View, Image } from 'react-native';
import Draggable from './CustomDraggable';

import { Actions, ContainerActions, ESlider as Slider } from './styles';

Icon.loadFont();

export default function PickText({ font, text, shirt, type, side, done }) {
  const dispatch = useDispatch();

  const [size, setSize] = useState(10); // slider de size
  const [color, setColor] = useState('#000'); // slider de size

  const constant = (5.2 * (text.length + 1)) / 10;

  const captureViewRef = useRef();

  function onDone(uri) {
    dispatch({
      type: `@user/update_${type}_${side}`,
      payload: { uri },
    });
    done();
  }

  function onCapture() {
    captureRef(captureViewRef, {
      format: 'jpg',
      quality: 0.9,
    }).then((uri) => {
      onDone(uri);
    });
  }

  console.tron.log(`size: ${size}`);
  console.tron.log(`constant: ${constant}`);
  return (
    <>
      <View style={{ flex: 1 }}>
        <View ref={captureViewRef} style={{ backgroundColor: '#f2f2f2' }}>
          <Image source={{ uri: shirt }} style={{ height: 380 }} />
          <Draggable
            renderText={text}
            font={font}
            textColor={color}
            renderHeight={size}
            textSize={size}
            renderSize={constant * size}
            x={120}
            y={30}
            minX={74}
            maxX={234}
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
            style={{
              backgroundColor: '#999',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="archive" size={25} color="#FFF" />
          </Actions>
        </ContainerActions>
        <Slider
          value={size}
          minimumValue={10}
          maximumValue={21}
          onValueChange={(value) => setSize(value)}
        />
      </View>
    </>
  );
}
