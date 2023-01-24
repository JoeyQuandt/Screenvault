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
import useAuth from "../../hooks/useAuth";
import { auth } from "../../firebase/firebaseApp";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function Navbar() {
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();
  const handleAuth = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

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
      minH={router.asPath === "/bookmark" && { lg: "90vh" }}
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
          <Avatar
            name="profile"
            src={!isLoggedIn ? "./user.png" : user.photoURL}
            boxSize={10}
          />
        </MenuButton>
        <MenuList
          background="brand.mediumBlue"
          border="none"
          padding="10px"
          color="#FFFFFF"
        >
          {!isLoggedIn ? (
            <MenuItem
              background="transparent"
              fontWeight="300"
              _hover={{
                background: "brand.lightBlue",
              }}
              onClick={() => handleAuth()}
            >
              Sign In
            </MenuItem>
          ) : (
            <MenuItem
              background="transparent"
              fontWeight="300"
              _hover={{
                background: "brand.lightBlue",
              }}
              onClick={() => auth.signOut()}
            >
              Sign Out
            </MenuItem>
          )}
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
