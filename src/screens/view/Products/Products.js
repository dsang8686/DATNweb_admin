import {
    CButton,
    CCol,
    CContainer,
    CFormCheck,
    CFormInput,
    CFormSelect,
    CFormText,
    CFormTextarea,
    CImage,
    CRow,
  } from '@coreui/react'
  import React, { useEffect, useState } from 'react'
  import { Link } from 'react-router-dom'

  import { ErrorMessage, Field, Form, Formik } from 'formik'
  import * as Yup from 'yup'
  
  import axios from 'axios'
  import { toast } from 'react-toastify'
  
  function AddProductDetail() {
    const [descEditor, setDescEditor] = useState('')
    const [promotionEditor, setPromotionEditor] = useState('')
    const [videoEditor, setVideoEditor] = useState('')
  
    // date picker
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [errors, setErrors] = useState({ startDate: '', endDate: '' })
  
    // validate for date start - date end
    const validateDates = (start, end) => {
      const newErrors = { startDate: '', endDate: '' }
      if (start && end && start > end) {
        newErrors.startDate = 'Ngày bắt đầu không được sau ngày kết thúc'
        newErrors.endDate = 'Ngày kết thúc không được trước ngày bắt đầu'
      }
      setErrors(newErrors)
    }
  
    // category
    const [categories, setCategories] = useState([])
  
    // brand
    const [brands, setBrands] = useState([])
  
    // status
    const [status, setStatus] = useState([])
  
    // properties
    const [dataProductProperties, setDataProductProperties] = useState([])
  
    // technology
    const [tech, setTech] = useState({})
    const [tempTech, setTempTech] = useState({}) // Temporary state for input handling
    
  
    // selected technology option
    const [selectedTechOptions, setSelectedTechOptions] = useState([])
  
    const [choosenCategory, setChoosenCategory] = useState('1')
  
    const [selectedCategory, setSelectedCategory] = useState([])
    const [selectedChildCate, setSelectedChildCate] = useState([])
    const [selectedStatus, setSelectedStatus] = useState('')
  
    const [activeTab, setActiveTab] = useState('tab1')
  
    const handleTabClick = (tab) => {
      setActiveTab(tab)
    }
  
    // editor
    const [editorData, setEditorData] = useState('')
    // upload image and show image
    const [selectedFile, setSelectedFile] = useState('')
    const [file, setFile] = useState([])
  
    // upload list of images and show images
    const [selectedFileDetail, setSelectedFileDetail] = useState([])
    const [fileDetail, setFileDetail] = useState([])
  
    const initialValues = {
      title: '',
      friendlyUrl: '',
      pageTitle: '',
      metaKeywords: '',
      metaDescription: '',
      syndicationCode: '',
      productCodeNumber: '',
      productCode: '',
      price: 0,
      marketPrice: 0,
      brand: '',
      stock: 0,
      visible: 0,
    }
  
    //set img detail
    function onFileChange(e) {
      const files = e.target.files
      const selectedFiles = []
      const fileUrls = []
  
      Array.from(files).forEach((file) => {
        // Create a URL for the file
        fileUrls.push(URL.createObjectURL(file))
  
        // Read the file as base64
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
  
        fileReader.onload = (event) => {
          selectedFiles.push(event.target.result)
          // Set base64 data after all files have been read
          if (selectedFiles.length === files.length) {
            setSelectedFile(selectedFiles)
          }
        }
      })
  
      // Set file URLs for immediate preview
      setFile(fileUrls)
    }
  
    // set list of images
    const onFileChangeDetail = (e) => {
      const selectedFiles = []
      const targetFiles = e.target.files
      const targetFilesObject = [...targetFiles]
      let files = e.target.files
      let newSelectedFileDetail = []
  
      function readNextFile(index) {
        if (index < files.length) {
          let fileReader = new FileReader()
          fileReader.onload = (event) => {
            let newFileDetail = event.target.result
            newSelectedFileDetail.push(newFileDetail)
            readNextFile(index + 1)
          }
          fileReader.readAsDataURL(files[index])
        } else {
          setSelectedFileDetail((prevFiles) => [...prevFiles, ...newSelectedFileDetail])
        }
      }
      readNextFile(0)
      targetFilesObject.map((item) => {
        return selectedFiles.push(URL.createObjectURL(item))
      })
      setFileDetail((prevFiles) => [...prevFiles, ...selectedFiles])
    }
  
    const removeImage = (index) => {
      setSelectedFileDetail((prevFiles) => prevFiles.filter((_, i) => i !== index))
      setFileDetail((prevFiles) => prevFiles.filter((_, i) => i !== index))
    }
  
    
  
    return (
      <CContainer>
        <CRow className="mb-3">
          <CCol>
            <h3>THÊM MỚI SẢN PHẨM</h3>
          </CCol>
          <CCol md={{ span: 4, offset: 4 }}>
            <div className="d-flex justify-content-end">
              <Link to={`/product`}>
                <CButton color="primary" type="submit" size="sm">
                  Danh sách
                </CButton>
              </Link>
            </div>
          </CCol>
        </CRow>
  
        <CRow>
          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            // onSubmit={handleSubmit}
          >
            {({ setFieldValue, values }) => (
              <Form>
                <CRow>
                  <CCol md={9}>
                    <CCol md={12}>
                      {/* <label htmlFor="title-input"></label> */}
                      <Field name="title">
                        {({ field }) => (
                          <CFormInput
                            {...field}
                            type="text"
                            id="title-input"
                            placeholder="Nhập tiêu đề ở tại đây"
                          />
                        )}
                      </Field>
                      <ErrorMessage name="title" component="div" className="text-danger" />
                    </CCol>
                    <br />
  
                    <CCol md={12}>
                      <label htmlFor="visible-select">Bài viết mô tả sản phẩm</label>
                    
                    </CCol>
  
                    <CCol md={12}>
                      <div className="tabs">
                        <button
                          type="button"
                          className={activeTab === 'tab1' ? 'active' : ''}
                          onClick={() => handleTabClick('tab1')}
                        >
                          Mô tả
                        </button>
                        <button
                          type="button"
                          className={activeTab === 'tab2' ? 'active' : ''}
                          onClick={() => handleTabClick('tab2')}
                        >
                          Thông tin khuyến mãi
                        </button>
  
                        <button
                          type="button"
                          className={activeTab === 'tab3' ? 'active' : ''}
                          onClick={() => handleTabClick('tab3')}
                        >
                          Video
                        </button>
  
                        <button
                          type="button"
                          className={activeTab === 'tab4' ? 'active' : ''}
                          onClick={() => handleTabClick('tab4')}
                        >
                          Thông số kỹ thuật
                        </button>
                      </div>
                      <div className="tab-contents">
                        <div className={`tab-content ${activeTab === 'tab1' ? 'active' : ''}`}>
                          <CCol md={12}>
                           
                          </CCol>
                        </div>
                        <div className={`tab-content ${activeTab === 'tab2' ? 'active' : ''}`}>
                          <CCol md={12}>
                            
                          </CCol>
                        </div>
                        <div className={`tab-content ${activeTab === 'tab3' ? 'active' : ''}`}>
                          <CCol md={12}>
                            
                          </CCol>
                        </div>
                        <div className={`tab-content ${activeTab === 'tab4' ? 'active' : ''}`}>
                          <CCol md={12}>
                            <table className="tech-table">
                              {dataProductProperties &&
                                dataProductProperties.length > 0 &&
                                dataProductProperties?.map((prop) => (
                                  <tr key={prop.title}>
                                    <th>{prop.title}</th>
                                    <td>
                                      <CFormTextarea
                                      
                                      ></CFormTextarea>
  
                                      <div className="d-flex gap-3 flex-wrap mt-2">
                                        {prop?.optionChild?.map((option) => (
                                          <CFormCheck
                                            key={option?.op_id}
                                            label={option?.title}
                                            aria-label="Default select example"
                                            defaultChecked={option?.op_id}
                                            id={`flexCheckDefault_${option?.op_id}`}
                                            value={option?.op_id}
                                            checked={selectedTechOptions.includes(option?.op_id)}
                                            onChange={(e) => {
                                              const optionId = option?.op_id
                                              const isChecked = e.target.checked
                                              if (isChecked) {
                                                setSelectedTechOptions([
                                                  ...selectedTechOptions,
                                                  optionId,
                                                ])
                                              } else {
                                                setSelectedTechOptions(
                                                  selectedTechOptions.filter((id) => id !== optionId),
                                                )
                                              }
                                            }}
                                          />
                                        ))}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                            </table>
                          </CCol>
                        </div>
                      </div>
                    </CCol>
                    <br />
                    <CCol>
                      <CFormInput
                        type="file"
                        id="formFile"
                        label="Hình ảnh chi tiết sản phẩm (*Có thể chọn nhiều hình cùng lúc)"
                        multiple
                        onChange={(e) => onFileChangeDetail(e)}
                        size="sm"
                      />
                      <br />
                      <div className="d-flex gap-4 w-100 flex-wrap">
                        {fileDetail.length === 0 ? (
                          <div></div>
                        ) : (
                          fileDetail.map((item, index) => (
                            <div key={index} className="position-relative">
                              <CImage className="border" src={item} fluid width={130} />
                              <CButton
                                color="danger"
                                size="sm"
                                onClick={() => removeImage(index)}
                                style={{ position: 'absolute', top: 0, right: 0 }}
                              >
                                X
                              </CButton>
                            </div>
                          ))
                        )}
                      </div>
                      <br />
                    </CCol>
  
                    <br />
                    <h6>Search Engine Optimization</h6>
                    <br />
  
                    <CCol md={12}>
                      <label htmlFor="friendlyUrl-input">Chuỗi đường dẫn</label>
                      <Field
                        name="friendlyUrl"
                        type="text"
                        as={CFormInput}
                        id="url-input"
                        text="Chuỗi dẫn tĩnh là phiên bản của tên hợp chuẩn với Đường dẫn (URL). Chuỗi này bao gồm chữ cái thường, số và dấu gạch ngang (-). VD: vi-tinh-nguyen-kim-to-chuc-su-kien-tri-an-dip-20-nam-thanh-lap"
                      />
                      <ErrorMessage name="friendlyUrl" component="div" className="text-danger" />
                    </CCol>
                    <br />
  
                    <CCol md={12}>
                      <label htmlFor="pageTitle-input">Tiêu đề trang</label>
                      <Field
                        name="pageTitle"
                        type="text"
                        as={CFormInput}
                        id="pageTitle-input"
                        text="Độ dài của tiêu đề trang tối đa 60 ký tự."
                      />
                      <ErrorMessage name="pageTitle" component="div" className="text-danger" />
                    </CCol>
                    <br />
                    <CCol md={12}>
                      <label htmlFor="metaKeywords-input">Meta keywords</label>
                      <Field
                        name="metaKeywords"
                        type="text"
                        as={CFormInput}
                        id="metaKeywords-input"
                        text="Độ dài của meta keywords chuẩn là từ 100 đến 150 ký tự, trong đó có ít nhất 4 dấu phẩy (,)."
                      />
                      <ErrorMessage name="metaKeywords" component="div" className="text-danger" />
                    </CCol>
                    <br />
  
                    <CCol md={12}>
                      <label htmlFor="metaDescription-input">Meta description</label>
                      <Field
                        name="metaDescription"
                        type="text"
                        as={CFormInput}
                        id="metaDescription-input"
                        text="Thẻ meta description chỉ nên dài khoảng 140 kí tự để có thể hiển thị hết được trên Google. Tối đa 200 ký tự."
                      />
                      <ErrorMessage name="metaDescription" component="div" className="text-danger" />
                    </CCol>
                    <br />
                  </CCol>
  
                  <CCol md={3}>
                    <CCol md={12}>
                      <label htmlFor="syndicationCode-input">Mã Syndication</label>
                      <Field
                        name="syndicationCode"
                        type="text"
                        as={CFormInput}
                        id="syndicationCode-input"
                      />
                      <ErrorMessage name="syndicationCode" component="div" className="text-danger" />
                    </CCol>
                    <br />
  
                    <CCol md={12}>
                      <label htmlFor="productCodeNumber-input">Mã số</label>
                      <Field
                        name="productCodeNumber"
                        type="text"
                        as={CFormInput}
                        id="productCodeNumber-input"
                        text="Nếu không nhập mã số hoặc mã số đã tồn tại. Hệ thống sẽ tự tạo mã số theo chuẩn."
                      />
                      <ErrorMessage
                        name="productCodeNumber"
                        component="div"
                        className="text-danger"
                      />
                    </CCol>
                    <br />
  
                    <CCol md={12}>
                      <label htmlFor="productCode-input">Mã kho</label>
                      <Field
                        name="productCode"
                        type="text"
                        as={CFormInput}
                        id="productCode-input"
                        text="Nếu không nhập mã kho hoặc mã kho đã tồn tại. Hệ thống sẽ tự tạo mã kho theo chuẩn."
                      />
                      <ErrorMessage name="productCode" component="div" className="text-danger" />
                    </CCol>
                    <br />
  
                    <CCol md={12}>
                      <Field name="marketPrice">
                        {({ field }) => (
                          <CFormInput
                            {...field}
                            type="text"
                            id="marketPrice-input"
                            
                            label="Giá thị trường"
                       
                          />
                        )}
                      </Field>
                      <ErrorMessage name="marketPrice" component="div" className="text-danger" />
                    </CCol>
                    <br />
  
                    <CCol md={12}>
                      <Field name="price">
                        {({ field }) => (
                          <CFormInput
                            {...field}
                            type="text"
                            id="price-input"
                           
                            label="Giá bán"
                            
                          />
                        )}
                      </Field>
                      <ErrorMessage name="price" component="div" className="text-danger" />
                    </CCol>
                    <br />
  
                    <CCol md={12}>
                      <label htmlFor="categories-select">Nghành hàng</label>
                      <Field
                        name="categories"
                        as={CFormSelect}
                        id="categories-select"
                        className="select-input"
                        value={choosenCategory}
                        onChange={(e) => setChoosenCategory(e.target.value)}
                        options={
                          categories && categories.length > 0
                            ? categories.map((cate) => ({
                                label: cate?.category_desc?.cat_name,
                                value: cate.cat_id,
                              }))
                            : []
                        }
                      />
                    </CCol>
                    <br />
  
                    <div
                      className="border p-3 bg-white"
                      style={{
                        maxHeight: 400,
                        minHeight: 250,
                        overflowY: 'scroll',
                      }}
                    >
                      <React.Fragment>
                        <strong>Danh mục sản phẩm</strong>
                        <div className="mt-2">
                          {categories &&
                            categories.length > 0 &&
                            categories
                              ?.filter((cate) => cate.cat_id == choosenCategory)?.[0]
                              ?.parenty.map((subCate) => (
                                <>
                                  <CFormCheck
                                    key={subCate?.cat_id}
                                    label={subCate?.category_desc?.cat_name}
                                    aria-label="Default select example"
                                    defaultChecked={subCate?.cat_id}
                                    id={`flexCheckDefault_${subCate?.cat_id}`}
                                    value={subCate?.cat_id}
                                    checked={selectedCategory.includes(subCate?.cat_id)}
                                    onChange={(e) => {
                                      const cateId = subCate?.cat_id
                                      const isChecked = e.target.checked
                                      if (isChecked) {
                                        setSelectedCategory([...selectedCategory, cateId])
                                      } else {
                                        setSelectedCategory(
                                          selectedCategory.filter((id) => id !== cateId),
                                        )
                                      }
                                    }}
                                  />
  
                                  {subCate &&
                                    subCate?.parentx.length > 0 &&
                                    subCate?.parentx.map((childCate) => (
                                      <CFormCheck
                                        className="ms-3"
                                        key={childCate?.cat_id}
                                        label={childCate?.category_desc?.cat_name}
                                        aria-label="Default select example"
                                        defaultChecked={childCate?.cat_id}
                                        id={`flexCheckDefault_${childCate?.cat_id}`}
                                        value={childCate?.cat_id}
                                        checked={selectedChildCate.includes(childCate?.cat_id)}
                                        onChange={(e) => {
                                          const cateId = childCate?.cat_id
                                          const isChecked = e.target.checked
                                          if (isChecked) {
                                            setSelectedChildCate([...selectedChildCate, cateId])
                                          } else {
                                            setSelectedChildCate(
                                              selectedChildCate.filter((id) => id !== cateId),
                                            )
                                          }
                                        }}
                                      />
                                    ))}
                                </>
                              ))}
                        </div>
                      </React.Fragment>
                    </div>
                    <br />
  
                    <CCol md={12}>
                      <label htmlFor="brand-select">Thương hiệu</label>
                      <Field
                        name="brand"
                        as={CFormSelect}
                        id="brand-select"
                        className="select-input"
                        options={
                          brands && brands.length > 0
                            ? brands.map((brand) => ({
                                label: brand?.title,
                                value: brand.brandId,
                              }))
                            : []
                        }
                      />
                      <ErrorMessage name="brand" component="div" className="text-danger" />
                    </CCol>
                    <br />
  
                 
  
                    <CCol md={12}>
                      <label htmlFor="status-select">Trạng thái</label>
                      <Field
                        name="status"
                        as={CFormSelect}
                        id="status-select"
                        className="select-input"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        options={[
                          { label: 'Chọn trạng thái', value: '' },
                          ...(status && status.length > 0
                            ? status.map((item) => ({
                                label: item.name,
                                value: item.status_id,
                              }))
                            : []),
                        ]}
                      />
                      {/* <ErrorMessage name="status" component="div" className="text-danger" /> */}
                    </CCol>
                    <br />
  
                    {/* if flashsale */}
                    {selectedStatus === 5}
  
                    <CCol md={12}>
                      <label htmlFor="stock-select">Tình trạng</label>
                      <Field
                        name="stock"
                        as={CFormSelect}
                        id="stock-select"
                        className="select-input"
                        options={[
                          { label: 'Còn hàng', value: 0 },
                          { label: 'Liên hệ', value: 1 },
                          { label: 'Ngừng kinh doanh', value: 2 },
                        ]}
                      />
                      <ErrorMessage name="stock" component="div" className="text-danger" />
                    </CCol>
                    <br />
  
                    <CCol md={12}>
                      <CFormInput
                        name="picture"
                        type="file"
                        id="formFile"
                        label="Hình ảnh đại diện"
                        onChange={(e) => onFileChange(e)}
                        size="sm"
                      />
                      <br />
                      <ErrorMessage name="picture" component="div" className="text-danger" />
  
                      <div>
                        {file.length == 0 ? (
                          <div>
                            
                          </div>
                        ) : (
                          file.map((item, index) => <CImage key={index} src={item} width={200} />)
                        )}
                      </div>
                    </CCol>
                    <br />
  
                    <CCol md={12}>
                      <label htmlFor="visible-select">Đăng sản phẩm</label>
                      <Field
                        name="visible"
                        as={CFormSelect}
                        id="visible-select"
                        className="select-input"
                        options={[
                          { label: 'Không', value: 0 },
                          { label: 'Có', value: 1 },
                        ]}
                      />
                      <ErrorMessage name="visible" component="div" className="text-danger" />
                    </CCol>
                    <br />
  
                    <CCol xs={12}>
                      <CButton color="primary" type="submit" size="sm">
                        Thêm mới
                      </CButton>
                    </CCol>
                  </CCol>
                </CRow>
              </Form>
            )}
          </Formik>
        </CRow>
      </CContainer>
    )
  }
  
  export default AddProductDetail