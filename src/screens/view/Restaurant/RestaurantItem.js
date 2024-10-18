import React from 'react';
import { CCard, CCardBody, CCardImage, CCardTitle, CCardText } from '@coreui/react';

const RestaurantItem = ({ name, location, image }) => {
  return (
    <CCard className="mb-4" style={{ maxWidth: '300px' }}>
      <CCardImage orientation="top" src={image} alt={name} style={{ height: '200px', objectFit: 'cover' }} />
      <CCardBody>
        <CCardTitle>{name}</CCardTitle>
        <CCardText>{location}</CCardText>
      </CCardBody>
    </CCard>
  );
};

export default RestaurantItem;
