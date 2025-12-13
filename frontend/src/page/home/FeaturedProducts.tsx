import { ProductRecord, useProductsQuery } from "@/api/products";
import useCartStore from "@/store/cart";
import { Box, Typography, Button } from "@mui/material";

const FeaturedProducts = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { data } = useProductsQuery();
  const products = data?.products?.slice(0, 4) || [];

  const handleAddToCard = (product: ProductRecord) => {
    addToCart(product);
  };

  return (
    <Box component="section" pt={10}>
      <Box
        sx={{
          maxWidth: "1280px",
          mx: "auto",
          px: { xs: 2, sm: 3, lg: 4 },
        }}
      >
        {/* Title */}
        <Typography
          sx={{
            color: "text.primary",
            fontSize: "1.875rem", // text-3xl
            fontWeight: 700,
            letterSpacing: "-0.015em",
            pb: 3,
            px: 2,
          }}
        >
          Our Featured Picks
        </Typography>

        {/* Grid */}
        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
          }}
        >
          {products.map((product) => (
            <Box
              key={product.name}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                overflow: "hidden",
                borderRadius: "12px",
                bgcolor: "background.paper",
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                transition: "box-shadow 0.3s",
                "&:hover": {
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                },
              }}
            >
              {/* Product Image */}
              <Box
                sx={{
                  width: "100%",
                  aspectRatio: "3 / 4",
                  backgroundImage: `url(${product.images[0].url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />

              {/* Title + Price */}
              <Box
                sx={{
                  p: 2,
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "text.primary",
                    flexGrow: 1,
                  }}
                >
                  {product.name}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    color: "text.secondary",
                  }}
                >
                  ${product.price}
                </Typography>
              </Box>

              {/* Add to Cart */}
              <Box sx={{ px: 2, pb: 2 }}>
                <Button
                  fullWidth
                  sx={{
                    height: 40,
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    bgcolor: "primary.main + 20",
                    color: "primary.main",
                    "&:hover": {
                      bgcolor: "primary.main + 30",
                    },
                  }}
                  onClick={() => handleAddToCard(product)}
                >
                  Add to Cart
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default FeaturedProducts;
