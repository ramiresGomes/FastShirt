import React, { forwardRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, TInput } from './styles';

function AuthInput({ style, icon, ...rest }, ref) {
  return (
    <Container style={style}>
      {icon && <Icon name={icon} size={20} color="#9f9f9f" />}
      <TInput {...rest} ref={ref} />
    </Container>
  );
}

export default forwardRef(AuthInput);
