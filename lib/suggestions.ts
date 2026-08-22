export type Suggestion = {
  id: string
  name: string
  region: string
  /**
   * Optional photograph. When absent, `CardMedia` renders the design-system
   * fallback tile instead. Set this to a path under /public to use a real photo.
   */
  image?: string
  kind: 'Place' | 'Activity'
  tag: string
  duration: string
  price: string
  rating: number
}

export const suggestions: Suggestion[] = [
  {
    id: 'kyoto',
    name: 'Gion lantern walk',
    region: 'Kyoto, Japan',
    kind: 'Activity',
    tag: 'Culture',
    duration: '2 hrs',
    price: '$34',
    rating: 4.9,
  },
  {
    id: 'lisbon',
    name: 'Alfama miradouros',
    region: 'Lisbon, Portugal',
    kind: 'Place',
    tag: 'City',
    duration: 'Half day',
    price: 'Free',
    rating: 4.7,
  },
  {
    id: 'patagonia',
    name: 'Laguna de los Tres',
    region: 'El Chaltén, Argentina',
    kind: 'Activity',
    tag: 'Outdoors',
    duration: '8 hrs',
    price: '$60',
    rating: 4.9,
  },
  {
    id: 'marrakech',
    name: 'Souk spice quarter',
    region: 'Marrakech, Morocco',
    kind: 'Place',
    tag: 'Market',
    duration: '3 hrs',
    price: 'Free',
    rating: 4.6,
  },
  {
    id: 'reykjavik',
    name: 'Geothermal lagoon soak',
    region: 'Reykjanes, Iceland',
    kind: 'Activity',
    tag: 'Wellness',
    duration: '4 hrs',
    price: '$78',
    rating: 4.8,
  },
  {
    id: 'hanoi',
    name: 'Old Quarter night eats',
    region: 'Hanoi, Vietnam',
    kind: 'Activity',
    tag: 'Food',
    duration: '3 hrs',
    price: '$25',
    rating: 4.9,
  },
]

export const destinations = [
  'Kyoto, Japan',
  'Lisbon, Portugal',
  'El Chaltén, Argentina',
  'Marrakech, Morocco',
  'Reykjavík, Iceland',
  'Hanoi, Vietnam',
  'Mexico City, Mexico',
  'Tbilisi, Georgia',
]
