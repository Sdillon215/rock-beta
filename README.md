# Rock-Beta

This is a full-stack rock climbing repository app, designed as a clone of Mountain Project, built using **Next.js**, **TypeScript**, **PostgreSQL**, and **Mapbox**.

## Features

### Climbing Areas, Subareas, Crags, and Routes:
- Users can explore and view climbing areas, subareas, crags, and routes.
- Each area, subarea, crag, and route can have associated photos, which are uploaded to **Vercel Blob**.
- A **base64-encoded blur placeholder** is created using the **Plaicholder** package for a smoother loading experience.
- The image URL and base64 placeholder are stored in the **PostgreSQL** database.

### Map Integration:
- The app uses **Mapbox** to display climbing area pins on a map.
- Currently, only the climbing areas' pins are shown, but future updates will include dynamic map interaction.

## Current Technologies

- **Next.js** (App Router)
- **TypeScript**
- **TailwindCSS**
- **PostgreSQL** (with **Neon** as the provider)
- **Hasura** (for GraphQL API)
- **Vercel Blob** (for image storage)
- **Mapbox** (for map integration)
- **Plaicholder** (for base64 image placeholders)

## Future Developments

### User Authentication:
- Plan to implement user authentication, allowing users to log in and manage their climbing activities.

### Commenting on Subareas, Crags, Routes, and Images:
- Add functionality for users to comment on routes, sharing their experiences, tips, or reviews.

### Saving Routes to "To-Do" Lists:
- Users will be able to save routes to their profile's to-do list for future reference and planning.

### Other Planned Features:
- User profile page.
- Possibly integrate a "track your progress" feature for routes that users have completed.

## License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.