import React from "react";
import {
  Box,
  OutlinedInput,
  FormLabel,
  FormHelperText,
  OutlinedInputProps,
  FormLabelProps,
  FormHelperTextProps,
  BoxProps,
} from "@mui/material";

interface InputProps {
  id: string;
  // Label props
  label?: string;
  labelProps?: FormLabelProps;

  // Input props
  type?: HTMLInputElement["type"];
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  inputProps?: OutlinedInputProps;

  // Error props
  error?: boolean;
  helperText?: string;
  errorProps?: FormHelperTextProps;

  // Container props
  containerProps?: BoxProps;

  // Common props for convenience
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = (props) => {
  const {
    id,
    label,
    labelProps,
    inputProps,
    type,
    value,
    onChange,
    placeholder,
    error = false,
    helperText,
    errorProps,
    containerProps,
    required = false,
    disabled = false,
    fullWidth = true,
  } = props;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        width: fullWidth ? "100%" : "auto",
      }}
      {...containerProps}
    >
      {/* Label */}
      {label && (
        <FormLabel
          required={required}
          disabled={disabled}
          error={error}
          htmlFor={id}
          sx={{
            fontSize: "0.875rem",
            fontWeight: 500,
            color: error ? "error.main" : "text.primary",
            mb: 0.5,
            "&.Mui-focused": {
              color: error ? "error.main" : "primary.main",
            },
            ...labelProps?.sx,
          }}
          {...labelProps}
        >
          {label}
        </FormLabel>
      )}

      {/* Input */}
      <OutlinedInput
        type={type}
        disabled={disabled}
        error={error}
        fullWidth={fullWidth}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        sx={{
          borderRadius: 2,
          ...inputProps?.sx,
        }}
        {...inputProps}
      />

      {/* Helper Text / Error Message */}
      {helperText && (
        <FormHelperText
          error={error}
          sx={{
            mx: 0,
            ...errorProps?.sx,
          }}
          {...errorProps}
        >
          {helperText}
        </FormHelperText>
      )}
    </Box>
  );
};

export default Input;
