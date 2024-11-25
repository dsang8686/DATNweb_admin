import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardImage,
  CCardTitle,
  CCardText,
  CButton,
  CTable,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CFormSelect,
  CFormInput,
  CSpinner,
} from "@coreui/react";
import BackButton from "../../../Component/BackButton";
import axios from "axios";
import API_BASE_URL from "../../../API/config";
import { toast } from "react-toastify";

//model thông báo
import SuccessModal from "../../../Component/SuccessModal";
import UpdateSuccessModal from "../../../Component/UpdateSuccessModal";
import ErrorModal from "../../../Component/ErrorModal";
import DeleteSuccessModal from "../../../Component/DeleteSuccessModal";

const ProductDetail = () => {
  const { productId } = useParams();
  const [editingAttribute, setEditingAttribute] = useState(null);
  const [product, setProduct] = useState(null);
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [addingNew, setAddingNew] = useState(false);
  const [newSize, setNewSize] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newdefaultPrice, setNewdefaultPrice] = useState("");
  const [newImage, setNewImage] = useState(null);

  //vô hiệu hóa nút
  const [isAdding, setIsAdding] = useState(false);

  //modal thông báo
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isUpdateSuccessVisible, setIsUpdateSuccessVisible] = useState(false);
  const [isDeleteSuccessVisible, setIsDeleteSuccessVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // lưu thông báo
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const navigate = useNavigate();

  //lấy chi tiết sản phẩm (giá và size)

  const fetchProductAndAttributes = async () => {
    try {
      const productResponse = await axios.get(
        `${API_BASE_URL}/api/v1/products/${productId}`
      );
      setProduct(productResponse.data);

      const attributeResponse = await axios.get(
        `${API_BASE_URL}/api/v1/attributes/by-product/${productId}`
      );
      setAttributes(attributeResponse.data.attributes);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi tải chi tiết sản phẩm:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProductAndAttributes();
  }, [productId]);

  // hàm chỉnh sửa giá và size
  const handleEditClick = (attr) => {
    setEditingAttribute(attr._id);
  };
  // hàm chỉnh sửa giá và size
  const handleUpdateAttribute = async (
    attrId,
    size,
    price,
    defaultPrice,
    image
  ) => {
    const token = localStorage.getItem("authToken"); // Lấy token từ local storage
    if (!token) {
      toast.error("Bạn cần đăng nhập để cập nhật thuộc tính!");
      navigate("/login");
      return; // Ngừng nếu không có token
    }

    if (price <= 0 || isNaN(price)) {
      setIsErrorVisible(true);
      setErrorMessage("Lỗi giá sản phẩm không được nhỏ hơn hoặc bằng 0");
      return;
    }

    if (defaultPrice <= 0 || isNaN(defaultPrice)) {
      setIsErrorVisible(true);
      setErrorMessage(
        "Lỗi giá sản phẩm thị trường không được nhỏ hơn hoặc bằng 0"
      );
      return;
    }

    const formData = new FormData();
    formData.append("size", size); // Kích cỡ mới
    formData.append("price", price); // Giá mới
    formData.append("defaultPrice", defaultPrice); // Giá mặc định mới
    if (image) {
      formData.append("image", image); // Chỉ thêm file ảnh nếu có
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/v1/attributes/${attrId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        }
      );

      console.log("Cập nhật thuộc tính thành công:", price);
      toast.success("Cập nhật thuộc tính thành công!");

      // Cập nhật lại danh sách attributes
      setAttributes((prevAttributes) =>
        prevAttributes.map((attr) =>
          attr._id === attrId
            ? {
                ...attr,
                size,
                price: price,
                defaultPrice: defaultPrice,
                image: response.data.image || attr.image, // Dùng ảnh từ API nếu có
              }
            : attr
        )
      );

      // Ngừng chế độ chỉnh sửa
      setEditingAttribute(null);
      //modal
      fetchProductAndAttributes();
      setIsUpdateSuccessVisible(true);
    } catch (error) {
      console.error(
        "Lỗi khi cập nhật thuộc tính:",
        error.response ? error.response.data : error.message
      );
      toast.error("Lỗi khi cập nhật thuộc tính!");
    }
  };
  // hàm lưu giá trị mới
  const handleSaveClick = (attrId) => {
    const size = document.querySelector(`#size-${attrId}`).value; // Lấy kích cỡ từ input
    const price = document.querySelector(`#price-${attrId}`).value; // Lấy giá từ input
    const defaultPrice = document.querySelector(
      `#defaultPrice-${attrId}`
    ).value; // Lấy giá từ input
    const imageInput = document.querySelector(`#image-${attrId}`); // Lấy input file
    const image = imageInput.files[0];
    handleUpdateAttribute(attrId, size, price, defaultPrice, image);
  };

  // Hàm thêm thuộc tính mới
  const handleSaveNewAttribute = async () => {
    setIsAdding(true);
    const token = localStorage.getItem("authToken"); // Lấy token từ local storage
    if (!token) {
      toast.error("Bạn cần đăng nhập để thêm thuộc tính!");
      navigate("/login");
      return; // Ngừng nếu không có token
    }

    if (newPrice <= 0 || isNaN(newPrice)) {
      setIsErrorVisible(true);
      setErrorMessage("Lỗi giá sản phẩm không được nhỏ hơn hoặc bằng 0");
      setIsAdding(false);
      return;
    }
    if (newdefaultPrice <= 0 || isNaN(newdefaultPrice)) {
      setIsErrorVisible(true);
      setErrorMessage("Lỗi giá nhập không được nhỏ hơn hoặc bằng 0");
      setIsAdding(false);
      return;
    }

    const formData = new FormData();
    formData.append("productId", productId); // Thêm productId
    formData.append("size", newSize); // Thêm kích cỡ
    formData.append("isActive", true); // Thêm kích cỡ
    formData.append("price", Number(newPrice)); // Thêm giá
    formData.append("defaultPrice", Number(newdefaultPrice)); // Thêm giá mặc định
    if (newImage) {
      formData.append("image", newImage); // Thêm hình ảnh nếu có
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/attributes/add/single`, // Đường dẫn API
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        }
      );

      console.log("Thêm thuộc tính mới thành công:", response.data);
      setShowSuccessModal(true); // Hiển thị modal sau khi thêm thành công

      // Reset trạng thái sau khi lưu thành công
      setAddingNew(false);
      setNewSize("S");
      setNewPrice("");
      setNewdefaultPrice("");
      setNewImage(null);
      fetchProductAndAttributes();
    } catch (error) {
      console.error(
        "Lỗi khi thêm thuộc tính mới:",
        error.response ? error.response.data : error.message
      );
      toast.error("Lỗi khi thêm thuộc tính!");
    } finally {
      setIsAdding(false); // Đặt lại trạng thái
    }
  };

  // hàm  xóa Attribute
  const handleDeleteAttribute = async (attrId) => {
    const token = localStorage.getItem("authToken"); // Lấy token từ local storage
    if (!token) {
      toast.error("Bạn cần đăng nhập để xóa thuộc tính!");
      navigate("/login");
      return; // Ngừng nếu không có token
    }

    try {
      // Tạo đối tượng FormData
      const formData = new FormData();
      formData.append("isActive", false); // Thêm isActive vào FormData

      // Gửi yêu cầu cập nhật isActive thành false
      await axios.put(`${API_BASE_URL}/api/v1/attributes/${attrId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong header
          "Content-Type": "multipart/form-data", // Đặt kiểu Content-Type
        },
      });

      // Cập nhật lại danh sách attributes
      setAttributes((prevAttributes) =>
        prevAttributes.map((attr) =>
          attr._id === attrId ? { ...attr, isActive: false } : attr
        )
      );

      setIsDeleteSuccessVisible(true);
      fetchProductAndAttributes(); // Lấy lại danh sách sau khi cập nhật
    } catch (error) {
      console.error(
        "Lỗi khi xóa thuộc tính:",
        error.response ? error.response.data : error.message
      );
      toast.error("Lỗi khi xóa thuộc tính!");
    }
  };

  const toggleAddNew = () => {
    setAddingNew(!addingNew);
    if (addingNew) {
      setNewSize("");
      setNewPrice("");
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <CSpinner />
      </div>
    );
  }

  if (!product) {
    return <h4>Không tìm thấy sản phẩm!</h4>;
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between my-3">
        <h4>Chi tiết sản phẩm - {product.name}</h4>
        <BackButton />
      </div>

      <div className="row">
        <div className="col-md-4">
          <CCardImage
            src={product.image}
            alt={product.name}
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        <div className="col-md-8">
          <CCard>
            <CCardBody>
              <CCardTitle>Danh mục: {product.category?.name ? product.category?.name : "Đã dừng hoạt động"}</CCardTitle>
              <CCardTitle>{product?.name}</CCardTitle>
              <CCardText>{product?.description}</CCardText>
            </CCardBody>
          </CCard>

          <CCard className="mt-3 mb-5">
            <CCardBody>
              <CCardTitle>Chọn thêm</CCardTitle>
              <CTable>
                <CTableBody>
                  {/* Hiển thị và chỉnh sửa */}
                  {attributes.map((attr) => (
                    <CTableRow key={attr._id}>
                      <CTableDataCell style={{ width: "18%" }}>
                        {editingAttribute === attr._id ? (
                          <CFormInput
                            id={`image-${attr._id}`}
                            type="file"
                            style={{ color: "transparent", width: 96 }}
                          />
                        ) : (
                          <img
                            src={attr.image}
                            alt={attr.__v}
                            style={{
                              height: 45,
                              objectFit: "cover",
                              borderRadius: 4,
                            }}
                          />
                        )}
                      </CTableDataCell>
                      <CTableDataCell style={{ width: "20%" }}>
                        {editingAttribute === attr._id ? (
                          <CFormInput
                            id={`size-${attr._id}`}
                            defaultValue={attr.size}
                            placeholder="Tên món"
                          />
                        ) : (
                          attr.size
                        )}
                      </CTableDataCell>
                      <CTableDataCell style={{ width: "20%" }}>
                        {editingAttribute === attr._id ? (
                          <CFormInput
                            id={`price-${attr._id}`}
                            type="number"
                            defaultValue={attr.price}
                            placeholder="Nhập giá bán"
                          />
                        ) : (
                          <span className="mt-5">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(attr.price)}
                          </span>
                        )}
                      </CTableDataCell>
                      <CTableDataCell style={{ width: "20%" }}>
                        {editingAttribute === attr._id ? (
                          <CFormInput
                            id={`defaultPrice-${attr._id}`}
                            type="number"
                            defaultValue={attr.defaultPrice}
                            placeholder="Nhập giá nhập"
                          />
                        ) : (
                          <span className="mt-5">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(attr.defaultPrice)}
                          </span>
                        )}
                      </CTableDataCell>
                      <CTableDataCell
                        className=" text-end"
                        style={{ width: "20%" }}
                      >
                        {editingAttribute === attr._id ? (
                          <div>
                            <CButton
                              color="danger"
                              onClick={() => setEditingAttribute(null)}
                            >
                              <i className="bi bi-x-lg"></i>
                            </CButton>
                            <CButton
                              className="ms-2"
                              color="success"
                              onClick={() => handleSaveClick(attr._id)}
                            >
                              <i className="bi bi-pencil-square"></i>
                            </CButton>
                          </div>
                        ) : (
                          <div>
                            <CButton
                              color="danger"
                              onClick={() => handleDeleteAttribute(attr._id)}
                            >
                              <i className="bi-trash"></i>
                            </CButton>
                            <CButton
                              className="ms-2"
                              color="primary"
                              onClick={() => handleEditClick(attr)}
                            >
                              <i className="bi bi-pencil-square"></i>
                            </CButton>
                          </div>
                        )}
                      </CTableDataCell>
                    </CTableRow>
                  ))}

                  {/* Thêm mới */}
                  {addingNew && (
                    <CTableRow>
                      <CTableDataCell style={{ width: "20%" }}>
                        <CFormInput
                          type="file"
                          onChange={(e) => setNewImage(e.target.files[0])}
                          style={{ color: "transparent" }}
                        />
                      </CTableDataCell>
                      <CTableDataCell style={{ width: "20%" }}>
                        <CFormInput
                          value={newSize}
                          onChange={(e) => setNewSize(e.target.value)}
                          placeholder="Món thêm"
                        />
                      </CTableDataCell>
                      <CTableDataCell style={{ width: "20%" }}>
                        <CFormInput
                          type="number"
                          value={newPrice}
                          onChange={(e) => setNewPrice(e.target.value)}
                          placeholder="Giá bán"
                        />
                      </CTableDataCell>
                      <CTableDataCell style={{ width: "20%" }}>
                        <CFormInput
                          type="number"
                          value={newdefaultPrice}
                          onChange={(e) => setNewdefaultPrice(e.target.value)}
                          placeholder="Giá nhập"
                        />
                      </CTableDataCell>
                      <CTableDataCell
                        className="text-end"
                        style={{ width: "20%" }}
                      >
                        <CButton
                          color="danger"
                          onClick={() => setAddingNew(false)}
                        >
                          <i className="bi bi-x-square" />
                        </CButton>
                        <CButton
                          className="ms-2"
                          color="success"
                          onClick={handleSaveNewAttribute}
                          style={{ color: "white" }}
                          disabled={isAdding}
                        >
                          <i className="bi bi-check2-square"></i>
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>

              {!addingNew && (
                <div className="text-end me-3">
                  <CButton
                    color="success"
                    onClick={toggleAddNew}
                    style={{ color: "white" }}
                  >
                    <i className="bi bi-plus-square" /> Thêm
                  </CButton>
                </div>
              )}
            </CCardBody>
          </CCard>
          <SuccessModal
            visible={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
          />
          <UpdateSuccessModal
            visible={isUpdateSuccessVisible}
            onClose={() => setIsUpdateSuccessVisible(false)}
          />
          <DeleteSuccessModal
            visible={isDeleteSuccessVisible}
            onClose={() => setIsDeleteSuccessVisible(false)}
          />
          <ErrorModal
            visible={isErrorVisible}
            onClose={() => setIsErrorVisible(false)}
            message={errorMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
