import {
  Card,
  CardBody,
  Image,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  Icon,
  IconButton,
  Heading,
  useToast,
  Box,
} from "@chakra-ui/react";
import {
  MdMovieCreation,
  MdTv,
  MdCircle,
  MdBookmarkBorder,
  MdClose,
} from "react-icons/md";
import { useContext } from "react";
import { useRouter } from "next/router";
import SearchContext from "../../pages/SearchContext";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseApp";
import { addBookmark, removeBookmark } from "../../firebase/bookmark";
import useAuth from "../../hooks/useAuth";

export default function ContentCard(props) {
  const toast = useToast();
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();
  const { bookmark } = useContext(SearchContext);

  const handleRemoveBookmark = async (id) => {
    removeBookmark(id);
    toast({ title: "Bookmark deleted successfully", status: "success" });
  };

  return (
    <Card position="relative" bgColor="transparent">
      <CardBody p="0">
        <Image
          src={
            props.thumbnail
              ? `https://image.tmdb.org/t/p/w780/${props.thumbnail}`
              : "./no_image.png"
          }
          objectFit="cover"
          width="100%"
          height={{ sm: "110px", md: "140px", lg: "280px" }}
          borderRadius="8px"
          marginBottom="8px"
          _hover={{
            cursor: "pointer",
            transition: "all 0.3s ease",
            filter: "auto",
            brightness: "40%",
          }}
        />
        {router.asPath != "/bookmark" && user ? (
          <IconButton
            icon={<Icon as={MdBookmarkBorder} boxSize={5} />}
            background="rgba(16, 20, 30, 0.5)"
            borderRadius="50%"
            position="absolute"
            color="#FFFFFF"
            top="2"
            right="3"
            _hover={{
              background: "#FFFFFF",
              color: "brand.darkBlue",
            }}
            onClick={() => {
              toast({
                title: `${props.mediaType} added to bookmarklist`,
                status: "success",
                duration: 9000,
                isClosable: true,
              }),
                bookmark.some((x) => x.mediaId === props.id) === false &&
                  addBookmark(user.uid, props.id, props.mediaType);
            }}
          />
        ) : user ? (
          <IconButton
            icon={<Icon as={MdClose} boxSize={5} />}
            background="brand.red"
            borderRadius="50%"
            position="absolute"
            color="#FFFFFF"
            top="2"
            right="3"
            _hover={{
              background: "#FFFFFF",
              color: "brand.darkBlue",
            }}
            onClick={() => handleRemoveBookmark(props.firebaseID)}
          />
        ) : (
          <IconButton
            icon={<Icon as={MdBookmarkBorder} boxSize={5} />}
            background="rgba(16, 20, 30, 0.5)"
            borderRadius="50%"
            position="absolute"
            color="#FFFFFF"
            top="2"
            right="3"
            _hover={{
              background: "#FFFFFF",
              color: "brand.darkBlue",
            }}
            onClick={() => {
              toast({
                title: `Login to add ${props.mediaType} to bookmark list`,
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            }}
          />
        )}
        <Stack fontSize="0.875rem">
          <List
            display="flex"
            justifyContent="space-between"
            color="#FFFFFF"
            fontWeight="300"
            opacity="0.75"
            marginBottom="4px"
            maxWidth="105px"
          >
            <ListItem display="flex" alignItems="center" gap="5px">
              {props.release.slice(0, 4)}
              <ListIcon as={MdCircle} boxSize={1}></ListIcon>
            </ListItem>
            <ListItem display="flex" alignItems="center" gap="5px">
              <ListIcon
                marginRight="-1px"
                as={props.mediaType === "movie" ? MdMovieCreation : MdTv}
                boxSize={5}
              ></ListIcon>
              {props.mediaType}
              <ListIcon as={MdCircle} boxSize={1}></ListIcon>
            </ListItem>
            <ListItem>
              {typeof props.rating === "number"
                ? props.rating.toFixed(1)
                : props.rating}
            </ListItem>
          </List>
          <Heading
            variant="h3"
            fontWeight="500"
            fontSize={{ sm: "0.875rem", md: "1.125rem" }}
          >
            {props.title}
          </Heading>
        </Stack>
      </CardBody>
    </Card>
  );
}
