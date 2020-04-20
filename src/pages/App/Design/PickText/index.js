import React, { useMemo, useRef, useState, useEffect } from 'react';
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
  const [color, setColor] = useState('#000');
  const [maxSize, setMaxSize] = useState(10);

  const constant = (7 * (text.length + 1)) / 10;

  const captureViewRef = useRef();

  function onDone(uri) {
    dispatch({
      type: `@shirts/update_${type}_${side}`,
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
          <Image source={{ uri: shirt }} style={{ height: 310 }} />
          <Draggable
            renderColor="steelblue"
            renderText={text}
            font={font}
            textColor={color}
            renderHeight={size / 1.016}
            textSize={size}
            renderSize={constant * size}
            x={120}
            y={30}
            minX={85}
            maxX={215}
            minY={50}
            maxY={290}
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
          maximumValue={maxSize}
          onValueChange={(value) => setSize(value)}
        />
      </View>
    </>
  );
}
