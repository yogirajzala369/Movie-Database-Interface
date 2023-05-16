"use client";
import { useState, useEffect } from "react";
import { Flex, Button, Heading } from "@chakra-ui/react";
import { Movie } from "./types";
import { MovieCard } from "./MovieCard";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=175e40c9efee881734af77cc83517860&language=en-US&page=${pageNumber}`
      );
      const data = await response.json();
      setMovies(movies.concat(data.results));
    };
    fetchMovies();
  }, [pageNumber]);

  return (
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
        {movies.map((movie: Movie) => (
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
  );
}
