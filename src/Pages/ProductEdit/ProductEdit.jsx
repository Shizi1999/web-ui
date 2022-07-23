import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Select, MenuItem } from '@mui/material';

import styles from './ProductEdit.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { images } from '~/assets/images';
import TextEditor from '~/components/TextEditor/TextEditor';
import ProductDetailInput from './ProductDetailInput';

const cx = classNames.bind(styles);

function ProductEdit() {
  const productTypes = [
    { slug: 'cotrang', title: 'Co Trang' },
    { slug: 'hiendai', title: 'Hien Dai' },
  ];

  // const [productDetail, setProductDetail] = useState([{ title: '', price: 0, number: 0 }]);
  const [name, setName] = useState('');
  const [productDetail, setProductDetail] = useState([]);
  const [selectValue, setSelectValue] = useState('');
  const groupInputRef = useRef();
  const [previewAvatar, setPreviewAvatar] = useState(images.productPreview);
  const [selectedFile, setSelectedFile] = useState();
  const [html, setHtml] = useState('');
  const [markdown, setMarkdown] = useState('**Hello**');

  const handlePreviewAvatar = (e) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (!selectedFile) {
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewAvatar(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const getProductDetail = () => {
    const groupProductDetail = groupInputRef.current.children;
    let newProductDetail = [];
    for (let i = 0; i < groupProductDetail.length; i++) {
      let arr = groupProductDetail[i].getElementsByTagName('input');
      if (
        arr[0].value === '' ||
        arr[1].value === '' ||
        arr[2].value === '' ||
        arr[1].value === 0 ||
        arr[2].value === 0
      ) {
        continue;
      } else {
        newProductDetail.push({
          title: arr[0].value,
          price: arr[1].value,
          number: arr[2].value,
        });
      }
    }
    console.log(newProductDetail);
  };

  const addItem = () => {
    const newProductDetail = { title: '', price: 0, number: 0 };
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
    getProductDetail();
  };

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>Sản phẩm</h1>
      <div className={cx('product')}>
        <div className={cx('product-image')}>
          <img alt="product-preview" src={previewAvatar} className={cx('preview-image')} />
          <input placeholder="Anh" className={cx('thumbnail')} type="file" onChange={handlePreviewAvatar} />
          <button onClick={handleSubmit} className={cx('btn-submit')}>
            Đăng sản phẩm
          </button>
          <div className={cx('error-message')}>Vui lòng điền đầy đủ thông tin</div>
        </div>
        <div className={cx('form')}>
          <div className={cx('form-group')}>
            <label className={cx('label')}>Tên sản phẩm</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className={cx('form-input')} type="text" />
          </div>
          <div className={cx('form-group')}>
            <label className={cx('label')}>Loại sản phẩm</label>
            <Select
              className={cx('form-select')}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectValue}
              color="primary"
              onChange={handleSelectChange}
            >
              {productTypes.map((item, index) => (
                <MenuItem key={index} value={item.slug}>
                  {item.title}
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
