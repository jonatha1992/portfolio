Deploy portfolio to Firebase

This plan outlines the steps to deploy the React portfolio application to Firebase Hosting.

## User Requirements
- Deploy the current project to Firebase.
- Target project: `portfolio-correa-jonathan` (implied from `portfolio-correa-jonathan.web.app`).

## Pre-requisites Verified
- Firebase CLI installed (v14.20.0).
- User logged in (projects listed).
- Project is a Vite React app.

## Proposed Steps

1.  **Project Verification**
    - [ ] Confirm access to `portfolio-correa-jonathan` project.

2.  **Configuration**
    - [ ] Create/Update `firebase.json` to configure hosting (public directory: `dist`).
    - [ ] Create/Update `.firebaserc` to set the default project to `portfolio-correa-jonathan`.

3.  **Build**
    - [ ] Run `npm run build` to generate the production build in `dist/`.

4.  **Deploy**
    - [ ] Run `firebase deploy` to push the application.

5.  **Verification**
    - [ ] Verify deployment at `https://portfolio-correa-jonathan.web.app`.
