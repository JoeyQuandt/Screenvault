import {
  Card,
  CardBody,
  Stack,
  List,
  ListItem,
  ListIcon,
  Icon,
  IconButton,
  Heading,
  Tag,
  useToast,
} from "@chakra-ui/react";
import {
  MdMovieCreation,
  MdTv,
  MdCircle,
  MdBookmarkBorder,
  MdPlayArrow,
} from "react-icons/md";
import { motion } from "framer-motion";

export default function SlideCard(props) {
  const toast = useToast();
  return (
    <Card
      as={motion.div}
      position="relative"
      backgroundImage={`linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.75) 100%), url(https://image.tmdb.org/t/p/original/${props.thumbnail})`}
      minHeight={["140px", "140px", "230px", "500px"]}
      minWidth={["240px", "240px", "470px", "50%"]}
      backgroundSize="cover"
      marginBottom="24px"
      borderRadius="8px"
      padding="8px"
    >
      <CardBody position="relative">
        <Stack position="absolute" bottom="5">
          <List display="flex" color="#FFFFFF" fontWeight="300" opacity="0.75">
            <ListItem display="flex" alignItems="center" gap="5px">
              {props.release.slice(0, 4)}
              <ListIcon as={MdCircle} boxSize={1}></ListIcon>
            </ListItem>
            <ListItem display="flex" alignItems="center">
              <ListIcon as={MdMovieCreation} boxSize={5}></ListIcon>
              {props.mediaType}
            </ListItem>
          </List>
          <Heading
            variant="h3"
            fontWeight="500"
            fontSize={{ sm: "0.938rem", md: "1.5rem" }}
          >
            {props.title}
          </Heading>
        </Stack>
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
              title: "TV show Added",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          }}
        />
        <Tag
          background="rgba(16, 20, 30, 0.5)"
          color="#FFFFFF"
          fontWeight="300"
          p="4px 15px"
          position="absolute"
          bottom="10"
          right="3"
        >
          {props.rating.toFixed(1)}
        </Tag>
      </CardBody>
    </Card>
  );
}
