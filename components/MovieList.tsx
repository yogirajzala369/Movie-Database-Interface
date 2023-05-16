"use client";
import { useState, useEffect } from "react";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Heading,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { MovieCard } from "./MovieCard";
import { Movie } from "./types";
import { ErrorPage } from "./ErrorPage";
import LoadingSpinner from "./LoadingSpinner";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=175e40c9efee881734af77cc83517860&language=en-US&page=${pageNumber}`
      );
      const data = await response.json();
      return data;
    };
    fetchMovies()
      .then((data) => setMovies(movies.concat(data.results)))
      .catch((err) => setError("Unable to fetch movies list. " + err))
      .finally(() => setIsLoading(false));
  }, [pageNumber]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorPage error={error} />
      ) : (
        <>
          <Flex flexWrap="wrap" justifyContent="center" p={8}>
            <Heading
              as="h1"
              p={10}
              color="teal.500"
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              MOVIE DATABASE INTERFACE
            </Heading>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon />}
              />
              <Input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
            {movies
              .filter((movie: Movie) =>
                movie.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((movie: Movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
          </Flex>
          <Flex justifyContent="center" alignItems="center" p={10}>
            <Button
              colorScheme="teal"
              onClick={() => setPageNumber(pageNumber + 1)}
            >
              Load more movies
            </Button>
          </Flex>
        </>
      )}
    </>
  );
}
