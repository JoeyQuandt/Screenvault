import Head from "next/head";
import Layout from "../components/layout";
import ContentCard from "../components/contentCard/contentCard";
import SlideCard from "../components/slideCard/slideCard";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchContext from "./SearchContext";
import { motion } from "framer-motion";
import { useCallback, useState, useContext } from "react";
import { Box, SimpleGrid, Heading, Select, Spinner } from "@chakra-ui/react";

const MOVIE_API_KEY = "fa940f6d4f0f73fb45419d96bae71b25";

export async function getStaticProps() {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/all/week?api_key=${MOVIE_API_KEY}&page=1`
  );
  const data = await res.json();
  return { props: data };
}

export default function Home(props) {
  const { Genres } = useContext(SearchContext);
  const [width, setWidth] = useState(0);
  const [trendingContent, setTredingContent] = useState(props.results);
  const [page, setPage] = useState(2);
  const [genre, setGenre] = useState("");
  const trendingSlider = trendingContent.slice(0, 5);

  const carousel = useCallback((node) => {
    if (node !== null) {
      setWidth(node.scrollWidth - node.offsetWidth);
    }
  }, []);

  const filteredContent = trendingContent.filter((content) => {
    const contentGenres = content.genre_ids;
    if (contentGenres.includes(parseInt(genre))) {
      return content;
    }
  });

  const getMoreMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${MOVIE_API_KEY}&page=${page}`
    );
    const newMovies = await res.json();
    setTredingContent((prevTrendingContent) => [
      ...prevTrendingContent,
      ...newMovies.results,
    ]);
    setPage(page + 1);
  };

  function handleChange(event) {
    setGenre(event.target.value);
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
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
        <Select
          placeholder="Select genre"
          value={genre}
          onChange={handleChange}
          marginBottom="40px"
          maxWidth={["100%", "250px"]}
        >
          {Genres.map((item) => {
            return <option value={item.id}>{item.name}</option>;
          })}
        </Select>
        <InfiniteScroll
          className="hideScrollbar"
          dataLength={trendingContent.length}
          next={getMoreMovies}
          hasMore={true}
          loading={<Spinner size="lg" color="brand.red" />}
        >
          <SimpleGrid
            columns={{ sm: 2, md: 3, lg: 4 }}
            spacingX="15px"
            spacingY="16px"
            marginBottom="60px"
          >
            {!genre
              ? trendingContent.map((content) => {
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
                })
              : filteredContent.map((content) => {
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
        </InfiniteScroll>
      </Layout>
    </>
  );
}
