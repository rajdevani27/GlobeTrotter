# GlobeTrotter Dashboard

Build ONLY the frontend Dashboard/Home page of a travel planning web application called GlobeTrotter.

Use the attached GlobeTrotter wireframe as the functional reference, but turn the rough wireframe into a clean, modern and polished travel website UI.

IMPORTANT — SAVE CREDITS

Do NOT build the entire application.

Do NOT build the backend.

Do NOT build Supabase.

Do NOT build authentication.

Do NOT build APIs.

Do NOT build admin pages.

Do NOT build the calendar, community, budget page or itinerary builder yet.

For this generation, focus ONLY on creating a high-quality Dashboard/Home frontend with reusable components that we can extend later.

Use mock/static data for now.

DESIGN STYLE

Make GlobeTrotter feel like a modern premium travel-planning app.

Style:

Modern

Clean

Travel-focused

Slightly Gen-Z

Premium but simple

Spacious

Mobile responsive

Easy to understand

Use a light, elegant interface with:

White/off-white background

Dark navy text

Blue/cyan primary accent

Small warm orange accent

Rounded cards

Soft shadows

Large travel images

Clean typography

Lucide icons

Subtle hover animations

Do not use excessive gradients or glassmorphism.

Do not make it look like a generic admin dashboard.

DASHBOARD STRUCTURE

Create the page in this order:

1. NAVIGATION BAR

Top navigation:

GlobeTrotter logo on the left.

Navigation links:

Dashboard

My Trips

Explore

Calendar

Community

Right side:

Notification icon

User avatar

User name

Primary button:

+ Plan New Trip

Make the navbar responsive.

On mobile, collapse navigation into a hamburger menu.

2. HERO SECTION

Create a large attractive travel hero section.

Use a high-quality travel destination image.

Text:

Plan your next adventure.

Subtitle:

Discover places, organize your itinerary and make every trip memorable.

Add a large search box:

Search destinations, cities or activities...

Add two buttons:

+ Plan New Trip

Explore Destinations

The buttons should work as frontend navigation placeholders.

3. QUICK REGION EXPLORER

Heading:

Explore the world

Small subtitle:

Find inspiration for your next journey.

Create horizontal destination/region buttons:

Europe
Asia
North America
South America
Middle East
Africa
Oceania

Each should have a small icon or visual.

Make them horizontally scrollable on mobile.

4. RECOMMENDED DESTINATIONS

Heading:

Recommended for you

Right side:

View all →

Create 4 attractive destination cards.

Use:

Paris
Tokyo
Bali
Dubai

Each card should contain:

High-quality destination image

City name

Country

Short description

Star rating

Approximate cost indicator

Heart/save icon

View button

Example:

Paris
France
⭐ 4.8
Moderate

Make the cards visually attractive.

The heart button should toggle between saved/unsaved using local frontend state.

5. UPCOMING TRIP

Create one large featured trip card.

Use mock data:

European Adventure

Paris → Rome → Zurich

12 June — 23 June

12 Days
3 Cities

Budget: ₹85,000

Estimated: ₹72,450

Add a visual progress bar showing approximately 72% planned.

Button:

View Trip

Secondary action:

Edit

This is only mock frontend functionality for now.

6. RECENT / PREVIOUS TRIPS

Heading:

Your trips

Create 3 trip cards.

Example:

European Adventure
12 Jun — 23 Jun
3 Cities
₹85,000

Goa Escape
15 Aug — 18 Aug
1 City
₹18,500

Japan Explorer
5 Oct — 14 Oct
4 Cities
₹95,000

Each card should have:

Destination image

Trip name

Dates

Number of cities

Budget

Status

View button

Use different statuses:

Upcoming
Completed
Planning

7. BUDGET HIGHLIGHT

Create a compact dashboard card titled:

Trip budget

Show:

Total Budget
₹85,000

Estimated
₹72,450

Remaining
₹12,550

Use a clean progress bar.

Add a small message:

You're within your planned budget 🎉

Do not build the full budget page yet.

This is only a dashboard summary.

8. QUICK ACTIONS

Create 3 small action cards:

Plan a Trip

Create a new multi-city itinerary.

Explore

Discover destinations and activities.

Calendar

View your upcoming travel plans.

Use attractive icons.

9. FOOTER

Create a minimal footer:

GlobeTrotter

Plan it. Explore it. Live it.

Links:

Explore
My Trips
Community
About
Privacy

MOCK DATA

Use realistic mock data only.

Do not create a backend.

Keep all mock data organized in one simple data file so it can later be replaced by Supabase.

Use TypeScript interfaces where appropriate.

COMPONENTS

Create reusable components:

Navbar
HeroSection
SearchBar
RegionSelector
DestinationCard
TripCard
BudgetSummary
QuickActionCard
Footer

Do not create unnecessary components.

Keep the code simple.

RESPONSIVE DESIGN

Make the dashboard work well on:

Desktop
Tablet
Mobile

Desktop:

Full navigation

4 destination cards where space allows

Multi-column layout

Tablet:

2-column cards

Mobile:

Single-column layout

Horizontal scrolling destination cards

Compact navbar

Full-width buttons

No horizontal overflow

INTERACTIONS

Only implement lightweight frontend interactions:

Navigation buttons

Search field UI

Save/unsave destination

Region selection

View trip buttons

Mobile menu

Hover states

Toast when a destination is saved

Do not implement backend functionality.

Do not implement complex state management.

Do not install unnecessary packages.

IMPORTANT VISUAL RULE

The uploaded wireframe is a functional reference, NOT the final visual style.

Keep its important dashboard sections:

Banner
Search
Recommended/Trending destinations
Previous trips
Trip planning action

But redesign them into a polished modern travel application.

The final page should immediately communicate:

"This is a travel planning application."

It should NOT look like an admin dashboard.

CODE QUALITY

Keep the implementation lightweight.

Avoid unnecessary dependencies.

Use Tailwind CSS and existing UI components wherever possible.

Do not generate unnecessary pages.

Do not generate backend code.

Do not generate database schemas.

Do not generate API integrations.

Only create the Dashboard frontend and its reusable components.

At the end, make sure the dashboard runs correctly with mock data and has no broken imports or obvious UI errors.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0fdf504c-d288-4898-8743-fdf040ec63eb).

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
