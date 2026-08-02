import { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import TerminalFrame from "../components/layout/TerminalFrame";
import Navbar from "../components/layout/Navbar";
import PostCard from "../components/feed/PostCard";
import SortControl from "../components/feed/SortControl";
import Modal from "../components/layout/Modal";
import PostForm from "../components/post/PostForm";
import LoadingIndicator from "../components/shared/LoadingIndicator";
import { useAuth } from "../hooks/useAuth";
import { useFlickerPreference } from "../hooks/useFlickerPreference";
import { fetchPosts, fetchUserVotes, createPost, toggleVote } from '../lib/supabaseQueries';
import './Feed.css';

export default function Feed() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { flickerEnabled, toggle, lockedByOS } = useFlickerPreference();

    const [posts, setPosts] = useState([]);
    const [votedPostIds, setVotedPostIds] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [createError, setCreateError] = useState('');
    const loadFeed = useCallback(async () => {
        setIsLoading(true);
        setLoadError('');

        const [postsResult, votesResult] = await Promise.all([
            fetchPosts(),
            user ? fetchUserVotes(user.id) : Promise.resolve({ votedPostIds: [] }),
        ]);

        if (postsResult.error) {
            setLoadError(postsResult.error);
            setIsLoading(false);
            return;
        }

        setPosts(postsResult.posts);
        setVotedPostIds(new Set(votesResult.votedPostIds));
        setIsLoading(false);
    }, [user]);

    useEffect(() => {
        loadFeed();
    }, [loadFeed]);

    const handleVote = async (postId) => {
        if (!user) return;
        const currentlyVoted = votedPostIds.has(postId);
        setPosts((prev) =>
            prev.map((p) =>
                p.id === postId ? { ...p, upvote_count: p.upvote_count + (currentlyVoted ? -1 : 1) }
                : p
            )
        );
        setVotedPostIds((prev) => {
            const next = new Set(prev);
            currentlyVoted ? next.delete(postId) : next.add(postId);
            return next;
        });

        const result = await toggleVote(postId, user.id, currentlyVoted);
        if (result.error) {
            loadFeed();
            return;
        }
        setPosts((prev) =>
            prev.map((p) =>
                p.id === postId ? { ...p, upvote_count: result.upvoteCount } : p
            )
        );
    };

    const handleCreate = async ({ title, body, image_url }) => {
        setCreateError('');
        const result = await createPost({
            authorId: user.id,
            title,
            body,
            imageUrl: image_url,
        });
        if (result.error) {
            setCreateError(result.error);
            return;
        }
        setShowCreateModal(false);
        navigate(`/post/${result.post.id}`);
    };

    const visiblePosts = useMemo(() => {
        let result = posts.filter((p) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        result = [...result].sort((a, b) =>
            sortBy === 'top' ? b.upvote_count - a.upvote_count : new Date(b.created_at) - new Date(a.created_at)
        );
        return result;
    }, [posts, searchQuery, sortBy]);

    return (
        <div className="feed-page-wrapper">
            <img
            className="feed-bg-planet"
            src="/media/feed-planet.png"
            alt="Background Planet"
            />
        
            <TerminalFrame title="FEED.EXE">
                <Navbar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    flickerEnabled={flickerEnabled}
                    onToggleFlicker={toggle}
                    flickerLocked={lockedByOS}
                />

                <div className="feed-toolbar">
                    <SortControl value={sortBy} onChange={setSortBy} />
                    <button className="btn magenta" onClick={() => setShowCreateModal(true)}>[+ NEW BOUNTY]</button>
                </div>

                {isLoading ? (
                    <LoadingIndicator label="FETCHING BOUNTIES" />
                ) : loadError ? (
                    <p className="empty-state">
                        CONNECTION ERROR: {loadError}
                        <br />
                        <button className="btn" onClick={loadFeed} style={{ marginTop: '0.75rem' }}>
                            [RETRY]
                        </button>
                    </p>
                ) : visiblePosts.length === 0 ? (
                    <p className="empty-state">
                        NO BOUNTIES MATCH THAT QUERY. TRY A DIFFERENT SEARCH, OR POST ONE YOURSELF.
                    </p>
                ) : (
                    visiblePosts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            commentCount={post.comment_count}
                            hasVoted={votedPostIds.has(post.id)}
                            onVote={() => handleVote(post.id)}
                        />
                    ))
                )}

                {showCreateModal && (
                    <Modal
                        title="NEW_ENTRY.EXE"
                        onClose={() => {
                            setShowCreateModal(false);
                            setCreateError('');
                        }}
                    >
                        {createError && <div className="form-error">! {createError}</div>}
                        <PostForm onSubmit={handleCreate} submitLabel="POST BOUNTY" />
                    </Modal>
                )}
            </TerminalFrame>
        </div>
    );
}

