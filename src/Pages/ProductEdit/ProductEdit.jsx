import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Select, MenuItem } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './ProductEdit.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faPlus } from '@fortawesome/free-solid-svg-icons';
import { images } from '~/assets/images';
import TextEditor from '~/components/TextEditor/TextEditor';
import ProductDetailInput from './ProductDetailInput';
import { getOneProduct, getProductType } from '~/app/productReducer';
import axiosClient from '~/api/axiosClient';
import toastMessage from '~/utils/toastMessage';

const cx = classNames.bind(styles);

function ProductEdit() {
  const { successToastMessage, errorToastMessage } = toastMessage;
  const { slug } = useParams();
  const navigate = useNavigate();
  const { productType, currentProduct } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [productDetail, setProductDetail] = useState([]);
  const [selectValue, setSelectValue] = useState('');
  const [previewAvatar, setPreviewAvatar] = useState(images.uploadProduct);
  const [selectedFile, setSelectedFile] = useState();
  const [html, setHtml] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [isValidate, setIsValidate] = useState(true);
  const groupInputRef = useRef();
  // eslint-disable-next-line
  useEffect(() => {
    dispatch(getProductType());
    if (slug === 'new') {
    } else {
      dispatch(getOneProduct(slug));
    }
  }, []);
  useEffect(() => {
    if (!currentProduct.isEmpty && slug !== 'new' && productType.length > 0) {
      const { name, productType, image, types, desMarkdown, desHtml } = currentProduct.product;
      setName(name);
      setSelectValue(productType);
      if (image !== '') {
        setPreviewAvatar(image);
      }
      setProductDetail(types);
      setMarkdown(desMarkdown);
      setHtml(desHtml);
    }
  }, [currentProduct]);

  useEffect(() => {
    if (productType.length > 0 && slug === 'new') {
      setSelectValue(productType[0].slug);
    }
  }, [productType]);

  useEffect(() => {
    if (!selectedFile) {
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewAvatar(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handlePreviewAvatar = (e) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const getProductDetail = () => {
    const groupProductDetail = groupInputRef.current.children;
    let newProductDetail = [];
    for (let i = 0; i < groupProductDetail.length; i++) {
      let arr = groupProductDetail[i].getElementsByTagName('input');
      if (arr[0].value === '' || arr[1].value === '' || arr[2].value === '' || arr[1].value === 0) {
        continue;
      } else {
        newProductDetail.push({
          type: arr[0].value,
          price: parseInt(arr[1].value),
          amount: parseInt(arr[2].value),
        });
      }
    }
    return newProductDetail;
  };

  const addItem = () => {
    const newProductDetail = { type: '', price: 0, amount: 0 };
    setProductDetail((prev) => [...prev, newProductDetail]);
  };

  const removeItem = (index) => {
    const newProductDetail = productDetail.filter((item, ind) => index !== ind);
    setProductDetail(newProductDetail);
  };

  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  };

  const handleTextEditorChange = ({ html, text }) => {
    setHtml(html);
    setMarkdown(text);
  };

  const handleSubmit = () => {
    if (name === '') {
      setIsValidate(false);
    } else {
      const formData = new FormData();
      formData.append('file', selectedFile);
      const details = getProductDetail();
      formData.append('types', JSON.stringify(details));
      formData.append('name', name);
      formData.append('productType', selectValue);
      formData.append('desMarkdown', markdown);
      formData.append('desHtml', html);
      if (slug === 'new') {
        axiosClient.post('/product/newproduct', formData).then((res) => {
          if (res.code == 1) {
            successToastMessage(res.message);
          } else {
            errorToastMessage(res.message);
          }
        });
      } else {
        axiosClient.post('/product/editproduct', formData).then((res) => {
          if (res.code == 1) {
            successToastMessage(res.message);
          } else {
            errorToastMessage(res.message);
          }
        });
      }
    }
  };

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>Sản phẩm</h1>
      <div className={cx('product')}>
        <div className={cx('product-image')}>
          <div className={cx('img-wrapper')}>
            <img alt="product-preview" src={previewAvatar} className={cx('preview-image')} />
            <label htmlFor="previewProduct" className={cx('btn-upload-img')}>
              <FontAwesomeIcon icon={faImage} className={cx('upload-img-icon')} />
            </label>
          </div>
          <input
            id="previewProduct"
            placeholder="Anh"
            style={{ display: 'none' }}
            className={cx('thumbnail')}
            type="file"
            onChange={handlePreviewAvatar}
          />
          <div>
            <button onClick={handleSubmit} className={cx('btn-submit')}>
              {slug === 'new' ? 'Đăng sản phẩm' : 'Cập nhật sản phẩm'}
            </button>
            <ToastContainer />
          </div>
          {!isValidate && <div className={cx('error-message')}>Vui lòng điền đầy đủ thông tin</div>}
        </div>
        <div className={cx('form')}>
          <div className={cx('form-group')}>
            <label className={cx('label')}>Tên sản phẩm</label>
            <input
              disabled={slug !== 'new'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={cx('form-input')}
              type="text"
            />
          </div>
          <div className={cx('form-group')}>
            <label className={cx('label')}>Loại sản phẩm</label>
            <Select
              className={cx('form-select')}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              color="primary"
              onChange={handleSelectChange}
              value={selectValue || ''}
            >
              {productType.map((item, index) => (
                <MenuItem key={index} value={item.slug}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className={cx('form-group')}>
            <label className={cx('label')}>Phân loại sản phẩm</label>
            <div ref={groupInputRef}>
              {productDetail.map((option, index) => (
                <ProductDetailInput key={index} option={option} index={index} onClick={removeItem} />
              ))}
            </div>
            <button onClick={addItem} className={cx('add-input-item')}>
              Add Item <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>

      <div className={cx('markdown')}>
        <TextEditor value={markdown} onChange={handleTextEditorChange} />
      </div>
    </div>
  );
}

export default ProductEdit;
