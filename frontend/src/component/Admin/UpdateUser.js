import { Email, Person, VerifiedUser } from "@material-ui/icons";
import { Fragment, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import { clearErrors, updateUser, userDetails } from "../../actions/userAction";
import { InputAdornment, MenuItem, TextField } from "@mui/material";
import "./Form.css";

const UpdateUser = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, user } = useSelector((state) => state.userDetails);
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = match.params.id;

  useEffect(() => {
    if (!user || user._id !== userId) {
      dispatch(userDetails(userId));
    } else {
      setName(user?.name);
      setEmail(user?.email);
      setRole(user?.role);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product updated successfully");
      history.push("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, alert, history, updateError, user, isUpdated, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);
    dispatch(updateUser(userId, myForm));
  };

  return (
    <Fragment>
      <MetaData title={`Update User`} />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="newProductForm"
            encType="multipart/form-data"
            onSubmit={updateUserSubmitHandler}
          >
            <h1>Update User</h1>
            <TextField
              label="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
              size="small"
              sx={{ marginBlock: "20px" }}
              required
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
              size="small"
              sx={{ marginBlock: "20px" }}
              required
            />
            <TextField
              label="Role"
              select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VerifiedUser />
                  </InputAdornment>
                ),
              }}
              fullWidth
              size="small"
              sx={{ marginBlock: "20px" }}
              required
            >
              <MenuItem value="">Choose</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </TextField>
            <Button
              type="submit"
              disabled={
                updateLoading ? true : false || role === "" ? true : false
              }
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
