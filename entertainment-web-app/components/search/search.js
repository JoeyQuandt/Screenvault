import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { MdPanoramaPhotosphere } from "react-icons/md";
import { useRouter } from "next/router";
import { useContext } from "react";
import SearchContext from "../../pages/SearchContext";

export default function SearchBar(props) {
  const router = useRouter();
  const { search, handleInputChange } = useContext(SearchContext);

  function handleChange(e) {
    handleInputChange(e.target.value);
  }

  return (
    <InputGroup display="flex" alignItems="center" marginBlock="25px">
      <InputLeftElement>
        <Search2Icon color="white" boxSize={5} />
      </InputLeftElement>
      <Input
        type="search"
        value={search}
        onChange={handleChange}
        placeholder={"Search for movies or TV series"}
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
