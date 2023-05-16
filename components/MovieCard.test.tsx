import { render, screen } from "@testing-library/react";
import { MovieCard } from "./MovieCard";
import "@testing-library/jest-dom";

const testMovie = {
  id: 1234,
  title: "Test Movie",
  release_date: "2023-01-01",
  vote_average: 7.5,
  vote_count: 100,
  poster_path: "/test-movie-poster.jpg",
};

describe("MovieCard", () => {
  it("renders movie card correctly", () => {
    render(<MovieCard movie={testMovie} />);

    const movieTitle = screen.getByText(testMovie.title);
    const movieReleaseDate = screen.getByText(
      `Release date: ${testMovie.release_date}`
    );
    const viewMoreButton = screen.getByRole("link", {
      name: "View more details",
    });

    expect(movieTitle).toBeDefined();
    expect(movieReleaseDate).toBeDefined();
    expect(viewMoreButton).toHaveAttribute("href", `/${testMovie.id}`);
  });
});
