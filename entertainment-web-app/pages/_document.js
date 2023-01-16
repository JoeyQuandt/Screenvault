import { Html, Head, Main, NextScript } from "next/document";
import { chakra } from "@chakra-ui/react";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <chakra.body backgroundColor="#10141E" height="100vh">
        <Main />
        <NextScript />
      </chakra.body>
    </Html>
  );
}
