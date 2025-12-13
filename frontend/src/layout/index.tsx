import { Outlet } from "react-router";
import { Box } from "@mui/material";

import Header from "./Header";
import Footer from "./Footer";
// import Navbar from "@/component/layout/Header/Navbar";

const AppLayout = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Box
        position="relative"
        display="flex"
        flexDirection={"column"}
        height={1}
        width={1}
        minHeight={"100vh"}
        overflow={"hidden"}
      >
        <Header />
        <Box flexGrow={1} component={"main"} px={1}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default AppLayout;
