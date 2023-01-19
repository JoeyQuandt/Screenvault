import "../styles/globals.css";
import { customStyling } from "./customStyling";
import { ChakraProvider } from "@chakra-ui/react";
import { SearchProvider } from "./SearchContext";

export default function App({ Component, pageProps }) {
  return (
    <SearchProvider>
      <ChakraProvider theme={customStyling}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SearchProvider>
  );
}
