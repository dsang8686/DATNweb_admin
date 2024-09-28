import {
  CButton,
  CCol,
  CContainer,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CImage,
  CRow,
  CFormTextarea,
} from "@coreui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [status, setStatus] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedChildCate, setSelectedChildCate] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedFileDetail, setSelectedFileDetail] = useState([]);
  const [fileDetail, setFileDetail] = useState([]);

  const initialValues = {
    title: "",
    price: 0,
    marketPrice: 0,
    brand: "",
    stock: 0,
    visible: 0,
    description: "", // Trường cho mô tả sản phẩm
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Tiêu đề là bắt buộc."),
    stock: Yup.number()
      .required("Số lượng là bắt buộc")
      .min(0, "Số lượng không thể âm"), // Validation cho số lượng
    description: Yup.string().required("Mô tả sản phẩm là bắt buộc"), // Validation cho mô tả sản phẩm
  });

  const onFileChangeDetail = (e) => {
    const selectedFiles = [];
    const targetFiles = e.target.files;
    const targetFilesObject = [...targetFiles];
    let files = e.target.files;
    let newSelectedFileDetail = [];

    function readNextFile(index) {
      if (index < files.length) {
        let fileReader = new FileReader();
        fileReader.onload = (event) => {
          let newFileDetail = event.target.result;
          newSelectedFileDetail.push(newFileDetail);
          readNextFile(index + 1);
        };
        fileReader.readAsDataURL(files[index]);
      } else {
        setSelectedFileDetail((prevFiles) => [
          ...prevFiles,
          ...newSelectedFileDetail,
        ]);
      }
    }
    readNextFile(0);
    targetFilesObject.map((item) => {
      return selectedFiles.push(URL.createObjectURL(item));
    });
    setFileDetail((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const removeImage = (index) => {
    setSelectedFileDetail((prevFiles) =>
      prevFiles.filter((_, i) => i !== index)
    );
    setFileDetail((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (values) => {
    console.log("Submitted values:", values);
  };

  return (
    <CContainer>
      <CRow className="mb-3">
        <CCol>
          <h3>THÊM MỚI SẢN PHẨM</h3>
        </CCol>
        <CCol md={{ span: 4, offset: 4 }}>
          <div className="d-flex justify-content-end">
            <Link to={`/product`}>
              <CButton color="primary" size="sm">
                Danh sách
              </CButton>
            </Link>
          </div>
        </CCol>
      </CRow>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <CRow>
              <CCol>
                <Field name="title">
                  {({ field }) => (
                    <CFormInput
                      {...field}
                      type="text"
                      placeholder="Nhập tiêu đề"
                      label="Tiêu đề sản phẩm"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-danger"
                />
                <br />

                <Field name="marketPrice">
                  {({ field }) => (
                    <CFormInput
                      {...field}
                      type="text"
                      placeholder="Giá thị trường"
                      label="Giá thị trường"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="marketPrice"
                  component="div"
                  className="text-danger"
                />
                <br />

                <Field name="price">
                  {({ field }) => (
                    <CFormInput
                      {...field}
                      type="text"
                      placeholder="Giá bán"
                      label="Giá bán"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-danger"
                />
                <br />

                <Field name="stock">
                  {({ field }) => (
                    <CFormInput
                      {...field}
                      type="number"
                      placeholder="Số lượng"
                      label="Số lượng"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="stock"
                  component="div"
                  className="text-danger"
                />
                <br />

                <label htmlFor="categories-select">Nghành hàng</label>
                <Field
                  name="categories"
                  as={CFormSelect}
                  id="categories-select"
                  className="select-input"
                />
                <br />

                <label htmlFor="brand-select">Thương hiệu</label>
                <Field
                  name="brand"
                  as={CFormSelect}
                  id="brand-select"
                  className="select-input"
                />
                <ErrorMessage
                  name="brand"
                  component="div"
                  className="text-danger"
                />
                <br />

                <Field name="description">
                  {({ field }) => (
                    <CFormTextarea
                      {...field}
                      rows="5"
                      placeholder="Nhập mô tả sản phẩm"
                      label="Mô tả sản phẩm"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-danger"
                />
                <br />

                <CFormInput
                  type="file"
                  id="formFile"
                  label="Hình ảnh chi tiết sản phẩm"
                  multiple
                  onChange={onFileChangeDetail}
                  size="sm"
                />
                <br />
                <div className="d-flex gap-4 w-100 flex-wrap">
                  {fileDetail.length === 0 ? (
                    <div></div>
                  ) : (
                    fileDetail.map((item, index) => (
                      <div key={index} className="position-relative">
                        <CImage
                          className="border"
                          src={item}
                          fluid
                          width={130}
                        />
                        <CButton
                          color="danger"
                          size="sm"
                          onClick={() => removeImage(index)}
                          style={{ position: "absolute", top: 0, right: 0 }}
                        >
                          X
                        </CButton>
                      </div>
                    ))
                  )}
                </div>
                <br />

                <CButton color="primary" type="submit" size="sm">
                  Thêm mới
                </CButton>
              </CCol>
            </CRow>
          </Form>
        )}
      </Formik>
    </CContainer>
  );
}

export default AddProduct;
