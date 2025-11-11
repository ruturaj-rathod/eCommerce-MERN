import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import "./MyOrders.css";
import { clearErrors, myOrders } from "../../actions/orderAction";
import { Link } from "react-router-dom";
import { Launch } from "@mui/icons-material";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Order Id", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Quantity",
      type: "Number",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "Number",
      flex: 1,
    },
    {
      field: "actions",
      headerName: " ",
      flex: 0.2,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/myorder/${params.getValue(params.id, "id")}`}>
            <Launch />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders?.forEach((item, index) => {
    rows.push({
      itemsQty: item.orderItems.length,
      id: item._id,
      status: item.orderStatus,
      amount: item.totalPrice,
    });
  });
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error]);
  return (
    <Fragment>
      <MetaData title={`${user.name} Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="min-vh-80 d-flex align-items-center">
          <div className="myOrdersPage">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
            />
            <Typography id="myOrdersHeading">{`${user.name}'s Orders`}</Typography>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
