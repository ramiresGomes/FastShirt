import React from 'react';
import { Modal as RNModal } from 'react-native';
import PropTypes from 'prop-types';

import { Container, Content } from './styles';

export default function Modal({ visible, children, onRequestClose }) {
  return (
    <RNModal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onRequestClose}
    >
      <Container>
        <Content>{children}</Content>
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
};
