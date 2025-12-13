import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingSchema, ShippingSchemaType } from "@/schema";
import CheckoutStepper from "@/component/CheckoutStepper";

const ShippingPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingSchemaType>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "United States",
      billingSame: true,
    },
  });

  const onSubmit = (data: ShippingSchemaType) => {
    console.log("Form data:", data);
    setActiveStep(1);
    // Handle form submission
  };

  const handleBack = () => {
    setActiveStep(0);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", p: 2, mb: 2 }}>
          <Typography
            variant="h3"
            fontWeight={900}
            sx={{
              letterSpacing: "-0.033em",
              fontSize: { xs: "2rem", sm: "2.5rem" },
            }}
          >
            Checkout
          </Typography>
        </Box>

        <CheckoutStepper activeStep={activeStep} />

        <Paper
          elevation={3}
          sx={{
            borderRadius: 3,
            p: { xs: 3, sm: 4 },
            mt: 2,
          }}
        >
          <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
            Shipping Information
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {/* Full Name */}
              <Grid columns={{ xs: 12 }}>
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Full Name"
                      placeholder="Enter your full name"
                      error={!!errors.fullName}
                      helperText={errors.fullName?.message}
                    />
                  )}
                />
              </Grid>

              {/* Email */}
              <Grid columns={{ xs: 12, sm: 6 }}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email Address"
                      placeholder="you@example.com"
                      type="email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Grid>

              {/* Phone */}
              <Grid columns={{ xs: 12, sm: 6 }}>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Phone Number"
                      placeholder="(123) 456-7890"
                      type="tel"
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                    />
                  )}
                />
              </Grid>

              {/* Address */}
              <Grid columns={{ xs: 12 }}>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Address"
                      placeholder="123 Main Street"
                      error={!!errors.address}
                      helperText={errors.address?.message}
                    />
                  )}
                />
              </Grid>

              {/* City */}
              <Grid columns={{ xs: 12, sm: 6 }}>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="City"
                      placeholder="Anytown"
                      error={!!errors.city}
                      helperText={errors.city?.message}
                    />
                  )}
                />
              </Grid>

              {/* State */}
              <Grid columns={{ xs: 12, sm: 6 }}>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.state}>
                      <InputLabel>State / Province</InputLabel>
                      <Select {...field} label="State / Province">
                        <MenuItem value="">Select a state</MenuItem>
                        <MenuItem value="California">California</MenuItem>
                        <MenuItem value="New York">New York</MenuItem>
                        <MenuItem value="Texas">Texas</MenuItem>
                      </Select>
                      {errors.state && (
                        <FormHelperText>{errors.state.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>

              {/* ZIP */}
              <Grid columns={{ xs: 12, sm: 6 }}>
                <Controller
                  name="zip"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="ZIP / Postal Code"
                      placeholder="12345"
                      error={!!errors.zip}
                      helperText={errors.zip?.message}
                    />
                  )}
                />
              </Grid>

              {/* Country */}
              <Grid columns={{ xs: 12, sm: 6 }}>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.country}>
                      <InputLabel>Country</InputLabel>
                      <Select {...field} label="Country">
                        <MenuItem value="United States">United States</MenuItem>
                        <MenuItem value="Canada">Canada</MenuItem>
                        <MenuItem value="Mexico">Mexico</MenuItem>
                      </Select>
                      {errors.country && (
                        <FormHelperText>
                          {errors.country.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* Billing Same as Shipping */}
            <Controller
              name="billingSame"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      sx={{
                        color: "primary.main",
                        "&.Mui-checked": {
                          color: "primary.main",
                        },
                      }}
                    />
                  }
                  label="Billing address is the same as shipping"
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "0.875rem",
                      fontWeight: 500,
                    },
                  }}
                />
              )}
            />

            {/* Action Buttons */}
            <Box
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <Button
                variant="contained"
                onClick={handleBack}
                sx={{
                  bgcolor: "action.hover",
                  color: "text.primary",
                  fontWeight: 700,
                  textTransform: "none",
                  minWidth: 120,
                  px: 3,
                  py: 1.5,
                  "&:hover": {
                    bgcolor: "action.selected",
                  },
                  boxShadow: "none",
                }}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  fontWeight: 700,
                  textTransform: "none",
                  minWidth: 120,
                  px: 3,
                  py: 1.5,
                }}
              >
                Continue
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ShippingPage;
