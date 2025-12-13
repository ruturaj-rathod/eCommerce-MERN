import { Link } from "react-router";
import {
  Box,
  Typography,
  Link as MuiLink,
  IconButton,
  InputBase,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";

import CartIcon from "@/component/Cart";
import { ROUTE_PATH } from "@/constants";

const Header = () => {
  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        backdropFilter: "blur(4px)",
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          maxWidth: "1280px",
          mx: "auto",
          px: { xs: 2, sm: 3, lg: 4 },
        }}
      >
        <Box
          sx={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box sx={{ width: 24, height: 24, color: "primary.main" }}>
                {/* Your SVG */}
                <svg fill="none" viewBox="0 0 48 48">
                  <g clipPath="url(#clip0_6_330)">
                    <path
                      d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                      fill="currentColor"
                      fillRule="evenodd"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6_330">
                      <rect width="48" height="48" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Box>

              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                StyleStore
              </Typography>
            </Box>

            {/* Navigation */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 3,
              }}
            >
              {["Shop", "Men", "Women", "Accessories"].map((item) => (
                <MuiLink
                  key={item}
                  href="#"
                  underline="none"
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "text.primary",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {item}
                </MuiLink>
              ))}
            </Box>
          </Box>

          {/* Right Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Search */}
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                minWidth: 160,
                maxWidth: 256,
                height: 40,
                borderRadius: "8px",
                bgcolor: "action.hover",
                px: 1,
              }}
            >
              <SearchIcon sx={{ color: "text.secondary", fontSize: 24 }} />
              <InputBase
                placeholder="Search"
                sx={{
                  ml: 1,
                  flex: 1,
                  fontSize: "0.875rem",
                }}
              />
            </Box>

            {/* Icon Buttons */}
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <IconButton
                component={Link}
                to={ROUTE_PATH.LOGIN}
                sx={{ p: 1.25 }}
              >
                <PersonOutlineIcon />
              </IconButton>
              <IconButton sx={{ p: 1.25 }}>
                <FavoriteBorderIcon />
              </IconButton>
              <CartIcon />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
