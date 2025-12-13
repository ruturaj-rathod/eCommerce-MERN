import { Link } from "react-router";
import { Box, Typography, Button } from "@mui/material";

import { ROUTE_PATH } from "@/constants";

const HeroSection = () => {
  return (
    <Box component="section" pt={6}>
      <Box
        sx={{
          maxWidth: "1280px",
          mx: "auto",
          px: { xs: 2, sm: 3, lg: 4 },
        }}
      >
        <Box>
          <Box sx={{ p: { xs: 0 } }}>
            <Box
              sx={{
                minHeight: "480px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: { xs: 6, sm: 8 },
                p: 4,
                borderRadius: { sm: "12px" },
                textAlign: "center",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)),
                  url('https://lh3.googleusercontent.com/aida-public/AB6AXuCZbF6VbT7OEQJmSs6GBPAjtQJxVkE8pw_lQJXjbWt7ou4EFlhG7MkYUyUPnQLdx4cdzY6hoyU6_uhJJ13P-HTtNLgrjSoUNTW0SKOz7i4JaahRS_hpTH9azhQ_O7TNKBNNDbBmUJ6U4WTjn7JiRR_Khn2E7eMplJUl7TJd9J615It3pev-WD7gzSU8jesCXRH5Vfa2-YD6siGvNZieEI7lh0PC4FTSZmnH5HbAfcfweCrI_YmzKYD-_ZHRlQ_Bn5mC_GVkJr5K34Zo')
                `,
              }}
            >
              {/* Text Block */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  maxWidth: "640px",
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontWeight: 900,
                    lineHeight: 1.1,
                    fontSize: { xs: "2.25rem", sm: "3.75rem" }, // 4xl → 6xl
                    letterSpacing: "-0.033em",
                  }}
                >
                  Style for Every Story
                </Typography>

                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: { xs: "1rem", sm: "1.125rem" }, // base → lg
                    fontWeight: 400,
                    lineHeight: "1.6",
                  }}
                >
                  Discover our new collection of apparel and accessories
                  designed for the modern wardrobe.
                </Typography>
              </Box>

              {/* Button */}
              <Button
                component={Link}
                to={ROUTE_PATH.PRODUCTS}
                variant="contained"
                sx={{
                  minWidth: "84px",
                  maxWidth: "480px",
                  height: { xs: 40, sm: 48 },
                  px: { xs: 4, sm: 6 },
                  textTransform: "none",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  fontWeight: 700,
                  letterSpacing: "0.015em",
                  bgcolor: "primary.main",
                  color: "white",
                  borderRadius: "8px",
                  boxShadow: 3,
                  "&:hover": { bgcolor: "primary.dark", color: "common.white" },
                }}
              >
                Shop Collection
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
