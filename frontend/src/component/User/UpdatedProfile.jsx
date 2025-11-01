import { Fragment, useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import Profile from "./../../images/Profile.png";
import { FaceOutlined, MailOutlined } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { PROFILE_UPDATE_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import { Stack, Button, InputAdornment, TextField, Typography } from "@mui/material";
import "./UserForm.css";

const UpdatedProfile = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(Profile);
  const [avatarPreview, setAvatarPreview] = useState(Profile);

  const updateSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);

    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      alert.error(error.error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile updated successfully");
      dispatch(loadUser());
      history.push("/account");

      dispatch({ type: PROFILE_UPDATE_RESET });
    }
  }, [dispatch, error, alert, history, user, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`Update profile`} />
          <div className="form-container">
            <Stack direction="row" justifyContent="center" mb={4}>
              <Typography
                variant="h6"
                sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.25)" }}
              >
                Update Profile
              </Typography>
            </Stack>
            <form onSubmit={updateSubmit}>
              <Stack>

                {/* Name Field */}
                <TextField
                  label="Name"
                  type="text"
                  size="small"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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

                {/* Email Field */}
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
                  sx={{ marginBlock: "10px" }}
                  required
                />

                <Stack direction="row" id="updateProfileImage" my={1}>
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={updateProfileDataChange}
                    />
                </Stack>

                {/* Submit Button */}
                <Stack direction="row" justifyContent="center" mt={1}>
                  <Button variant="contained" size="small" type="submit">
                    Update Profile
                  </Button>
                </Stack>
              </Stack>
            </form>
          </div>
          {/* <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2>Update profile</h2>
              <form
                className="updateProfileForm"
                onSubmit={updateSubmit}
              >
                <div className="updateProfileName">
                  <FaceOutlined />
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlined />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div> */}
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatedProfile;
