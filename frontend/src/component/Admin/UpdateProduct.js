import {
  AccountTree,
  AttachMoney,
  Spellcheck,
  Storage,
} from "@material-ui/icons";
import { Fragment, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { EDIT_PRODUCT_RESET } from "../../constants/productConstants";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productAction";
import { InputAdornment, MenuItem, TextField } from "@mui/material";
import { TextareaAutosize } from "@mui/base";
import "./Form.css";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const UpdateProduct = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, success } = useSelector((state) => state.newProduct);
  const { error: productDetailsError, product } = useSelector(
    (state) => state.productDetails
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  let productId = match.params.id;

  useEffect(() => {
    if (!product || product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product?.name);
      setPrice(product?.price);
      setDescription(product?.description);
      setStock(product?.stock);
      setCategory(product?.category);
      setOldImages(product?.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (productDetailsError) {
      alert.error(productDetailsError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product updated successfully");
      history.push("/admin/products");
      dispatch({ type: EDIT_PRODUCT_RESET });
    }
  }, [
    dispatch,
    error,
    alert,
    history,
    success,
    productId,
    product,
    productDetailsError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("stock", stock);
    myForm.set("description", description);
    myForm.set("category", category);
    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(productId, myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  return (
    <Fragment>
      <MetaData title={`Create Proudct`} />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="newProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

            {/* Product Name */}
            <TextField
              type="text"
              label="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Spellcheck />
                  </InputAdornment>
                ),
              }}
              size="small"
              sx={{ marginBlock: "20px" }}
              required
            />

              {/* Price field */}
            <TextField
              type="number"
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney />
                  </InputAdornment>
                ),
              }}
              size="small"
              sx={{ marginBlock: "20px" }}
              required
            />
            
            {/* Category field */}
            <TextField
              select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountTree />
                  </InputAdornment>
                ),
              }}
              size="small"
              sx={{ marginBlock: "20px" }}
              required
            >
                <MenuItem value="">Choose Category</MenuItem>
                {
                    categories.map((category) => (
                        <MenuItem value={category} key={category}>{category}</MenuItem>
                    ))
                }
            </TextField>

            {/* Stock Filed */}
            <TextField
              type="number"
              label="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Storage />
                  </InputAdornment>
                ),
              }}
              size="small"
              sx={{ marginBlock: "10px" }}
              required
            />

             {/* Description */}
             <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Description"
              minRows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{marginTop: '10px'}}
            />

              {/* Choose images */}
            <div id="newProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                multiple
                onChange={createProductImagesChange}
              />
            </div>
            <div id="newProductFormImage">
              <div>Old Images</div>
              {oldImages.map((image, index) => (
                <img src={image.url} key={index} alt="Avatar Preview" />
              ))}
            </div>
            <div id="newProductFormImage">
              <div>New Images</div>
              {imagesPreview.map((image, index) => (
                <img src={image} key={index} alt="Avatar Preview" />
              ))}
            </div>

            {/* Submit Button */}
            <Button
              id="newProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
