import React, { useState } from "react";
import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Typography,
  Link as MuiLink,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import Input from "@/component/Input";
import { loginSchema, LoginSchemaType } from "@/schema";
import { ROUTE_PATH } from "@/constants";
import { useLogin } from "@/api/auth";
import useAuthStore from "@/store/auth";

const LoginCard: React.FC = () => {
  const { login } = useAuthStore();
  const loginApi = useLogin();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data: LoginSchemaType) => {
    loginApi.mutate(data, {
      onSuccess: (data) => {
        login(data.token, data.user);
        navigate("/", { replace: true });
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          const data = error.response?.data as { error: string };
          toast.error(data?.error ?? "Something went wrong!");
        } else {
          toast("Something went wrong!");
        }
      },
    });
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      minHeight={"100vh"}
      bgcolor={"background.default"}
      p={2}
    >
      <Box
        width={1}
        maxWidth={448}
        borderRadius={3}
        overflow={"hidden"}
        border={(theme) => `1px solid ${theme.palette.divider}`}
        p={4}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              bgcolor: "primary.main",
              opacity: 0.1,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <LockIcon
              sx={{
                fontSize: 30,
                color: "primary.main",
                opacity: 1,
              }}
            />
          </Box>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 600,
              mb: 1,
            }}
          >
            Welcome back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please enter your details to sign in.
          </Typography>
        </Box>

        {/* Form Section */}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <Input
            id="email"
            label="Email Address"
            placeholder="Enter your email address"
            inputProps={{ ...register("email") }}
            error={!!errors?.email}
            helperText={errors?.email?.message}
            fullWidth
            required
          />

          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            label="Password"
            placeholder="Enter your password"
            inputProps={{
              ...register("password"),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePassword}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={!!errors?.password}
            helperText={errors?.password?.message}
            fullWidth
            required
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <MuiLink
              component={Link}
              to={ROUTE_PATH.FORGOT_PASSWORD}
              replace
              underline="hover"
              sx={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "primary.main",
              }}
            >
              Forgot password?
            </MuiLink>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: "uppercase",
              fontWeight: 700,
              letterSpacing: 1,
              fontSize: "0.875rem",
              boxShadow: 2,
              "&:hover": {
                boxShadow: 4,
              },
            }}
          >
            Sign In
          </Button>
        </Box>

        {/* Divider and Sign Up Section */}
        <Box sx={{ mt: 4 }}>
          <Divider sx={{ position: "relative" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                px: 1,
                bgcolor: "background.paper",
              }}
            >
              Don't have an account?
            </Typography>
          </Divider>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <MuiLink
              component={Link}
              to={ROUTE_PATH.REGISTER}
              replace
              underline="hover"
              sx={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "primary.main",
              }}
            >
              Create an account
            </MuiLink>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginCard;
