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
  MdPlayArrow,
} from "react-icons/md";
import { useContext } from "react";
import { useRouter } from "next/router";
import SearchContext from "../../pages/SearchContext";

export default function ContentCard(props) {
  const toast = useToast();
  const { addToBookMarkList } = useContext(SearchContext);
  return (
    <Card position="relative">
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
              title: `${props.mediaType} Added`,
              status: "success",
              duration: 9000,
              isClosable: true,
            }),
              addToBookMarkList(props.id, props.mediaType);
          }}
        />
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
