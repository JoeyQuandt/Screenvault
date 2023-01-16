import Head from "next/head";
import Layout from "../components/layout";
import { Box, SimpleGrid, Heading } from "@chakra-ui/react";
import SearchBar from "../components/search/search";
import ContentCard from "../components/contentCard/contentCard";
import SlideCard from "../components/slideCard/slideCard";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const MOVIE_API_KEY = "fa940f6d4f0f73fb45419d96bae71b25";

export async function getServerSideProps() {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/all/week?api_key=${MOVIE_API_KEY}`
  );
  const data = await res.json();
  return { props: data };
}

export default function Home(props) {
  const [width, setWidth] = useState(0);
  const carousel = useRef();
  const trendingContent = props.results;
  const trendingSlider = trendingContent.slice(0, 5);
  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <SearchBar />
        <Heading
          as="h2"
          variant="h2"
          marginBottom="16px"
          fontSize={{ md: "2rem" }}
        >
          Trending
        </Heading>
        <Box
          ref={carousel}
          as={motion.div}
          cursor="grab"
          whileTap={{ cursor: "grabbing" }}
          marginBottom="40px"
          overflow="hidden"
        >
          <Box
            as={motion.div}
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            display="flex"
            justifyContent="space-between"
            gap="16px"
          >
            {trendingSlider.map((content) => {
              return (
                <SlideCard
                  id={content.id}
                  title={content.title ? content.title : content.name}
                  release={
                    content.release_date
                      ? content.release_date
                      : content.first_air_date
                  }
                  mediaType={content.media_type}
                  thumbnail={content.backdrop_path}
                  rating={content.vote_average}
                  key={content.id}
                />
              );
            })}
          </Box>
        </Box>
        <Heading
          as="h2"
          variant="h2"
          marginBottom="16px"
          fontSize={{ md: "2rem" }}
        >
          Recommended for you
        </Heading>
        <SimpleGrid
          columns={{ sm: 2, md: 3, lg: 4 }}
          spacingX="15px"
          spacingY="16px"
          marginBottom="60px"
        >
          {trendingContent.map((content) => {
            return (
              <ContentCard
                id={content.id}
                title={content.title ? content.title : content.name}
                release={
                  content.release_date
                    ? content.release_date
                    : content.first_air_date
                }
                mediaType={content.media_type}
                thumbnail={content.backdrop_path}
                rating={content.vote_average}
                key={content.id}
              />
            );
          })}
        </SimpleGrid>
      </Layout>
    </>
  );
}
