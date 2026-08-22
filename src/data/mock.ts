import parisImg from "@/assets/dest-paris.jpg";
import tokyoImg from "@/assets/dest-tokyo.jpg";
import baliImg from "@/assets/dest-bali.jpg";
import dubaiImg from "@/assets/dest-dubai.jpg";
import europeTripImg from "@/assets/trip-europe.jpg";
import goaTripImg from "@/assets/trip-goa.jpg";
import japanTripImg from "@/assets/trip-japan.jpg";

export interface Destination {
  id: string;
  city: string;
  country: string;
  description: string;
  rating: number;
  cost: "Budget" | "Moderate" | "Premium";
  image: string;
}

export interface Trip {
  id: string;
  name: string;
  dates: string;
  cities: number;
  budget: number;
  status: "Upcoming" | "Completed" | "Planning";
  image: string;
}

export interface Region {
  id: string;
  name: string;
  emoji: string;
}

export interface UpcomingTrip {
  name: string;
  route: string;
  dates: string;
  days: number;
  cities: number;
  budget: number;
  estimated: number;
  progress: number;
  image: string;
}

export const currentUser = {
  name: "Aarav Mehta",
  initials: "AM",
};

export const regions: Region[] = [
  { id: "europe", name: "Europe", emoji: "🏰" },
  { id: "asia", name: "Asia", emoji: "🏯" },
  { id: "north-america", name: "North America", emoji: "🗽" },
  { id: "south-america", name: "South America", emoji: "🏔️" },
  { id: "middle-east", name: "Middle East", emoji: "🕌" },
  { id: "africa", name: "Africa", emoji: "🦁" },
  { id: "oceania", name: "Oceania", emoji: "🏝️" },
];

export const destinations: Destination[] = [
  {
    id: "paris",
    city: "Paris",
    country: "France",
    description: "Art, cafés and golden evenings along the Seine.",
    rating: 4.8,
    cost: "Moderate",
    image: parisImg,
  },
  {
    id: "tokyo",
    city: "Tokyo",
    country: "Japan",
    description: "Neon streets, quiet shrines and unreal food.",
    rating: 4.9,
    cost: "Premium",
    image: tokyoImg,
  },
  {
    id: "bali",
    city: "Bali",
    country: "Indonesia",
    description: "Rice terraces, surf breaks and slow mornings.",
    rating: 4.7,
    cost: "Budget",
    image: baliImg,
  },
  {
    id: "dubai",
    city: "Dubai",
    country: "UAE",
    description: "Skyline views, desert dunes and late-night souks.",
    rating: 4.6,
    cost: "Premium",
    image: dubaiImg,
  },
];

export const upcomingTrip: UpcomingTrip = {
  name: "European Adventure",
  route: "Paris → Rome → Zurich",
  dates: "12 June — 23 June",
  days: 12,
  cities: 3,
  budget: 85000,
  estimated: 72450,
  progress: 72,
  image: europeTripImg,
};

export const trips: Trip[] = [
  {
    id: "europe",
    name: "European Adventure",
    dates: "12 Jun — 23 Jun",
    cities: 3,
    budget: 85000,
    status: "Upcoming",
    image: europeTripImg,
  },
  {
    id: "goa",
    name: "Goa Escape",
    dates: "15 Aug — 18 Aug",
    cities: 1,
    budget: 18500,
    status: "Completed",
    image: goaTripImg,
  },
  {
    id: "japan",
    name: "Japan Explorer",
    dates: "5 Oct — 14 Oct",
    cities: 4,
    budget: 95000,
    status: "Planning",
    image: japanTripImg,
  },
];

export const budgetSummary = {
  total: 85000,
  estimated: 72450,
  get remaining() {
    return this.total - this.estimated;
  },
};

export const formatINR = (value: number) => `₹${value.toLocaleString("en-IN")}`;
