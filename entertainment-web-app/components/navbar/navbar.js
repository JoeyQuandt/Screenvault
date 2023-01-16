import {
  Icon,
  List,
  ListItem,
  ListIcon,
  chakra,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  MdMovieCreation,
  MdLocalMovies,
  MdWindow,
  MdTv,
  MdBookmark,
} from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  return (
    <chakra.nav
      backgroundColor="brand.mediumBlue"
      display="flex"
      alignItems="center"
      padding={{ base: "20px 24px", lg: "35px 32px" }}
      flexDirection={{ lg: "column" }}
      justifyContent="space-between"
      borderRadius={{ lg: "20px" }}
      margin={{ lg: "25px" }}
      maxW={{ lg: "96px" }}
      maxH={{ lg: "90vh" }}
      gap={{ lg: "75px" }}
      top="0"
      left="0"
      position="sticky"
      zIndex="1"
    >
      <Icon as={MdMovieCreation} color="brand.red" boxSize={10} />
      <List
        display="flex"
        flexDirection={{ lg: "column" }}
        alignItems="center"
        gap={{ sm: "32px", lg: "40px" }}
        flex={{ lg: "1" }}
      >
        <ListItem>
          <Link href="/">
            <ListIcon
              as={MdWindow}
              m="auto"
              boxSize={8}
              color={router.asPath === "/" ? "#FFFFFF" : "brand.lightBlue"}
              _hover={{
                color: "brand.red",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
            />
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/movies">
            <ListIcon
              as={MdLocalMovies}
              m="auto"
              boxSize={8}
              color={
                router.asPath === "/movies" ? "#FFFFFF" : "brand.lightBlue"
              }
              _hover={{
                color: "brand.red",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
            />
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/tv">
            <ListIcon
              m="auto"
              as={MdTv}
              boxSize={8}
              color={router.asPath === "/tv" ? "#FFFFFF" : "brand.lightBlue"}
              _hover={{
                color: "brand.red",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
            />
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/bookmark">
            <ListIcon
              m="auto"
              as={MdBookmark}
              boxSize={8}
              color={
                router.asPath === "/bookmark" ? "#FFFFFF" : "brand.lightBlue"
              }
              _hover={{
                color: "brand.red",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
            />
          </Link>
        </ListItem>
      </List>
      <Menu>
        <MenuButton>
          <Avatar name="profile" src="./oval.png" boxSize={10} />
        </MenuButton>
        <MenuList
          background="brand.mediumBlue"
          border="none"
          padding="10px"
          color="#FFFFFF"
        >
          <MenuItem
            background="transparent"
            fontWeight="300"
            _hover={{
              background: "brand.lightBlue",
            }}
          >
            Log In
          </MenuItem>
          <MenuItem
            background="transparent"
            fontWeight="300"
            _hover={{
              background: "brand.lightBlue",
            }}
          >
            View Profile
          </MenuItem>
          <MenuItem
            background="transparent"
            fontWeight="300"
            _hover={{
              background: "brand.lightBlue",
            }}
          >
            View Bookmarks
          </MenuItem>
        </MenuList>
      </Menu>
    </chakra.nav>
  );
}
