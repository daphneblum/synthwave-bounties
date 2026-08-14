# SynthwaveBounties 🚀

## Project Overview

SynthwaveBounties is a cyberpunk-themed Q&A application designed to mimic the aesthetic and functionality of old computer terminals. It functions as a bounty-board where users can post questions (bounties), answer others, upvote content, and designate the best answer. The application features a distinct retro-terminal interface with pixel typography, a customizable CRT effect (scanlines, curvature, screen roll), and a synthwave video backdrop on the login screen.

## Features ✨

-   **Bounty Posting:** Create posts with a title, optional details, and an external image URL.
-   **Home Feed:** View a feed of all posted bounties, displaying creation time, title, and upvote count.
-   **Post Interaction:** Click on a post to view its full details, including content, image, and comments.
-   **Commenting System:** Users can leave answers (comments) on bounty posts.
-   **Upvoting:** Users can upvote posts any number of times.
-   **Sorting & Filtering:** Sort posts by creation time or upvotes, and search by title.
-   **Post Editing & Deletion:** Original authors can edit or delete their posts.
-   **Pseudo-Authentication:** Users are assigned a persistent ID upon first use, allowing them to manage their posts and comments.
-   **Best Answer Selection:** The original poster can mark one comment as the accepted/best answer.
-   **Customizable CRT Theme:** A toggleable CRT effect with scanlines, vignette, and occasional screen roll, respecting OS reduced-motion settings.
-   **Synthwave Login Screen:** Features a looping synthwave video background.
-   **Loading Indicators:** Displays animations while data is being fetched.

## Tech Stack 💻

-   **Frontend:** React, React Router DOM
-   **Styling:** CSS
-   **Backend/Database:** Supabase (via `@supabase/supabase-js`)
-   **Build Tool:** Vite
-   **Linting:** Oxlint
-   **TypeScript Support:** `@types/react`, `@types/react-dom`

## Installation 🛠️

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/daphneblum/synthwave-bounties.git
    cd synthwave-bounties
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add your Supabase project details:
    ```env
    VITE_SUPABASE_URL=YOUR_SUPABASE_URL
    VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_ANON_KEY
    ```
    Replace `YOUR_SUPABASE_URL` and `YOUR_SUPABASE_ANON_KEY` with your actual Supabase credentials.

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

## Usage 💡

1.  **Access the Application:** Open your browser and navigate to the local development server address (usually `http://localhost:5173`).

2.  **Login/Connect:**
    *   Upon first visit, you will be presented with a login screen. Enter a desired username and click 'CONNECT'. A new user ID will be claimed for you.
    *   If you have a previous ID, enter it to reconnect.

3.  **Navigating the Feed:**
    *   The main feed displays available bounties. You can search for specific bounties using the search bar in the navbar.
    *   Use the 'Sort' options (`NEWEST`, `TOP VOTED`) to reorder the feed.
    *   Click the `[+ NEW BOUNTY]` button to create a new post.

4.  **Viewing and Interacting with a Bounty:**
    *   Click on any bounty card in the feed to view its detailed page.
    *   On the post detail page, you can:
        *   Upvote the bounty (your vote is indicated).
        *   View the bounty's description, image (if any), and existing answers.
        *   If you are the author of the bounty, you can edit or delete it.
        *   If you are logged in, you can submit an answer using the `CommentComposer` below the post.
        *   The original poster can mark an answer as the 'BEST ANSWER'.
        *   Authors can delete their own answers.

5.  **CRT Effect Toggle:**
    *   Use the 'CRT FX: ON/OFF' button in the navbar to enable or disable the retro terminal visual effects.

## Project Structure 📂

```
synthwave-bounties/
├── public/
│   └── media/
├── src/
│   ├── components/
│   │   ├── feed/
│   │   ├── layout/
│   │   ├── post/
│   │   └── shared/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── styles/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css (implied by theme.css)
├── .env (example)
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Contributing 🤝

Contributions are welcome! Please follow these guidelines:

1.  Fork the repository.
2.  Create a new branch for your feature (`git checkout -b feature/your-feature-name`).
3.  Make your changes and commit them (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/your-feature-name`).
5.  Open a Pull Request.

## License 📄

This project is licensed under the Apache License, Version 2.0.

```
Copyright 2026 Daphne Blum
Favicon by rawpixel.com

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

## Important Links 🔗

-   **Live Demo:** [https://synthwave-bounties-six.vercel.app/](https://synthwave-bounties-six.vercel.app/)

## Footer 👣

© 2026 SynthwaveBounties | Built with ❤️ by Daphne Blum

[GitHub Repository](https://github.com/daphneblum/synthwave-bounties)


---
**<p align="center">Generated by [ReadmeCodeGen](https://www.readmecodegen.com/)</p>**