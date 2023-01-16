import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    red: "#FC4747",
    darkBlue: "#10141E",
    mediumBlue: "#161D2F",
    lightBlue: "#5A698F",
    white: "FFFFFF",
  },
};

export const customStyling = extendTheme({
  colors,
  fonts: {
    body: `"Outfit","sans-serif"`,
  },
  components: {
    Heading: {
      variants: {
        h1: {
          fontSize: "2rem",
          fontWeight: "light",
          color: "#FFFFFF",
        },
        h2: {
          fontSize: "1.5rem",
          fontWeight: "light",
          color: "#FFFFFF",
        },
        h2Medium: {
          fontSize: "1.5rem",
          fontWeight: "medium",
          color: "#FFFFFF",
        },
        h3: {
          fontSize: "1.125rem",
          color: "#FFFFFF",
        },
      },
    },
    Text: {
      variants: {
        medium: {
          fontSize: "0.938rem",
          fontWeight: "medium",
          color: "#FFFFFF",
        },
        light: {
          fontSize: "0.813",
          fontWeight: "light",
          color: "#FFFFFF",
        },
      },
    },
    Button: {
      variants: {
        redButton: {
          fontSize: "0.938rem",
          fontWeight: "light",
          borderRadius: "6px",
          backgroundColor: "brand.red",
          paddingInline: "6.4em",
          color: "#FFFFFF",
          paddingBlock: "1em",
          _hover: {
            bg: "white",
            transition: "all 0.3s ease",
            color: "brand.darkBlue",
          },
        },
      },
    },
    Input: {
      variants: {
        inputField: {
          field: {
            background: "transparent",
            borderRadius: "0",
            borderBottom: "1px solid #5A698F",
            _placeholder: {
              fontSize: "0.938rem",
              fontWeight: "light",
              opacity: 0.5,
            },
            _valid: {
              color: "#FFFFF",
            },
            _invalid: {
              borderBottom: "1px solid #FC4747",
            },
            _focus: {
              color: "#FFFFFF",
              caretColor: "#FC4747",
              borderBottom: "1px solid #FFFFFF",
            },
          },
        },
      },
    },
  },
});
