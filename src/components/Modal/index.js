import React from 'react';
import { Modal as RNModal } from 'react-native';
import PropTypes from 'prop-types';

import { CancelButton, Container, Content } from './styles';
import { Text } from '../Button/styles';

export default function Modal({
  visible,
  children,
  onRequestClose,
  disabled,
  disabledContent,
}) {
  return (
    <RNModal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onRequestClose}
    >
      <Container>
        <Content disabled={disabledContent}>
          {children}
          <CancelButton onPress={onRequestClose} disabled={disabled}>
            <Text style={{ fontSize: 18, color: '#fff' }}>Cancelar</Text>
          </CancelButton>
        </Content>
      </Container>
    </RNModal>
  );
}

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  onRequestClose: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  disabledContent: PropTypes.bool,
};

Modal.defaultProps = {
  disabled: false,
  disabledContent: false,
};
