import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";

interface CheckoutStepperProps {
  activeStep: number;
}

const steps = ["Shipping", "Confirm Order", "Payment"];

const CheckoutStepper: React.FC<CheckoutStepperProps> = ({ activeStep }) => {
  return (
    <Box sx={{ width: "100%", px: { xs: 2, sm: 4 }, py: 3 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>
              <Typography
                variant="body2"
                fontWeight={500}
                color={index === activeStep ? "primary" : "text.secondary"}
              >
                {label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default CheckoutStepper;
