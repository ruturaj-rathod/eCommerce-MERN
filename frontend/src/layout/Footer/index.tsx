import { Link } from "react-router";
import {
  Box,
  Typography,
  Grid,
  Link as MuiLink,
  Stack,
  Divider,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

import { ROUTE_PATH } from "@/constants";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 12,
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        py: 6,
      }}
    >
      <Box maxWidth="lg" sx={{ mx: "auto", px: { xs: 2, sm: 4 } }}>
        {/* Top Grid */}
        <Grid container spacing={4}>
          {/* Logo Section */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ width: 30, color: "primary.main" }}>
                {/* Your SVG Logo */}
                <svg
                  viewBox="0 0 48 48"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" />
                </svg>
              </Box>

              <Typography variant="h6" fontWeight="bold">
                StyleStore
              </Typography>
            </Stack>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Quality apparel for the modern individual.
            </Typography>
          </Grid>

          {/* About Us */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              sx={{ textTransform: "uppercase" }}
            >
              About Us
            </Typography>

            <Stack spacing={1} sx={{ mt: 2 }}>
              {["Our Story", "Careers", "Press"].map((item) => (
                <MuiLink
                  component={Link}
                  key={item}
                  to={ROUTE_PATH.ABOUT}
                  underline="none"
                  color="text.secondary"
                  sx={{
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {item}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          {/* Help & Support */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              sx={{ textTransform: "uppercase" }}
            >
              Help & Support
            </Typography>

            <Stack spacing={1} sx={{ mt: 2 }}>
              {["Contact Us", "Shipping", "Returns", "FAQ"].map((item) => (
                <MuiLink
                  component={Link}
                  key={item}
                  to={ROUTE_PATH.CONTACT}
                  underline="none"
                  color="text.secondary"
                  sx={{
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {item}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          {/* Legal */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              sx={{ textTransform: "uppercase" }}
            >
              Legal
            </Typography>

            <Stack spacing={1} sx={{ mt: 2 }}>
              {["Terms of Service", "Privacy Policy"].map((item) => (
                <MuiLink
                  key={item}
                  href="#"
                  underline="none"
                  color="text.secondary"
                  sx={{
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {item}
                </MuiLink>
              ))}
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Divider sx={{ my: 4 }} />

        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" color="text.secondary">
            © 2024 StyleStore. All rights reserved.
          </Typography>

          <Stack direction="row" spacing={3}>
            <MuiLink
              href="#"
              color="text.secondary"
              sx={{ "&:hover": { color: "primary.main" } }}
            >
              <TwitterIcon />
            </MuiLink>
            <MuiLink
              href="#"
              color="text.secondary"
              sx={{ "&:hover": { color: "primary.main" } }}
            >
              <FacebookIcon />
            </MuiLink>
            <MuiLink
              href="#"
              color="text.secondary"
              sx={{ "&:hover": { color: "primary.main" } }}
            >
              <InstagramIcon />
            </MuiLink>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
