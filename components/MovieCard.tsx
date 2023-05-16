import { Flex, Box, Image, useColorModeValue, Button } from "@chakra-ui/react";
import Link from "next/link";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { Movie } from "./types";

interface RatingProps {
  rating: number;
  numReviews: number;
}

function Rating({ rating, numReviews }: RatingProps) {
  return (
    <Box display="flex" alignItems="center">
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: "1" }}
                color={i < rating ? "teal.500" : "gray.300"}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
          }
          return <BsStar key={i} style={{ marginLeft: "1" }} />;
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} review{numReviews > 1 && "s"}
      </Box>
    </Box>
  );
}

export const MovieCard = (props: { movie: Movie }) => {
  return (
    <Flex p={10} alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        width="2xs"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        boxShadow="0px 1px 25px -5px rgb(66 129 225), 0 10px 10px -5px rgb(26 88 218 / 69%)"
        _hover={{
          boxShadow:
            "0px 1px 25px -5px rgb(66 225 143), 0 10px 10px -5px rgb(26 218 131)",
        }}
      >
        <Image
          transform="scale(1.0)"
          transition="0.3s ease-in-out"
          _hover={{
            transform: "scale(1.05)",
          }}
          src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`}
          alt={`${props.movie.title}`}
          roundedTop="lg"
        />
        <Box p="6">
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {props.movie.title}
            </Box>
          </Flex>
          <Rating
            rating={props.movie.vote_average}
            numReviews={props.movie.vote_count}
          />
          <Box color={useColorModeValue("gray.800", "white")}>
            Release date: {props.movie.release_date}
          </Box>
          <Link href={`/${props.movie.id}`}>
            <Button
              margin={2}
              as="a"
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              _hover={{ bg: "teal.300" }}
              colorScheme="blue"
              _focus={{ bg: "blue.500" }}
            >
              View more details
            </Button>
          </Link>
        </Box>
      </Box>
    </Flex>
  );
};
