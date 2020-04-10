import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Text,
  Image,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import Carousel from 'react-native-snap-carousel';

export default function ImageCarousel({ data, type, side, done }) {
  // baseado no type filtra os indices do array, extrai usando o slice ou sla oq
  const dispatch = useDispatch();

  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#333',
        borderRadius: 5,
        width: 325,
        height: 400,
      }}
    >
      <Carousel
        layout="default"
        keyExtractor={(item) => String(item.uri)}
        data={data}
        sliderWidth={325}
        itemWidth={275}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              dispatch({
                type: `@user/update_${type}_${side}`,
                payload: { uri: item.uri },
              });
              done();
            }}
            style={{ width: 265, height: 280 }}
          >
            <Image
              source={{ uri: item.uri }}
              style={{
                borderRadius: 5,
                height: 450,
                width: 270,
                marginLeft: 5,
                marginRight: 5,
                alignSelf: 'center',
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
