"use client";
import { Cast, Crew, MovieDetails } from "@/components/types";
import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { ErrorPage } from "@/components/ErrorPage";
import Link from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";
import LoadingSpinner from "@/components/LoadingSpinner";

interface pageProps {
  params: { movieId: number };
}

export default function page({ params }: pageProps) {
  const [movieCast, setMovieCast] = useState([]);
  const [movieCrew, setMovieCrew] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState<MovieDetails>();
  const [error, setError] = useState("");
  const crewRoles = [
    "Directors",
    "Assistant Director Trainee",
    "Producer",
    "Executive Producers",
  ];

  const movieCrewInfo = (field: string) => {
    return (
      movieCrew
        ?.filter((crew: Crew) => crew.job === field)
        .map((crew: Crew) => crew.name)
        .join(", ") || "-"
    );
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const detailsRes = await fetch(
        `https://api.themoviedb.org/3/movie/${params.movieId.toString()}?api_key=175e40c9efee881734af77cc83517860&language=en-US`
      );
      const details = await detailsRes.json();
      return details;
    };
    const fetchCastCrew = async () => {
      const castcrewRes = await fetch(
        `https://api.themoviedb.org/3/movie/${params.movieId.toString()}/credits?api_key=175e40c9efee881734af77cc83517860&language=en-US`
      );
      const data = await castcrewRes.json();
      return data;
    };
    fetchDetails()
      .then((details) => setMovieDetails(details))
      .catch((err) => setError("Unable to fetch movie details. " + err))
      .finally(() => setIsLoading(false));
    fetchCastCrew()
      .then((data) => {
        setMovieCast(data.cast);
        setMovieCrew(data.crew);
      })
      .catch((err) =>
        setError("Unable to fetch crew and cast details. " + err)
      );
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorPage error={error} />
      ) : (
        <Container maxW={"8xl"}>
          <SimpleGrid
            columns={1}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}
          >
            <Link href="/">
              <ChakraLink
                fontSize="lg"
                fontWeight="bold"
                color="teal.500"
                textDecoration="underline"
                _hover={{
                  textDecoration: "none",
                  color: "teal.600",
                }}
              >
                Back to movie list
              </ChakraLink>
            </Link>
            <Flex>
              <Image
                rounded={"md"}
                alt={"Movie Poster"}
                src={`https://image.tmdb.org/t/p/w500${movieDetails?.backdrop_path}`}
                fit={"cover"}
                align={"center"}
              />
            </Flex>
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box as={"header"}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                >
                  {movieDetails?.title}
                </Heading>
              </Box>
              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={"column"}
                divider={
                  <StackDivider
                    borderColor={useColorModeValue("gray.200", "gray.600")}
                  />
                }
              >
                <VStack spacing={{ base: 4, sm: 6 }}>
                  <Text fontSize={"lg"}>{movieDetails?.overview}</Text>
                </VStack>
                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={useColorModeValue("yellow.500", "yellow.300")}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Cast
                  </Text>
                  <SimpleGrid columns={{ base: 2, md: 2 }} spacing={4}>
                    <UnorderedList spacing={2}>
                      {movieCast
                        ?.slice(0, Math.ceil(movieCast?.length / 2))
                        .map((cast: Cast) => (
                          <ListItem key={cast.id}>
                            {cast.name} as {cast.character}
                          </ListItem>
                        ))}
                    </UnorderedList>
                    <UnorderedList spacing={2}>
                      {movieCast
                        ?.slice(Math.ceil(movieCast?.length / 2))
                        .map((cast: Cast) => (
                          <ListItem key={cast.id}>
                            {cast.name} as {cast.character}
                          </ListItem>
                        ))}
                    </UnorderedList>
                  </SimpleGrid>
                </Box>
                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={useColorModeValue("yellow.500", "yellow.300")}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Crew
                  </Text>
                  <SimpleGrid columns={1} spacing={4}>
                    <List spacing={2}>
                      <>
                        {crewRoles.map((role: string) => {
                          return (
                            <ListItem>
                              <Text as={"span"} fontWeight={"bold"}>
                                {role}:
                              </Text>{" "}
                              {movieCrewInfo(role)}
                            </ListItem>
                          );
                        })}
                      </>
                    </List>
                  </SimpleGrid>
                </Box>
                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={useColorModeValue("yellow.500", "yellow.300")}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Movie Details
                  </Text>
                  <List spacing={2}>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Release Date:
                      </Text>{" "}
                      {movieDetails?.release_date}
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Genres:
                      </Text>{" "}
                      {movieDetails?.genres
                        ?.map((genre) => genre.name)
                        .join(", ")}
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Budget:
                      </Text>{" "}
                      {movieDetails?.budget}
                    </ListItem>

                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Spoken Languages:
                      </Text>{" "}
                      {movieDetails?.spoken_languages
                        ?.map((lang) => lang.name)
                        .join(", ")}
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Status:
                      </Text>{" "}
                      {movieDetails?.status}
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Production Countries:
                      </Text>{" "}
                      {movieDetails?.production_countries
                        ?.map((country) => country.name)
                        .join(", ")}
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Production Companies:
                      </Text>{" "}
                      {movieDetails?.production_companies
                        ?.map((company) => company.name)
                        .join(", ")}
                    </ListItem>
                  </List>
                </Box>
              </Stack>
            </Stack>
          </SimpleGrid>
        </Container>
      )}
    </>
  );
}
