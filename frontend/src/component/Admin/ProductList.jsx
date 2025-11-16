import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  clearErrors,
  deleteProduct,
  getAdminProducts,
} from "../../actions/productAction";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import "./ProductList.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router";
import { Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = () => {
  const dispatch = useDispatch();
  const { error, products } = useSelector((state) => state.products);
  const { error: deletedError, deleted } = useSelector(
    (state) => state.deleteProduct
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deletedError) {
      toast.error(deletedError);
      dispatch(clearErrors());
    }

    if (deleted) {
      toast.success("Product deleted successfully");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProducts());
  }, [dispatch, error, deletedError, deleted]);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };
  const columns = [
    { field: "id", headerName: "Product ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "stock",
      headerName: "Stock",

      flex: 0.3,
      type: "Number",
    },
    {
      field: "price",
      headerName: "Price",

      flex: 0.5,
      type: "Number",
    },
    {
      field: "action",
      headerName: "Actions",

      flex: 1,
      type: "Number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params?.id}`}>
              <Edit />
            </Link>
            <Button onClick={() => deleteProductHandler(params?.id)}>
              <Delete />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];
  products?.forEach((item) => {
    rows.push({
      id: item._id,
      stock: item.stock,
      price: item.price,
      name: item.name,
    });
  });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - ADMIN`} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
