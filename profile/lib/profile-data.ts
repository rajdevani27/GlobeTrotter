// Mock/local data for the GlobeTrotter profile prototype.

export const tabs = [
  { id: "profile", label: "Profile", icon: "user" },
  { id: "preferences", label: "Preferences", icon: "compass" },
  { id: "security", label: "Security", icon: "shield" },
  { id: "trips", label: "Trip History", icon: "map" },
  { id: "budget", label: "Budget Settings", icon: "wallet" },
  { id: "notifications", label: "Notifications", icon: "bell" },
  { id: "customization", label: "Customization", icon: "sliders" },
] as const

export type TabId = (typeof tabs)[number]["id"]

export const initialProfile = {
  fullName: "Aarav Sharma",
  email: "aarav.sharma@globetrotter.app",
  emailVerified: true,
  phone: "+91 98765 43210",
  avatar: "/avatar.png",
}

export const travelStyles = ["Budget", "Luxury", "Adventure", "Family", "Solo"]

export const activityOptions = ["Sightseeing", "Hiking", "Shopping", "Food Tours"]

export const languages = ["English", "Hindi", "Spanish", "French", "German", "Japanese"]

export const currencies = [
  { code: "INR", label: "INR — Indian Rupee" },
  { code: "USD", label: "USD — US Dollar" },
  { code: "EUR", label: "EUR — Euro" },
  { code: "GBP", label: "GBP — British Pound" },
]

export const activeSessions = [
  { id: 1, device: "MacBook Pro · Chrome", location: "Mumbai, IN", lastActive: "Active now", current: true },
  { id: 2, device: "iPhone 15 · Safari", location: "Mumbai, IN", lastActive: "2 hours ago", current: false },
  { id: 3, device: "iPad Air · GlobeTrotter App", location: "Pune, IN", lastActive: "Yesterday", current: false },
]

export const tripHistory = [
  { id: 1, destination: "Kyoto, Japan", dates: "Mar 12 – Mar 20, 2025", budget: "$2,340", emoji: "🏯" },
  { id: 2, destination: "Santorini, Greece", dates: "Jun 4 – Jun 11, 2025", budget: "$3,120", emoji: "🏖️" },
  { id: 3, destination: "Banff, Canada", dates: "Sep 18 – Sep 25, 2025", budget: "$1,980", emoji: "🏔️" },
]

export const savedItineraries = [
  { id: 1, title: "Iceland Ring Road", days: "7 days", stops: 9 },
  { id: 2, title: "Vietnam Street Food Tour", days: "10 days", stops: 14 },
  { id: 3, title: "Portugal Coastal Escape", days: "5 days", stops: 6 },
]

export const favoritePlaces = [
  "Cinque Terre, Italy",
  "Machu Picchu, Peru",
  "Bali, Indonesia",
  "Cape Town, South Africa",
]

export const notificationSettings = [
  { id: "trip-reminders", label: "Trip reminders", description: "Get notified before upcoming trips and check-ins.", enabled: true },
  { id: "budget-alerts", label: "Budget alerts", description: "Alerts when you approach or exceed your budget.", enabled: true },
  { id: "itinerary-suggestions", label: "New itinerary suggestions", description: "Personalized trip ideas based on your interests.", enabled: false },
  { id: "email-notifications", label: "Email notifications", description: "Receive important updates via email.", enabled: true },
  { id: "in-app-notifications", label: "In-app notifications", description: "Show notifications inside GlobeTrotter.", enabled: true },
]
