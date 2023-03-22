import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import Product from "../Home/ProductCard";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Pagination,
  PaginationItem,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@material-ui/icons";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [keyword, setkeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [openFilter, setOpenFilter] = useState(false);

  const { products, loading, error, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(getProduct(keyword, currentPage));
  }, [dispatch, keyword, currentPage, alert, error]);

  const handleFilter = () => {
    setCurrentPage(1);
    dispatch(getProduct(keyword, currentPage, price, category, rating));
    setOpenFilter(false);
  };

  return (
    <Fragment>
      <MetaData title="PRODUCTS -- Ecommerce" />
      <div className="bg-light">
        <div className="container py-5">
          <div className="d-flex justify-content-center">
            <h2 className="px-3 pb-2 border-bottom">Popular Product</h2>
          </div>
          <div className="d-flex justify-content-center justify-content-sm-end my-3">
            <div>
              <TextField
                value={keyword}
                onChange={(e) => setkeyword(e.target.value)}
                placeholder="search"
                size="small"
              />
            </div>
            <Button variant="contained" onClick={() => setOpenFilter(true)}>
              Filter
            </Button>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <div className="row justify-content-center justify-content-sm-start">
                {products &&
                  products?.map((product, index) => (
                    <div
                      className="col-sx-12 col-sm-6 col-lg-4 col-xl-3 d-flex justify-content-center"
                      key={index}
                    >
                      <Product product={product} />
                    </div>
                  ))}
              </div>
            </Fragment>
          )}
          {/* Pagination */}
          <div className="d-flex justify-content-center my-3 my-sm-5">
            <Pagination
              count={parseInt(productsCount / 8) + 1}
              color="primary"
              defaultPage={1}
              page={currentPage}
              onChange={(e, page) => setCurrentPage(page)}
              showFirstButton
              showLastButton
              siblingCount={1}
              variant="outlined"
              renderItem={(item) => (
                <PaginationItem
                  slots={{
                    previous: ArrowBack,
                    next: ArrowForward,
                  }}
                  {...item}
                />
              )}
            />
          </div>
        </div>
      </div>

      {/* Filter Dialog */}
      <Dialog
        aria-labelledby="filter-apply"
        open={openFilter}
        onClose={() => setOpenFilter(false)}
      >
        <DialogTitle id="filter-apply">Filters</DialogTitle>
        <DialogContent>
          <Stack spacing={3} maxWidth={500} justifyContent="center">
            {/* Price Filter */}
            <Stack spacing={1}>
              <Typography variant="h6" component="div">
                Price
              </Typography>
              <Stack spacing={1} direction="row">
                <TextField
                  label="Min"
                  type="number"
                  size="small"
                  sx={{ width: 100 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                  }}
                  value={price[0]}
                  onChange={(e) => setPrice([e.target.value, price[1]])}
                />
                <TextField
                  label="Max"
                  type="number"
                  size="small"
                  sx={{ width: 100 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                  }}
                  value={price[1]}
                  onChange={(e) => setPrice([price[0], e.target.value])}
                />
              </Stack>
            </Stack>

            {/* Category Filter */}
            <Stack spacing={1}>
              <Typography variant="h6" component="div">
                Category
              </Typography>
              <FormControl size="small">
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value="">No value</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            {/* Rating filter */}
            <Stack spacing={1}>
              <Typography variant="h6" component="div">
                Ratings Above
              </Typography>
              <FormControl size="small">
                <Select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  {Array.apply(null, Array(6)).map((item, index) => (
                    <MenuItem key={index} value={index}>
                      {index}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <Stack>
              <Button onClick={handleFilter} variant="outlined">
                Filter
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default Products;
