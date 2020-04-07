import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Container, Text } from './styles';

export default function Button({ children, loading, ...rest }) {
  return (
    <Container {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color="#038841" />
      ) : (
        <Text>{children}</Text>
      )}
    </Container>
  );
}
