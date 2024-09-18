import React from "react";
import Menu from "../Menu/Menu";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CContainer, CForm, CFormInput, CFormSelect, CButton, CCol, CRow } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css'; // Import CoreUI CSS

// Validation Schema using Yup
const validationSchema = Yup.object({
  nameSanpham: Yup.string().required("Tên sản phẩm là bắt buộc"),
  donGia: Yup.number().required("Đơn giá là bắt buộc").positive("Đơn giá phải là số dương"),
  soLuong: Yup.number().required("Số lượng là bắt buộc").positive("Số lượng phải là số dương"),
  thongTin: Yup.string().required("Thông tin là bắt buộc"),
  danhMuc: Yup.string().required("Danh mục là bắt buộc"),
});

const Product = () => {
  const handleSubmit = (values, { resetForm }) => {
    // Xử lý thêm sản phẩm mới
    console.log("Thêm sản phẩm:", values);
    resetForm(); // Xóa form sau khi thêm
  };

  return (
    <div className="home-container">
      <Menu />
      <CContainer>
        <div className="content">
          <CForm className="add-product-form">
            <h3>Thêm sản phẩm mới</h3>
            <Formik
              initialValues={{
                nameSanpham: "",
                donGia: "",
                soLuong: "",
                thongTin: "",
                danhMuc: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
                  <CRow>
                    <CCol md="6">
                      <div>
                        <label htmlFor="nameSanpham">Tên sản phẩm:</label>
                        <Field as={CFormInput} type="text" id="nameSanpham" name="nameSanpham" />
                        <ErrorMessage name="nameSanpham" component="div" className="error" />
                      </div>
                    </CCol>
                    <CCol md="6">
                      <div>
                        <label htmlFor="donGia">Đơn giá:</label>
                        <Field as={CFormInput} type="number" id="donGia" name="donGia" />
                        <ErrorMessage name="donGia" component="div" className="error" />
                      </div>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md="6">
                      <div>
                        <label htmlFor="soLuong">Số lượng:</label>
                        <Field as={CFormInput} type="number" id="soLuong" name="soLuong" />
                        <ErrorMessage name="soLuong" component="div" className="error" />
                      </div>
                    </CCol>
                    <CCol md="6">
                      <div>
                        <label htmlFor="danhMuc">Danh mục:</label>
                        <Field as={CFormSelect} id="danhMuc" name="danhMuc">
                          <option value="">Chọn danh mục</option>
                          <option value="Danh mục A">Danh mục A</option>
                          <option value="Danh mục B">Danh mục B</option>
                          <option value="Danh mục C">Danh mục C</option>
                        </Field>
                        <ErrorMessage name="danhMuc" component="div" className="error" />
                      </div>
                    </CCol>
                  </CRow>
                  <div>
                    <label htmlFor="thongTin">Thông tin:</label>
                    <Field as={CFormInput} component="textarea" id="thongTin" name="thongTin" />
                    <ErrorMessage name="thongTin" component="div" className="error" />
                  </div>
                  <CButton color="primary" type="submit">Thêm sản phẩm</CButton>
                </Form>
              )}
            </Formik>
          </CForm>
        </div>
      </CContainer>
    </div>
  );
};

export default Product;
