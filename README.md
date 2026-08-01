# synthwave-bounties
# Web Development Final Project - *SynthwaveBounties*

Submitted by: **Daphne Blum**

This web app: **SynthwaveBounties is a cyberpunk bounty-board Q&A app. Think Yahoo Answers rebuilt as a synthwave computer terminal. Users claim a persistent ID, post "bounties" (questions), answer other users' bounties, upvote posts, and mark the best answer to a question they posted. The entire interface leans into a retro-terminal aesthetic: pixel/terminal typography, a CRT effect (scanlines, screen curvature, and an occasional vertical roll) that's fully user-toggleable, and a looping synthwave-rendered video backdrop on the login screen.**

Time spent: **30** hours spent in total

## Required Features

The following **required** functionality is completed:


- [x] **Web app includes a create form that allows the user to create posts**
  - Form requires users to add a post title
  - Forms should have the *option* for users to add: 
    - additional textual content
    - an image added as an external image URL
- [x] **Web app includes a home feed displaying previously created posts**
  - Web app must include home feed displaying previously created posts
  - By default, each post on the posts feed should show only the post's:
    - creation time
    - title 
    - upvotes count
  - Clicking on a post should direct the user to a new page for the selected post
- [x] **Users can view posts in different ways**
  - Users can sort posts by either:
    -  creation time
    -  upvotes count
  - Users can search for posts by title
- [x] **Users can interact with each post in different ways**
  - The app includes a separate post page for each created post when clicked, where any additional information is shown, including:
    - content
    - image
    - comments
  - Users can leave comments underneath a post on the post page
  - Each post includes an upvote button on the post page. 
    - Each click increases the post's upvotes count by one
    - Users can upvote any post any number of times

- [x] **A post that a user previously created can be edited or deleted from its post pages**
  - After a user creates a new post, they can go back and edit the post
  - A previously created post can be deleted from its post page

The following **optional** features are implemented:


- [x] Web app implements pseudo-authentication
  - Users can only edit and delete posts or delete comments by entering the secret key, which is set by the user during post creation
  - **or** upon launching the web app, the user is assigned a random user ID. It will be associated with all posts and comments that they make and displayed on them
  - For both options, only the original user author of a post can update or delete it
- [ ] Users can repost a previous post by referencing its post ID. On the post page of the new post
  - Users can repost a previous post by referencing its post ID
  - On the post page of the new post, the referenced post is displayed and linked, creating a thread
- [x] Users can customize the interface
  - e.g., selecting the color scheme or showing the content and image of each post on the home feed
- [ ] Users can add more characterics to their posts
  - Users can share and view web videos
  - Users can set flags such as "Question" or "Opinion" while creating a post
  - Users can filter posts by flags on the home feed
  - Users can upload images directly from their local machine as an image file
- [x] Web app displays a loading animation whenever data is being fetched

The following **additional** features are implemented:

* [x] Best-answer selection: the original poster can mark one comment as the accepted/best answer, which is visually highlighted and pinned to the top of the comment thread
* [x] Fully custom CRT terminal theme: scanlines, screen-curvature vignette, and an occasional vertical roll effect, bundled under a single user-toggleable "CRT FX" setting that respects OS-level reduced-motion preferences
* [x] Looping synthwave video background on the login screen, built from an original Blender render
* [x] Combinable search + sort on the home feed (search and sort filters apply together rather than being mutually exclusive)

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='/public/media/synthwave-bounties.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...
Canva

## Notes

Several of the trickiest issues weren't in the app logic itself but in the gap between local dev and a real backend:

- Missing table grants: tables created directly via SQL (rather than Supabase's Table Editor UI) didn't automatically grant the anon role permission to read/write, which surfaced as opaque "permission denied" errors until explicit GRANT statements were added.
- Stale local state after backend migration: after switching from mock in-memory data to real Supabase queries, a cached (mock-shaped) user object left over in localStorage caused malformed database queries, since the app trusted the cached shape without validating it against the live schema.
- Shared vs. isolated React state: an early version of the CRT-effect toggle used a plain custom hook called independently in multiple components, which meant each call site got its own isolated state instance instead of a shared one — clicking the toggle in the navbar wouldn't affect the overlay rendered elsewhere until a full page refresh. Fixing this required moving the preference into React Context so all consumers share one source of truth.
- CRT effect scope: the terminal aesthetic is implemented in pure CSS. True lens/barrel distortion of on-screen content (actually warping the pixels) would require SVG displacement filters or a canvas/WebGL approach, which was out of scope; the vignette-based illusion was used as a practical middle ground.
- This project is a work in progress that will be continued after CodePath. Planned further developments are:
    - Users accumulate points when their answer is chosen as the best answer.
    - Additional visuals on feed page.
    - Profile pages and photos.
    - Visual options that can be "bought" with earned points.
    - Add optional music player using uppbeat.io for immersion

- [Link to live site](https://synthwave-bounties-six.vercel.app/)

## License

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