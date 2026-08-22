export type Category =
  | "Adventure"
  | "Sightseeing"
  | "Food"
  | "Shopping"
  | "Relaxation"
  | "Culture"
  | "Travel"

export type TravelMode = "car" | "walk" | "metro" | "flight"

export interface Trip {
  destination: string
  startDate: string
  endDate: string
  travelers: number
  budget: number
  preferences: Category[]
}

export interface Activity {
  id: string
  day: number
  time: string
  name: string
  category: Category
  location: string
  duration: string
  travelTime: string
  travelMode: TravelMode
  estimatedCost: number
}

export interface DayPlan {
  day: number
  title: string
  date: string
  activities: Activity[]
}

export interface Hotel {
  id: string
  name: string
  pricePerNight: number
  rating: number
  location: string
}

export interface Restaurant {
  id: string
  name: string
  cuisine: string
  estimatedCost: number
  location: string
}

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: "Adventure", label: "Adventure" },
  { value: "Sightseeing", label: "Sightseeing" },
  { value: "Food", label: "Food" },
  { value: "Shopping", label: "Shopping" },
  { value: "Relaxation", label: "Relaxation" },
  { value: "Culture", label: "Culture" },
  { value: "Travel", label: "Travel" },
]

export const PREFERENCES: Category[] = [
  "Adventure",
  "Sightseeing",
  "Food",
  "Shopping",
  "Relaxation",
  "Culture",
]

export const DEFAULT_TRIP: Trip = {
  destination: "Paris, France",
  startDate: "2026-09-12",
  endDate: "2026-09-17",
  travelers: 2,
  budget: 80000,
  preferences: ["Sightseeing", "Food", "Culture"],
}

export const HOTELS: Hotel[] = [
  { id: "h1", name: "Hôtel Lumière", pricePerNight: 6200, rating: 4.7, location: "Le Marais" },
  { id: "h2", name: "Riverside Boutique Stay", pricePerNight: 5400, rating: 4.5, location: "Saint-Germain" },
  { id: "h3", name: "Grand Central Suites", pricePerNight: 7800, rating: 4.8, location: "Opéra" },
  { id: "h4", name: "Cozy Latin Loft", pricePerNight: 4100, rating: 4.3, location: "Latin Quarter" },
]

export const RESTAURANTS: Restaurant[] = [
  { id: "r1", name: "Le Petit Jardin", cuisine: "French Bistro", estimatedCost: 2400, location: "Le Marais" },
  { id: "r2", name: "Sakura Ramen House", cuisine: "Japanese", estimatedCost: 1600, location: "Opéra" },
  { id: "r3", name: "Trattoria Bella", cuisine: "Italian", estimatedCost: 2100, location: "Montmartre" },
  { id: "r4", name: "Spice Route", cuisine: "Indian", estimatedCost: 1800, location: "Latin Quarter" },
]

export const BUDGET_BASELINE: Record<string, number> = {
  Flights: 15000,
  Hotels: 20000,
}

export function makeId(): string {
  return Math.random().toString(36).slice(2, 10)
}

function daysBetween(start: string, end: string): number {
  const s = new Date(start)
  const e = new Date(end)
  const diff = Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24))
  return Math.max(1, Math.min(diff + 1, 10))
}

export function formatDate(iso: string): string {
  if (!iso) return ""
  const d = new Date(iso)
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
}

export function addDays(iso: string, n: number): string {
  const d = new Date(iso)
  d.setDate(d.getDate() + n)
  return d.toISOString().slice(0, 10)
}

interface Template {
  title: string
  activities: Omit<Activity, "id" | "day" | "location">[]
}

