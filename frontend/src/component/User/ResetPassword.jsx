import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Loader from "../layout/Loader/Loader";
import { Lock, LockOpen } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import "./UserForm.css";

const ResetPassword = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updateSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error.error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Password reset successfully");
      navigate("/login");
    }
  }, [dispatch, error, navigate, success]);

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
                Forgot Password
              </Typography>
            </Stack>
            <form onSubmit={updateSubmit}>
              <Stack>
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
                <TextField
                  label="Confirm Password"
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
                <Stack direction="row" justifyContent="center">
                  <Button variant="contained" size="small" type="submit">
                    Forgot Password
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

export default ResetPassword;
