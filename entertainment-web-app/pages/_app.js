import "../styles/globals.css";
import { customStyling } from "./customStyling";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customStyling}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
