import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  clearErrors,
  deleteOrder,
  getAllOrders,
} from "../../actions/orderAction";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import "./ProductList.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router";
import { Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrderList = () => {
  const dispatch = useDispatch();
  const { error, orders } = useSelector((state) => state.allOrders);
  const { error: deletedError, isDeleted } = useSelector(
    (state) => state.order
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

    if (isDeleted) {
      toast.success("Product deleted successfully");
      dispatch({ type: DELETE_ORDER_RESET });
    }
    dispatch(getAllOrders());
  }, [dispatch, error, deletedError, isDeleted]);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };
  const columns = [
    { field: "id", headerName: "Order Id", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
      cellClassName: (params) => {
        return params.row?.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Quantity",
      type: "Number",
      flex: 0.5,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "Number",
      flex: 0.7,
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
            <Link to={`/admin/order/${params.id}`}>
              <Edit />
            </Link>
            <Button onClick={() => deleteOrderHandler(params.id)}>
              <Delete />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];
  orders?.forEach((item) => {
    rows.push({
      id: item._id,
      itemsQty: item.orderItems.length,
      status: item.orderStatus,
      amount: item.totalPrice,
    });
  });

  return (
    <Fragment>
      <MetaData title={`ALL orders - ADMIN`} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL orders</h1>
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

export default OrderList;
