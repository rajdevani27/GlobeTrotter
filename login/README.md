# GlobeTrotter Auth Hub

Lovable Prompt — GlobeTrotter Authentication & Dashboard Module

Build only my assigned part of the GlobeTrotter project. Do not redesign, rebuild, or implement the other features of the website because those are being developed by another team member.

My Scope

I am responsible ONLY for:

Landing/Home page

Signup

Login

Authentication/session flow

Dashboard

Logout

The Create Trip, Itinerary Builder, View Trips, and other travel-planning features are NOT my responsibility. However, the Dashboard should contain navigation cards/buttons for those features as placeholders, so the other developer can connect them later.

1. Landing Page

Create a polished, modern GlobeTrotter landing page.

Include:

GlobeTrotter branding

Short welcome/hero message

Brief description of the platform

Sign Up CTA

Login CTA

Modern travel-inspired visual design

Responsive layout for desktop and mobile

The landing page should feel like part of a professional travel-planning application, not a generic authentication template.

Do NOT build the actual trip-planning functionality here.

2. Signup Page

Create a complete signup page with:

Fields

Full Name

Email

Password

Confirm Password

Client-side validation

Implement:

Name cannot be empty

Email must have valid email format

Password must satisfy a reasonable minimum length

Confirm Password must exactly match Password

Show clear validation messages

Prevent submission when validation fails

Provide loading/submission feedback

After successful signup:

Create the user account through the backend authentication system

Establish the user's authenticated session

Redirect the user to /dashboard

Include a link:

Already have an account? Login

3. Login Page

Create a professional login page with:

Email

Password

Login button

Forgot Password link

Link to Signup

Validation should happen before submission.

After successful authentication:

Redirect to /dashboard.

If authentication fails, display a clear but secure error message.

Do not expose sensitive backend/authentication information.

4. Authentication Backend

The authentication functionality should be implemented through the existing/required hidden backend module:

Module

globetrotter_auth

Structure it approximately as:

globetrotter_auth/
├── __init__.py
├── __manifest__.py
├── models/
│   ├── __init__.py
│   └── user.py
├── controllers/
│   ├── __init__.py
│   └── auth.py
├── security/
│   └── ir.model.access.csv
└── static/
    └── js/
        └── auth.js


User Model

models/user.py

Handle:

User name

Email

Password securely

Password hashing

Email validation

Appropriate uniqueness constraints for email

Never store plaintext passwords.

Authentication Controller

controllers/auth.py

Implement appropriate routes for:

/signup

/login

/logout

Also implement:

Session creation

Session validation

Redirect to /dashboard

Protection for authenticated dashboard routes

Redirect unauthenticated users back to login

Security

Use appropriate access rules in:

security/ir.model.access.csv

JavaScript

Use:

static/js/auth.js

for client-side:

Signup validation

Login validation

Password confirmation

Form handling

User-friendly validation feedback

Manifest

Keep this authentication module hidden from the main application/module listing where appropriate:

'application': False


The authentication backend should work silently behind the public-facing pages.

5. Dashboard — MY MAIN FEATURE

The Dashboard is the most important part of my assigned frontend work.

After login, the user should arrive at:

/dashboard

Display:

Header

GlobeTrotter logo/name

Greeting such as:

Welcome back, [User Name]!

Logout button

Dashboard navigation

Create attractive cards/buttons for:

Create Trip

Description:
"Start planning your next adventure."

This should be a placeholder/navigation link only. Do not implement the Create Trip functionality.

Itinerary Builder

Description:
"Build and organize your travel itinerary."

Again, only provide the navigation placeholder.

View Trips

Description:
"View and manage your saved trips."

Again, only provide the navigation placeholder.

6. Dashboard Authentication Protection

The dashboard must be protected.

If a user tries to access:

/dashboard

without being authenticated:

Redirect them to /login.

If the user is authenticated:

Display their name

Display the dashboard

Allow logout

Do not allow users to access another user's account/dashboard data.

7. Logout

Implement a real logout flow.

When the user clicks:

Logout

Destroy/invalidate the active session

Redirect to the home page /

Prevent access to /dashboard using the previous authenticated session

8. UI/UX Requirements

Make the UI look like a real modern travel product.

Design requirements:

Clean and premium

Travel-inspired

Modern typography

Strong visual hierarchy

Attractive cards

Smooth hover states

Clear CTA buttons

Proper spacing

Responsive design

Accessible form labels

Clear error/success states

Consistent design across Home, Signup, Login and Dashboard

Avoid making it look like a basic Bootstrap/authentication demo.

Use subtle travel/globe/map-inspired visual elements where appropriate, but keep the interface professional and uncluttered.

9. Important Integration Rule

Another developer is implementing:

Create Trip

Itinerary Builder

View Trips

Other travel features

Therefore:

DO NOT implement those features.

Only create the Dashboard UI/navigation placeholders required to connect to those modules later.

Keep the code modular so another developer can easily replace the placeholder routes/components with their actual features.

10. Required User Flow

Implement this flow:

Home
 ├── Sign Up
 │     └── Successful Signup
 │             └── Dashboard
 │
 └── Login
       └── Successful Login
               └── Dashboard
                       ├── Create Trip → placeholder
                       ├── Itinerary Builder → placeholder
                       ├── View Trips → placeholder
                       └── Logout
                              └── Home


Also:

Unauthenticated User
        ↓
     /dashboard
        ↓
     Redirect
        ↓
     /login


11. Important: Do Not Break Other Developers' Work

This is a shared project.

Therefore:

Do not overwrite unrelated features

Do not remove existing travel-planning components

Do not modify another developer's Create Trip/Itinerary/View Trips implementation

Keep authentication code modular

Use clearly separated components/routes

Use placeholder links only where another developer will later integrate functionality

Preserve existing project structure whenever possible

If existing components already exist, reuse the project's existing styling and architecture instead of unnecessarily replacing them.

12. Final Acceptance Criteria

The implementation is complete only when all of these work:

Home page loads

Sign Up button opens Signup

Signup validation works

User can successfully register

Password is securely hashed

Login works

Invalid login shows an appropriate error

Successful login redirects to /dashboard

Dashboard displays the authenticated user's name

Dashboard contains Create Trip placeholder

Dashboard contains Itinerary Builder placeholder

Dashboard contains View Trips placeholder

Unauthenticated users cannot access Dashboard

Logout destroys the session

Logout redirects to Home

Dashboard cannot be accessed after logout without logging in again

UI is responsive

Existing work from other developers remains untouched

Most Important Instruction

Build ONLY the GlobeTrotter authentication + Dashboard portion assigned to me. Do not build the complete GlobeTrotter website and do not implement the trip creation, itinerary generation, or saved-trip functionality.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9b8aba29-b7ab-4c20-9967-b04464091dde).

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
