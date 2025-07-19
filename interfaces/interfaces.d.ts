interface Meal {
  id: any;
  name: string;
  description: string;
  slug: string;
  restaurantId: string;
  price: any;
  image: string;
}

interface User {
  name: string;
  phone: string;
}
interface Restaurant {
  _id: string;
  id: string;
  name: string;
  phone: string;
  discount: string;
  ratingsAverage: string;
  photo: string;
  role: string;
  active: string;
}
interface Delivery {
  name: string;
  userID: string;
  password: string;
  passwordConfirm: string;
  restaurantId: string;
  role: string;
}

interface TrendingMovie {
  searchTerm: string;
  movie_id: number;
  title: string;
  count: number;
  poster_url: string;
}

interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  } | null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface TrendingCardProps {
  movie: TrendingMovie;
  index: number;
}
