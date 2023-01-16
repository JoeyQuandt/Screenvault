import Navbar from "./navbar/navbar";
import { chakra, Box } from "@chakra-ui/react";

export default function Layout({ children }) {
  return (
    <Box display={{ lg: "flex" }}>
      <Navbar />
      <chakra.main marginTop="30px" width="100vw" paddingInline="24px">
        {children}
      </chakra.main>
    </Box>
  );
}
