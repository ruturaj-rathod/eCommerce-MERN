import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Dialog,
  DialogTitle,
  DialogActions,
  Stack,
  Avatar,
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import useCartStore from "@/store/cart";

import NoCartItem from "./NoCartItem";
import CartBreadcrumbs from "./CartBreadcrumbs";

const CartPage = () => {
  const navigate = useNavigate();
  const {
    cart: cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart,
    cartTotal,
  } = useCartStore();

  const [removeDialog, setRemoveDialog] = useState(false);
  const [removeConfirm, setRemoveConfirm] = useState("");
  const [removeId, setRemoveId] = useState<string | null>(null);

  const handleIncreaseQuantity = (
    id: string,
    quantity: number,
    stock: number
  ) => {
    if (stock <= quantity) {
      return;
    }
    increaseQty(id);
  };

  const handleDecreaseQuantity = (id: string, quantity: number) => {
    if (1 >= quantity) {
      return;
    }
    decreaseQty(id);
  };

  const removeItem = (id: string) => {
    setRemoveDialog(true);
    setRemoveId(id);
  };

  const handleRemoveConfirm = (log: string) => {
    if (log === "yes") {
      setRemoveConfirm("yes");
    } else {
      setRemoveConfirm("no");
      setRemoveId(null);
    }
    setRemoveDialog(false);
  };

  const checkOutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  useEffect(() => {
    if (removeConfirm === "yes" && removeId) {
      removeFromCart(removeId);
      setRemoveId(null);
      setRemoveConfirm("");
    }
  }, [removeConfirm, removeId, removeFromCart]);

  if (cartItems.length === 0) {
    return <NoCartItem />;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Box sx={{ mb: 3 }}>
        <CartBreadcrumbs />
      </Box>

      {/* Title */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          fontWeight="900"
          sx={{
            letterSpacing: "-0.025em",
            color: "text.primary",
          }}
        >
          Shopping Cart
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {/* Cart Items */}
        <Box sx={{ flex: { xs: "1 1 100%", lg: "1 1 0" }, minWidth: 0 }}>
          <Stack spacing={3}>
            <TableContainer
              component={Paper}
              variant="outlined"
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                borderColor: "divider",
                boxShadow: "none",
              }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="shopping cart table">
                <TableHead sx={{ bgcolor: "background.default" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, minWidth: 250 }}>
                      Product
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>
                      Price
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>
                      Quantity
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>
                      Total
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item: any) => (
                    <TableRow
                      key={item._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Avatar
                            variant="rounded"
                            src={
                              item.images && item.images.length > 0
                                ? item.images[0].url
                                : ""
                            }
                            alt={item.name}
                            sx={{ width: 64, height: 64 }}
                          />
                          <Typography
                            variant="subtitle1"
                            fontWeight="medium"
                            color="text.primary"
                          >
                            {item.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ color: "text.secondary" }}
                      >
                        ₹{item.price}
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleDecreaseQuantity(item._id, item.quantity)
                            }
                            sx={{
                              bgcolor: "action.hover",
                              "&:hover": { bgcolor: "action.selected" },
                            }}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <TextField
                            value={item.quantity}
                            size="small"
                            inputProps={{
                              style: {
                                textAlign: "center",
                                padding: "4px",
                                width: "32px",
                              },
                              readOnly: true,
                            }}
                            variant="outlined"
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 1,
                                height: 32,
                              },
                            }}
                          />
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleIncreaseQuantity(
                                item._id,
                                item.quantity,
                                item.stock
                              )
                            }
                            sx={{
                              bgcolor: "action.hover",
                              "&:hover": { bgcolor: "action.selected" },
                            }}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: "medium" }}>
                        ₹{item.price * item.quantity}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => removeItem(item._id)}
                          sx={{
                            color: "text.secondary",
                            "&:hover": { color: "error.main" },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate("/products")}
                sx={{
                  bgcolor: "action.hover",
                  color: "text.primary",
                  fontWeight: "bold",
                  textTransform: "none",
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor: "action.selected",
                    boxShadow: "none",
                  },
                }}
              >
                Continue Shopping
              </Button>
            </Box>
          </Stack>
        </Box>

        {/* Order Summary */}
        <Box sx={{ flex: { xs: "1 1 100%", lg: "0 0 350px" } }}>
          <Box sx={{ position: "sticky", top: 100 }}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 3,
                borderColor: "divider",
                boxShadow: "none",
                p: 1,
              }}
            >
              <CardContent
                sx={{ display: "flex", flexDirection: "column", gap: 3 }}
              >
                <Typography variant="h6" fontWeight="bold">
                  Order Summary
                </Typography>

                <Stack spacing={1.5}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Subtotal
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      ₹{cartTotal}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Shipping
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Calculated next step
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Taxes
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Calculated next step
                    </Typography>
                  </Box>
                </Stack>

                <Divider />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <Typography variant="body1" fontWeight="bold">
                    Order Total
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    ₹{cartTotal}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  onClick={checkOutHandler}
                  sx={{
                    fontWeight: "bold",
                    textTransform: "none",
                    py: 1.5,
                    boxShadow: "none",
                    "&:hover": {
                      boxShadow: "none",
                    },
                  }}
                >
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>

      {/* Remove Dialog */}
      <Dialog
        open={removeDialog}
        onClose={() => setRemoveDialog(false)}
        aria-labelledby="remove-dialog-title"
      >
        <DialogTitle id="remove-dialog-title">
          Are you sure you want to remove this item from the cart?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => handleRemoveConfirm("no")} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={() => handleRemoveConfirm("yes")}
            color="error"
            variant="contained"
            autoFocus
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CartPage;
