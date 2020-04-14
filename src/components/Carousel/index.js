import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, Image, View, TouchableOpacity } from 'react-native';

import Carousel from 'react-native-snap-carousel';

export default function ImageCarousel({ data, done }) {
  // baseado no type filtra os indices do array, extrai usando o slice ou sla oq
  const dispatch = useDispatch();

  const tFronts = useSelector((state) => state.shirts.tFronts);
  const tBacks = useSelector((state) => state.shirts.tBacks);
  const bFronts = useSelector((state) => state.shirts.bFronts);
  const bBacks = useSelector((state) => state.shirts.bBacks);
  const hFronts = useSelector((state) => state.shirts.hFronts);
  const hBacks = useSelector((state) => state.shirts.hBacks);

  // array1[index]
  // array2[index]
  // array3[index]
  // [...]
  // array6[index]
  // -- todos terão a mesma cor
  // deve capturar os uri, e disparar uma action que recebe esse array de uri
  // customizar as actions. nao eh mais necessario atualizar cor apenas para um type e side de cada vez
  // o reducer deve guardar as posicoes x e y de cada camiseta, assim como o uri
  // entao, deve ser efetuado de imediato. atualiza a cor, mapeia o sticker em cima e renderiza a imagem
  // para isso, talvez eu possa renderizar um modal em cima. só pra ter o componente view, onde a imagem eh criada.
  // OU ENTAO, muda o componente image pra ter esse image (sticker) como conteudo.
  // assim, ja permite o longPress (?????)

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
        keyExtractor={(item) => String(item.uri)}
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
                  tb: tBacks[index].uri,
                  bf: bFronts[index].uri,
                  bb: bBacks[index].uri,
                  hf: hFronts[index].uri,
                  hb: hBacks[index].uri,
                },
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
