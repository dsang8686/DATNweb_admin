// src/screens/AddCategory.js

import React, { useState } from 'react';
import { CButton, CForm, CFormInput, CFormTextarea } from '@coreui/react';
import { useNavigate } from 'react-router-dom';

const AddCategory = ({ onAddCategory }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = {
      id: Date.now(), // Sử dụng thời gian hiện tại làm ID duy nhất
      name,
      description,
      image,
      products: []
    };

    onAddCategory(newCategory); // Gọi hàm thêm danh mục
    navigate('/category'); // Quay lại trang chính sau khi thêm
  };

  return (
    <div className="container mt-3">
      <h2>Add Category</h2>
      <CButton onClick={() => navigate('/category')} color="primary" className="mt-2">Danh sách</CButton>

      <CForm onSubmit={handleSubmit}>
        <CFormInput
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className='my-4'
        />
        <CFormTextarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='my-4'
          required
        />
        <CFormInput
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className='my-4'
          required
        />
        <CButton type="submit" color="primary" className="mt-2">Add Category</CButton>
      </CForm>
    </div>
  );
};

export default AddCategory;
