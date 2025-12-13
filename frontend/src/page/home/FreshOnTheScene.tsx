import { useProductsQuery } from "@/api/products";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";

const FreshOnTheScene = () => {
  const { data } = useProductsQuery();
  const products = data?.products?.slice(4, 8) ?? [];

  return (
    <Box component="section" pt={10}>
      <Box sx={{ maxWidth: "1280px", mx: "auto", px: { xs: 2, sm: 3, lg: 4 } }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            color: "text.primary",
            pb: 3,
            px: 1,
            letterSpacing: "-0.015em",
          }}
        >
          Fresh on the Scene
        </Typography>

        <Grid container spacing={3}>
          {products.map((item) => (
            <Grid size={{ xs: 12, lg: 3, md: 4, sm: 6 }} key={item._id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  borderRadius: 3,
                  backgroundColor: "background.paper",
                  boxShadow: 1,
                  overflow: "hidden",
                  transition: "box-shadow 0.3s ease",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                {/* Image */}
                <Box
                  sx={{
                    width: "100%",
                    aspectRatio: "3 / 4",
                    backgroundImage: `url(${item.images?.[0]?.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                {/* Text content */}
                <CardContent sx={{ p: 2 }}>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      color: "text.primary",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      color: "text.secondary",
                    }}
                  >
                    ${item.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default FreshOnTheScene;
