// Temporary in-memory mock data, standing in for Supabase tables.
// Shape matches the real schema (users / posts / comments / votes) so
// swapping in real queries later should be close to a drop-in replacement.

export const mockUsers = [
  { id: 'u1', username: 'chrome_wanderer', created_at: '2026-07-01T10:00:00Z' },
  { id: 'u2', username: 'neon_static', created_at: '2026-07-02T10:00:00Z' },
  { id: 'u3', username: 'grid_runner_99', created_at: '2026-07-03T10:00:00Z' },
];

export const mockPosts = [
  {
    id: 'p1',
    author_id: 'u1',
    author_username: 'chrome_wanderer',
    title: 'Best way to route CRT scanlines without tanking framerate?',
    body: 'Running a scanline overlay as a repeating-linear-gradient on a fixed pseudo-element. Looks great but I\'m seeing jank on lower-end hardware when combined with the flicker animation. Anyone found a cheaper approach?',
    image_url: null,
    upvote_count: 14,
    accepted_comment_id: 'c2',
    created_at: '2026-07-20T14:22:00Z',
  },
  {
    id: 'p2',
    author_id: 'u2',
    author_username: 'neon_static',
    title: 'ID this synthwave grid render — mountains or city skyline base?',
    body: 'Found this in an old archive, no source attached. Trying to recreate something similar in Blender for a loop. The grid perspective looks like it\'s using a fairly steep FOV.',
    image_url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800',
    upvote_count: 9,
    accepted_comment_id: null,
    created_at: '2026-07-22T09:15:00Z',
  },
  {
    id: 'p3',
    author_id: 'u3',
    author_username: 'grid_runner_99',
    title: 'VT323 rendering blurry at small sizes — fix?',
    body: 'Pixel terminal font looks crisp at 20px+ but turns to mush under 14px on high-DPI displays. Tried disabling font-smoothing, marginal improvement.',
    image_url: null,
    upvote_count: 21,
    accepted_comment_id: null,
    created_at: '2026-07-24T18:40:00Z',
  },
];

export const mockComments = [
  {
    id: 'c1',
    post_id: 'p1',
    author_id: 'u2',
    author_username: 'neon_static',
    body: 'Try compositing the scanlines into a single static PNG/SVG background instead of an animated gradient — way cheaper than recalculating the gradient every frame.',
    created_at: '2026-07-20T15:00:00Z',
  },
  {
    id: 'c2',
    post_id: 'p1',
    author_id: 'u3',
    author_username: 'grid_runner_99',
    body: 'Second the static texture approach. Also drop the flicker to a brightness filter on a separate layer instead of stacking it with the scanline opacity — decoupling the two animations fixed my frame drops entirely.',
    created_at: '2026-07-20T16:30:00Z',
  },
  {
    id: 'c3',
    post_id: 'p2',
    author_id: 'u1',
    author_username: 'chrome_wanderer',
    body: 'Looks like a mountain silhouette to me, the peaks are too irregular for a skyline grid.',
    created_at: '2026-07-22T10:05:00Z',
  },
];

export const mockVotes = [
  { id: 'v1', post_id: 'p1', user_id: 'u2' },
  { id: 'v2', post_id: 'p1', user_id: 'u3' },
  { id: 'v3', post_id: 'p2', user_id: 'u1' },
];