function buildTemplates(dest: string): Template[] {
  const city = dest.split(",")[0].trim() || "the city"
  return [
    {
      title: "Arrival & City Exploration",
      activities: [
        { time: "09:00", name: `Airport → ${city} Hotel`, category: "Travel", duration: "1 hr", travelTime: "45 min", travelMode: "car", estimatedCost: 1800 },
        { time: "10:30", name: "Hotel Check-in", category: "Relaxation", duration: "30 min", travelTime: "5 min", travelMode: "walk", estimatedCost: 0 },
        { time: "12:30", name: "Welcome Lunch", category: "Food", duration: "1 hr", travelTime: "10 min", travelMode: "walk", estimatedCost: 2200 },
        { time: "14:00", name: "Landmark Tower Visit", category: "Sightseeing", duration: "2 hrs", travelTime: "25 min", travelMode: "metro", estimatedCost: 2500 },
        { time: "17:00", name: "Riverside Evening Walk", category: "Relaxation", duration: "1.5 hrs", travelTime: "12 min", travelMode: "walk", estimatedCost: 0 },
        { time: "19:30", name: "Dinner at Local Bistro", category: "Food", duration: "1.5 hrs", travelTime: "15 min", travelMode: "car", estimatedCost: 2600 },
      ],
    },
    {
      title: "Art & Culture",
      activities: [
        { time: "09:00", name: "Breakfast at Café", category: "Food", duration: "45 min", travelTime: "5 min", travelMode: "walk", estimatedCost: 900 },
        { time: "10:00", name: "Grand Museum Tour", category: "Culture", duration: "3 hrs", travelTime: "20 min", travelMode: "metro", estimatedCost: 3200 },
        { time: "13:00", name: "Lunch in the Old Town", category: "Food", duration: "1 hr", travelTime: "10 min", travelMode: "walk", estimatedCost: 1900 },
        { time: "15:00", name: "Historic District Stroll", category: "Sightseeing", duration: "2 hrs", travelTime: "18 min", travelMode: "metro", estimatedCost: 800 },
        { time: "18:00", name: "Boutique Shopping", category: "Shopping", duration: "1.5 hrs", travelTime: "12 min", travelMode: "walk", estimatedCost: 3500 },
        { time: "20:00", name: "Rooftop Dinner", category: "Food", duration: "1.5 hrs", travelTime: "15 min", travelMode: "car", estimatedCost: 3000 },
      ],
    },
    {
      title: "Adventure & Outdoors",
      activities: [
        { time: "08:30", name: "Early Breakfast", category: "Food", duration: "45 min", travelTime: "5 min", travelMode: "walk", estimatedCost: 850 },
        { time: "10:00", name: "Guided Cycling Tour", category: "Adventure", duration: "3 hrs", travelTime: "20 min", travelMode: "car", estimatedCost: 2800 },
        { time: "13:30", name: "Picnic by the Park", category: "Relaxation", duration: "1.5 hrs", travelTime: "10 min", travelMode: "walk", estimatedCost: 1200 },
        { time: "16:00", name: "Scenic Viewpoint Hike", category: "Adventure", duration: "2 hrs", travelTime: "30 min", travelMode: "metro", estimatedCost: 900 },
        { time: "19:00", name: "Street Food Evening", category: "Food", duration: "1.5 hrs", travelTime: "18 min", travelMode: "car", estimatedCost: 1500 },
      ],
    },
    {
      title: "Local Flavors & Leisure",
      activities: [
        { time: "09:30", name: "Slow Morning Brunch", category: "Food", duration: "1.5 hrs", travelTime: "8 min", travelMode: "walk", estimatedCost: 1700 },
        { time: "11:30", name: "Local Market Walk", category: "Culture", duration: "1.5 hrs", travelTime: "12 min", travelMode: "walk", estimatedCost: 1400 },
        { time: "14:00", name: "Spa & Relaxation", category: "Relaxation", duration: "2 hrs", travelTime: "20 min", travelMode: "car", estimatedCost: 4200 },
        { time: "17:00", name: "Sunset Sightseeing Cruise", category: "Sightseeing", duration: "1.5 hrs", travelTime: "15 min", travelMode: "metro", estimatedCost: 2600 },
        { time: "20:00", name: "Farewell Dinner", category: "Food", duration: "2 hrs", travelTime: "12 min", travelMode: "car", estimatedCost: 3400 },
      ],
    },
  ]
}

const AREAS = ["Le Marais", "Saint-Germain", "Opéra", "Montmartre", "Latin Quarter", "Champs-Élysées"]

export function generateItinerary(trip: Trip): DayPlan[] {
  const numDays = daysBetween(trip.startDate, trip.endDate)
  const templates = buildTemplates(trip.destination)
  const city = trip.destination || "your destination"

  const days: DayPlan[] = []
  for (let i = 0; i < numDays; i++) {
    const template = templates[i % templates.length]
    const day = i + 1
    const activities: Activity[] = template.activities.map((a, idx) => ({
      ...a,
      id: makeId(),
      day,
      location: idx === 0 && a.category === "Travel" ? city : `${AREAS[(i + idx) % AREAS.length]}, ${city.split(",")[0]}`,
    }))
    days.push({
      day,
      title: template.title,
      date: addDays(trip.startDate, i),
      activities,
    })
  }
  return days
}

export function categoryTotals(days: DayPlan[]): Record<string, number> {
  const totals: Record<string, number> = { Flights: 0, Hotels: 0, Food: 0, Activities: 0, Shopping: 0 }
  for (const day of days) {
    for (const a of day.activities) {
      if (a.category === "Travel") totals.Flights += a.estimatedCost
      else if (a.category === "Food") totals.Food += a.estimatedCost
      else if (a.category === "Shopping") totals.Shopping += a.estimatedCost
      else totals.Activities += a.estimatedCost
    }
  }
  return totals
}
