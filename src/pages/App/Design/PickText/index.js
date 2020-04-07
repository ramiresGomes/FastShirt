import React, { useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import Draggable from 'react-native-draggable';

import { captureRef } from 'react-native-view-shot';

import { View, Image } from 'react-native';

import { Actions, ContainerActions, ESlider as Slider } from './styles';

Icon.loadFont();

export default function PickText({ text, shirt, type, side, done }) {
  const dispatch = useDispatch();

  const [size, setSize] = useState(12); // slider de size

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

  return (
    <>
      <View style={{ flex: 1 }}>
        <View ref={captureViewRef} style={{ backgroundColor: '#f2f2f2' }}>
          <Image source={{ uri: shirt }} style={{ height: 380 }} />
          <Draggable
            renderText={text}
            textColor="#f0f"
            textSize={size}
            renderSize={size * 16}
            x={0}
            y={0}
          />
        </View>
        <ContainerActions>
          <Actions
            onPress={() => onCapture()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="done" size={25} color="#FFF" />
          </Actions>
        </ContainerActions>
        <Slider
          value={size}
          minimumValue={10}
          maximumValue={30}
          onValueChange={(value) => setSize(value)}
        />
      </View>
    </>
  );
}
