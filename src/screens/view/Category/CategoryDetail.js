import React from 'react';
import { useParams } from 'react-router-dom';
import categories from '../../../Data';
import { CCard, CCardBody, CCardTitle, CCardText, CRow, CCol, CCardImage } from '@coreui/react';

const CategoryDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const category = categories.find((cat) => cat.id === parseInt(id)); // Tìm danh mục theo ID

  if (!category) {
    return <p>Category not found!</p>;
  }

  return (
    <div className="container mt-4">
      <h2>{category.name} - Products</h2>
      <CRow>
        {category.products.map((product) => (
          <CCol md={4} key={product.id} className="mb-4">
            <CCard>
              <CCardImage orientation="top" src={product.image} alt={product.name} />
              <CCardBody>
                <CCardTitle>{product.name}</CCardTitle>
                <CCardText>{product.description}</CCardText>

                {/* Hiển thị các kích thước (sizes) nếu có */}
                {product.size && (
                  <p><strong>Sizes available:</strong> {product.size.join(', ')}</p>
                )}
                
                {/* Hiển thị giá (price) nếu có */}
                {product.price && (
                  <p><strong>Prices:</strong> {product.price.map((p, index) => (
                    <span key={index}>
                      ${p.toFixed(2)} {product.size[index]}{index < product.price.length - 1 ? ', ' : ''}
                    </span>
                  ))}</p>
                )}
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </div>
  );
};

export default CategoryDetail;
