import { Box, Grid, Typography, Link } from "@mui/material";

const categories = [
  {
    title: "T-Shirts",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUBiELdNiNP3SKaRb45jlFDjoCPtz5B1KJb1CKLMJeVu6H7SbOg8yWRL00zsEMyPi0y_p4Md0m8cEPvLpaALvJWa3wRcMVJkWAcX2TUPaV1Mz8NwskcvUkj-MAuL74ROMCJDlJVXxJsL1p3HHsDzQej7v405ZEjoJhau7z4Phg-VXRYjdpidSbc-MKIdIUM32t63NOl4mkCVtMK6GUX3Udxpfmj__RXWk6Cmsj2KWKbjUskT7Xo6UzocGBrxzmGppgY1lLwHF9oOAX",
  },
  {
    title: "Outerwear",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuByYb9K0zb6F_PmYcWVEfea7zU87fDfePXSPUaIL53OKyla2yZXWyqud69gxXm3kO-KJtVpd4tbRpnUTdl0xlwSckqeMbkVFNuhEfDoWQ2tnVslcLAX6KYTWsME53fdtLFs1c6BFDZWtW2yPTUkIIMjRfpDCdxO-pfYqb9iKkKeXR5peXqxbpma0aZsJDoecBoTxbp23eItxgJWCKP5g8e68o6V2R_cxMTkjVqYj4dqYdxCTXkSkxrbkafLGRiq_YF92YpExuKyAWev",
  },
  {
    title: "Footwear",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7GMwgFfCORiu-KQ1hUfXWLzTdYXThXQhCjaNsLmu2lROHzrhTcPPgdsrYC7NDJ7z4hbq1QVUnsEQu_wLZTw71IszNI7RVytOozyTMAoRakVCtNh6MM2Yv8m6TTmAr9X7olU6nJENWpimygSy5QXQfdvtdLWl8DXVMDCq0vcNFPs4mRULU2GqBzSjhx7t2bcpu7Gc2JJjissL59mXHEkBbrFFTLZJcH1c8MIvId8YQPDgQjEhFceSayzOHgkMWjO2Jd2Ea5Peaf5Y1",
  },
  {
    title: "Accessories",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZMfRzzvqMN1KpitUmuq0VUteAa6bQ50NBbwSuv0O06v34eX0L2K6hNqBMHHmh5qzEKVucW1OEgSrZseQZSCnANyHWszHhWroQTHsKazJ5o1pWwDq4__9aEc1iVv4xtEDfyiOlWooyKDQFJtZbNZUPWN0fw8ErT6Emak6eFch-q53eN791dnQX-aUJZQ9ilws8dPt7LgpzppZmhTTUv5uBBxVkMcbtoxp_mMCQuFEggLfGIddWQKFT_Cq1RpvY2BsIZiJi13k2r4a_",
  },
];

const ShopByCategory = () => {
  return (
    <Box component="section" pt={10}>
      <Box sx={{ maxWidth: "1280px", mx: "auto", px: { xs: 2, sm: 3, lg: 4 } }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "text.primary", pb: 3, px: 1 }}
        >
          Shop by Category
        </Typography>

        <Grid container spacing={3} columns={12}>
          {categories.map((cat, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
              <Link href="#" underline="none">
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: 3,
                    overflow: "hidden",
                    aspectRatio: { xs: "1/1", sm: "4/3" },
                    cursor: "pointer",
                    "&:hover .image": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  {/* Background image */}
                  <Box
                    className="image"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: `url(${cat.img})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      transition: "transform 0.3s ease",
                    }}
                  />

                  {/* Dark overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      backgroundColor: "rgba(0,0,0,0.4)",
                    }}
                  />

                  {/* Text */}
                  <Box
                    sx={{
                      position: "relative",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      {cat.title}
                    </Typography>
                  </Box>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ShopByCategory;
