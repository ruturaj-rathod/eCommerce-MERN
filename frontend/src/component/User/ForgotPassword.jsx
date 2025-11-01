import { Fragment, useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import { MailOutlined } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import "./UserForm.css";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      alert.error(error.error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`Forgot Password`} />
          <div className="form-container">
            <Stack direction="row" justifyContent="center" mb={4}>
              <Typography
                variant="h6"
                sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.25)" }}
              >
                Forgot Password
              </Typography>
            </Stack>
            <form onSubmit={forgotPasswordSubmit}>
              <Stack>
                <TextField
                  label="Email"
                  type="email"
                  size="small"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlined />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ marginBlock: "20px" }}
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

export default ForgotPassword;
