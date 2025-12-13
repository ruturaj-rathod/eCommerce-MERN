import { Link } from "react-router";
import { Box, Button, Typography, Paper } from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";

const NoCartItem = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        textAlign: "center",
        minHeight: "60vh",
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 8,
          borderRadius: 3,
          bgcolor: "background.paper",
          borderColor: "divider",
          maxWidth: 600,
          width: "100%",
        }}
      >
        <Box sx={{ mb: 2 }}>
          <ShoppingCartOutlined
            sx={{ fontSize: 64, color: "text.secondary", opacity: 0.5 }}
          />
        </Box>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Your cart is empty
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Looks like you haven't added anything to your cart yet.
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to={"/products"}
          sx={{
            fontWeight: "bold",
            px: 4,
            py: 1.5,
            textTransform: "none",
            borderRadius: 2,
            "&:hover": { color: "common.white" },
          }}
        >
          Continue Shopping
        </Button>
      </Paper>
    </Box>
  );
};

export default NoCartItem;
