# GlobeTrotter Explore

Implement ONLY Screen 8: "Activity Search / City Search" in the EXISTING GlobeTrotter project.

IMPORTANT — MINIMUM CREDIT / MINIMUM CHANGES:

- Reuse the existing GlobeTrotter design system, navbar, typography, colors, buttons, cards, inputs, spacing, shadows, border radius and responsive styles already present in the project.

- DO NOT redesign the theme.

- DO NOT recreate existing components.

- DO NOT modify the Dashboard or unrelated pages.

- Reuse existing components whenever possible.

- Do NOT add Supabase, backend, authentication, APIs or external services.

- Use lightweight local mock data only.

- Do not install unnecessary packages.

GOAL:

Create a functional Explore/Search page matching Screen 8 of the provided GlobeTrotter wireframe.

PAGE HEADER:

Title: "Explore"

Subtitle: "Discover destinations and experiences for your next adventure."

MAIN SEARCH:

Create one prominent search input:

"Search cities, destinations or activities..."

Add two tabs:

1. Cities

2. Activities

The selected tab controls the displayed results.

CITIES MODE:

Show destination cards containing:

- Destination image

- City

- Country

- Rating

- Budget level

- Short description

- Save/heart button

- "View Details" button

Use these initial cities:

Paris, Tokyo, Dubai, Bali, Rome, London, Barcelona, Bangkok, New York, Zurich.

ACTIVITIES MODE:

Show activity cards containing:

- Activity image

- Activity name

- City

- Category

- Rating

- Duration

- Estimated cost

- Save/heart button

- "Add to Trip" button

Use realistic mock activities across the above cities.

FILTERS:

Keep filters simple and compact.

Cities:

- Region

- Country

- Budget

- Rating

Activities:

- Category

- Price

- Duration

- Rating

Add a Sort dropdown:

- Recommended

- Most Popular

- Highest Rated

- Lowest Price

FUNCTIONALITY:

Make the frontend actually work using local state.

1. Search filters results as the user types.

2. Cities/Activities tabs switch results.

3. Filters update results.

4. Sort updates result order.

5. Heart button toggles saved/unsaved.

6. "View Details" opens a lightweight details modal/drawer.

7. "Add to Trip" opens a small modal showing mock existing trips:

   - European Adventure

   - Goa Escape

   - Japan Explorer

8. Selecting a trip and confirming should show a success toast:

   "Activity added to your trip."

9. Add a useful empty state when no results match.

10. Add a reset-search/filter option.

DESIGN:

Use the EXISTING GlobeTrotter theme exactly.

Do not introduce any new visual style or color palette.

The page must feel like a natural continuation of the existing Dashboard.

RESPONSIVE:

- Desktop: multi-column result cards.

- Tablet: 2 columns.

- Mobile: 1 column.

- Reuse the existing mobile header/navigation.

CODE:

- Keep implementation simple and lightweight.

- Reuse existing UI components.

- Keep mock data in a single local data file.

- Avoid unnecessary abstractions.

- Avoid unnecessary dependencies.

- Do not change existing functionality.

IMPORTANT:

Before making changes, inspect the existing project structure and reuse what already exists.

Only create the missing Screen 8 components/page and the minimum supporting code required for it to work.

Do not rebuild the entire application.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4cd9f65f-718c-42c6-8693-0c3229ea9bb7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
