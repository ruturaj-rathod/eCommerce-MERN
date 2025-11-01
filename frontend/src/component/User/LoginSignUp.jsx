import { Fragment, useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import Profile from "./../../images/Profile.png";
import {
  FaceOutlined,
  LockOpenOutlined,
  MailOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, register, clearErrors } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import {
  Tab,
  Box,
  Stack,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import "./UserForm.css";

const LoginSignUp = ({ history, location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  // To control tab between login and signup
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(Profile);
  const [avatarPreview, setAvatarPreview] = useState(Profile);
  //   const [ name, email, password] = registerData;


  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", registerData.name);
    myForm.set("email", registerData.email);
    myForm.set("password", registerData.password);
    myForm.set("avatar", avatar);

    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error.error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, error, alert, history, isAuthenticated, redirect]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="login-container">
            <TabContext value={value}>
              <Box>
                <TabList
                  aria-label="Tabs Example"
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  centered
                >
                  <Tab value="1" label="Login" />
                  <Tab value="2" label="Sign Up" />
                </TabList>
              </Box>

              {/* Login Tab */}
              <TabPanel value="1">
                <form onSubmit={loginSubmit}>
                  <Stack>
                    {/* Name Field */}
                    <TextField
                      label="Email"
                      type="email"
                      size="small"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MailOutlined />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ marginBlock: "10px" }}
                      required
                    />

                    {/* Email Field */}
                    <TextField
                      label="Password"
                      type="password"
                      size="small"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOpenOutlined />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ marginBlock: "10px" }}
                      required
                    />

                    <Stack direction="row" justifyContent="end" my={1}>
                      <Link to="/password/forgot">Forgot Password</Link>
                    </Stack>

                    {/* Login Button */}
                    <Stack direction="row" justifyContent="center" mt={1}>
                      <Button variant="contained" size="small" type="submit">
                        Login
                      </Button>
                    </Stack>
                  </Stack>
                </form>
              </TabPanel>

              {/* Sigup Tab */}
              <TabPanel value="2">
                <form onSubmit={registerSubmit}>
                  <Stack>
                    {/* Sign up Name Field */}
                    <TextField
                      label="Name"
                      type="text"
                      size="small"
                      name="name"
                      value={registerData.name}
                      onChange={registerDataChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FaceOutlined />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ marginBlock: "10px" }}
                      required
                    />

                    {/* Sign up Name Field */}
                    <TextField
                      label="Email"
                      type="email"
                      name="email"
                      size="small"
                      value={registerData.email}
                      onChange={registerDataChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MailOutlined />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ marginBlock: "10px" }}
                      required
                    />

                    {/* Sign up Email Field */}
                    <TextField
                      label="Password"
                      type="password"
                      name="password"
                      size="small"
                      value={registerData.password}
                      onChange={registerDataChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOpenOutlined />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ marginBlock: "10px" }}
                      required
                    />

                    {/* Sign Up avatar Image */}
                    <Stack direction="row" id="updateProfileImage">
                      <img src={avatarPreview} alt="Avatar Preview" />
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={registerDataChange}
                      />
                    </Stack>

                    {/* sign up Button */}
                    <Stack direction="row" justifyContent="center" mt={1}>
                      <Button variant="contained" size="small" type="submit">
                        Sign Up
                      </Button>
                    </Stack>
                  </Stack>
                </form>
              </TabPanel>
            </TabContext>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;