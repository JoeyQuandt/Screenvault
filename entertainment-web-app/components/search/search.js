import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { MdPanoramaPhotosphere } from "react-icons/md";
import { useRouter } from "next/router";

export default function SearchBar(props) {
  const router = useRouter();

  return (
    <InputGroup display="flex" alignItems="center" marginBlock="25px">
      <InputLeftElement>
        <Search2Icon color="white" boxSize={5} />
      </InputLeftElement>
      <Input
        type="search"
        placeholder={
          router.asPath === "/"
            ? "Search for movies or TV series"
            : `Search for ${router.asPath.replace("/", "")}`
        }
        border="none"
        fontSize={{ sm: "1rem", md: "1.5rem" }}
        fontWeight="light"
        color="#FFFFFF"
        opacity={0.5}
        _focus={{
          color: "#FFFFFF",
          caretColor: "#FC4747",
          opacity: 1,
        }}
      />
    </InputGroup>
  );
}
