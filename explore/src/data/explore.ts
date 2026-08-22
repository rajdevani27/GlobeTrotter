export type City = {
  id: string;
  name: string;
  country: string;
  region: string;
  rating: number;
  budget: "Budget" | "Moderate" | "Luxury";
  costIndex: number;
  popularity: number;
  description: string;
  image: string;
};

export type Activity = {
  id: string;
  name: string;
  city: string;
  category: "Sightseeing" | "Food" | "Adventure" | "Culture" | "Nightlife" | "Nature";
  rating: number;
  duration: number; // hours
  cost: number; // USD
  popularity: number;
  image: string;
};

const img = (q: string) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=800&q=70`;

export const cities: City[] = [
  {
    id: "paris",
    name: "Paris",
    country: "France",
    region: "Europe",
    rating: 4.8,
    budget: "Luxury",
    costIndex: 3,
    popularity: 98,
    description: "Boulevards, world-class museums and café mornings by the Seine.",
    image: img("photo-1502602898657-3e91760cbb34"),
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    region: "Asia",
    rating: 4.9,
    budget: "Moderate",
    costIndex: 2,
    popularity: 96,
    description: "Neon districts, calm shrines and the best late-night noodles.",
    image: img("photo-1540959733332-eab4deabeeaf"),
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    region: "Middle East",
    rating: 4.6,
    budget: "Luxury",
    costIndex: 3,
    popularity: 90,
    description: "Desert dunes, record-breaking skylines and endless souks.",
    image: img("photo-1512453979798-5ea266f8880c"),
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    rating: 4.7,
    budget: "Budget",
    costIndex: 1,
    popularity: 93,
    description: "Rice terraces, surf breaks and temples above the ocean.",
    image: img("photo-1537996194471-e657df975ab4"),
  },
  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    region: "Europe",
    rating: 4.7,
    budget: "Moderate",
    costIndex: 2,
    popularity: 92,
    description: "Ancient ruins, piazza life and pasta worth the queue.",
    image: img("photo-1552832230-c0197dd311b5"),
  },
  {
    id: "london",
    name: "London",
    country: "United Kingdom",
    region: "Europe",
    rating: 4.6,
    budget: "Luxury",
    costIndex: 3,
    popularity: 91,
    description: "Royal landmarks, free museums and markets in every borough.",
    image: img("photo-1513635269975-59663e0ac1ad"),
  },
  {
    id: "barcelona",
    name: "Barcelona",
    country: "Spain",
    region: "Europe",
    rating: 4.7,
    budget: "Moderate",
    costIndex: 2,
    popularity: 89,
    description: "Gaudí curves, tapas crawls and city beaches at sunset.",
    image: img("photo-1583422409516-2895a77efded"),
  },
  {
    id: "bangkok",
    name: "Bangkok",
    country: "Thailand",
    region: "Asia",
    rating: 4.5,
    budget: "Budget",
    costIndex: 1,
    popularity: 88,
    description: "Golden temples, canal rides and legendary street food.",
    image: img("photo-1508009603885-50cf7c579365"),
  },
  {
    id: "new-york",
    name: "New York",
    country: "United States",
    region: "North America",
    rating: 4.8,
    budget: "Luxury",
    costIndex: 3,
    popularity: 97,
    description: "Skyline views, Broadway nights and a neighbourhood for every mood.",
    image: img("photo-1496442226666-8d4d0e62e6e9"),
  },
  {
    id: "zurich",
    name: "Zurich",
    country: "Switzerland",
    region: "Europe",
    rating: 4.4,
    budget: "Luxury",
    costIndex: 3,
    popularity: 78,
    description: "Lakeside calm, alpine day trips and spotless old-town lanes.",
    image: img("photo-1515488764276-beab7607c1e6"),
  },
];

export const activities: Activity[] = [
  { id: "a1", name: "Louvre Museum Skip-the-Line", city: "Paris", category: "Culture", rating: 4.8, duration: 3, cost: 45, popularity: 95, image: img("photo-1499856871958-5b9627545d1a") },
  { id: "a2", name: "Seine River Dinner Cruise", city: "Paris", category: "Food", rating: 4.6, duration: 2, cost: 95, popularity: 88, image: img("photo-1431274172761-fca41d930114") },
  { id: "a3", name: "Shibuya Food Crawl", city: "Tokyo", category: "Food", rating: 4.9, duration: 4, cost: 70, popularity: 94, image: img("photo-1554797589-7241bb691973") },
  { id: "a4", name: "Mount Fuji Day Trip", city: "Tokyo", category: "Nature", rating: 4.7, duration: 10, cost: 120, popularity: 90, image: img("photo-1490806843957-31f4c9a91c65") },
  { id: "a5", name: "Desert Safari & BBQ", city: "Dubai", category: "Adventure", rating: 4.7, duration: 6, cost: 85, popularity: 92, image: img("photo-1451337516015-6b6e9a44a8a3") },
  { id: "a6", name: "Burj Khalifa Observation Deck", city: "Dubai", category: "Sightseeing", rating: 4.6, duration: 2, cost: 60, popularity: 89, image: img("photo-1518684079-3c830dcef090") },
  { id: "a7", name: "Ubud Rice Terrace Walk", city: "Bali", category: "Nature", rating: 4.8, duration: 3, cost: 25, popularity: 87, image: img("photo-1512343879784-a960bf40e7f2") },
  { id: "a8", name: "Uluwatu Sunset & Fire Dance", city: "Bali", category: "Culture", rating: 4.5, duration: 4, cost: 35, popularity: 84, image: img("photo-1518548419970-58e3b4079ab2") },
  { id: "a9", name: "Colosseum Underground Tour", city: "Rome", category: "Sightseeing", rating: 4.9, duration: 3, cost: 65, popularity: 96, image: img("photo-1552832230-c0197dd311b5") },
  { id: "a10", name: "Trastevere Pasta Workshop", city: "Rome", category: "Food", rating: 4.7, duration: 3, cost: 80, popularity: 83, image: img("photo-1595295333158-4742f28fbd85") },
  { id: "a11", name: "Tower of London Highlights", city: "London", category: "Culture", rating: 4.5, duration: 3, cost: 40, popularity: 82, image: img("photo-1529180184525-78f99adb8f2c") },
  { id: "a12", name: "Soho Pub Night Tour", city: "London", category: "Nightlife", rating: 4.3, duration: 3, cost: 50, popularity: 74, image: img("photo-1514933651103-005eec06c04b") },
  { id: "a13", name: "Sagrada Família Guided Visit", city: "Barcelona", category: "Sightseeing", rating: 4.8, duration: 2, cost: 45, popularity: 93, image: img("photo-1583422409516-2895a77efded") },
  { id: "a14", name: "Tapas & Wine Evening", city: "Barcelona", category: "Food", rating: 4.6, duration: 3, cost: 65, popularity: 85, image: img("photo-1515443961218-a51367888e4b") },
  { id: "a15", name: "Floating Market Longtail Ride", city: "Bangkok", category: "Adventure", rating: 4.4, duration: 5, cost: 30, popularity: 80, image: img("photo-1528181304800-259b08848526") },
  { id: "a16", name: "Grand Palace & Temples", city: "Bangkok", category: "Culture", rating: 4.6, duration: 4, cost: 28, popularity: 86, image: img("photo-1563492065599-3520f775eeed") },
  { id: "a17", name: "Statue of Liberty Ferry", city: "New York", category: "Sightseeing", rating: 4.5, duration: 4, cost: 35, popularity: 91, image: img("photo-1485871981521-5b1fd3805eee") },
  { id: "a18", name: "Broadway Show Night", city: "New York", category: "Nightlife", rating: 4.8, duration: 3, cost: 140, popularity: 94, image: img("photo-1516450360452-9312f5e86fc7") },
  { id: "a19", name: "Lake Zurich Cruise", city: "Zurich", category: "Nature", rating: 4.4, duration: 2, cost: 40, popularity: 70, image: img("photo-1515488764276-beab7607c1e6") },
  { id: "a20", name: "Swiss Alps Rail Excursion", city: "Zurich", category: "Adventure", rating: 4.9, duration: 9, cost: 180, popularity: 88, image: img("photo-1527668752968-14dc70a27c95") },
];

export const trips = ["European Adventure", "Goa Escape", "Japan Explorer"];
