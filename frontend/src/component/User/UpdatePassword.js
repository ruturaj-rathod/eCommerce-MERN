import { Fragment, useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import { Lock, LockOpen, VpnKey } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import { Button, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import "./UserForm.css";

const UpdatePassword = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updateSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error.error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile updated successfully");
      history.push("/account");

      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, alert, history, isUpdated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`Change Pasword`} />
          <div className="form-container">
            <Stack direction="row" justifyContent="center" mb={4}>
              <Typography
                variant="h6"
                sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.25)" }}
              >
                Change Password
              </Typography>
            </Stack>
            <form onSubmit={updateSubmit}>
              <Stack>
                  {/* Old password */}
                <TextField
                  label="Old Password"
                  type="password"
                  size="small"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKey />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ marginBlock: "10px" }}
                  required
                />
                
                {/* New Password */}
                <TextField
                  label="New Password"
                  type="password"
                  size="small"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOpen />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ marginBlock: "10px" }}
                  required
                />
                
                {/* Confirm Passwword */}
                <TextField
                  label="Old Password"
                  type="password"
                  size="small"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ marginBlock: "10px" }}
                  required
                />

                {/* Change Password Button */}
                <Stack direction="row" justifyContent="center">
                  <Button variant="contained" size="small" type="submit">
                    Change Password
                  </Button>
                </Stack>
              </Stack>
            </form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
