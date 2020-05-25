import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, Image, View, TouchableOpacity } from 'react-native';

import Carousel from 'react-native-snap-carousel';

export default function ImageCarousel({ data, done }) {
  // baseado no type filtra os indices do array, extrai usando o slice ou sla oq
  const dispatch = useDispatch();

  const tFronts = useSelector(state => state.shirts.tFronts);
  const tBacks = useSelector(state => state.shirts.tBacks);
  const bFronts = useSelector(state => state.shirts.bFronts);
  const bBacks = useSelector(state => state.shirts.bBacks);
  const hFronts = useSelector(state => state.shirts.hFronts);
  const hBacks = useSelector(state => state.shirts.hBacks);

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
      <Text style={{ alignSelf: 'center', fontSize: 16, color: '#ddd' }}>
        Deslize para selecionar a cor:
      </Text>
      <Carousel
        layout="default"
        keyExtractor={item => String(item.uri)}
        data={data}
        sliderWidth={325}
        itemWidth={275}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              dispatch({
                type: `@shirts/update_color`,
                payload: {
                  tf: tFronts[index].uri,
                  // tb: tBacks[index].uri,
                  bf: bFronts[index].uri,
                  // bb: bBacks[index].uri,
                  hf: hFronts[index].uri,
                  // hb: hBacks[index].uri,
                },
              });
              done(item.uri);
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
