import { useState, useMemo } from "react";
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
import { mockPosts, mockComments, mockVotes } from '../data/mockData';
import './Feed.css';

export default function Feed() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { flickerEnabled, toggle, lockedByOS } = useFlickerPreference();

    const [posts, setPosts] = useState(mockPosts);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [showCreateModal, setShowCreateModal] = useState(false);

    // TODO: replace with a real Supabase fetch + loading state once wired up

    const isLoading = false;

    const commentCountFor = (postId) => mockComments.filter((c) => c.post_id ===postId).length;

    const hasVoted = (postId) => !!user && mockVotes.some((v) => v.post_id === postId && v.user_id === user.id);

    const handleVote = (postId) => {
        if (!user) return;
        const existingIndex = mockVotes.findIndex(
            (v) => v.post_id === postId && v.user_id === user.id
        );
        if (existingIndex >= 0) {
            mockVotes.splice(existingIndex, 1);
            setPosts((prev) =>
                prev.map((p) =>
                    p.id === postId ? { ...p, upvote_count: p.upvote_count - 1 } : p
                )
            );
        } else {
            mockVotes.push({ id: `v${Date.now()}`, post_id: postId, user_id: user.id });
            setPosts((prev) => prev.map((p) => p.id === postId ? { ...p, upvote_count: p.upvote_count + 1 } : p
                )
            );
        }
    };

    const handleCreate = ({ title, body, image_url }) => {
        const newPost = {
            id: `p${Date.now()}`,
            author_id: user.id,
            author_username: user.username,
            title,
            body,
            image_url,
            upvote_count: 0,
            accepted_comment_id: null,
            created_at: new Date().toISOString(),
        };
        mockPosts.unshift(newPost);
        setPosts([...mockPosts]);
        setShowCreateModal(false);
        navigate(`/post/${newPost.id}`);
    };

    const visiblePosts = useMemo(() => {
        let result = posts.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        result = [...result].sort((a, b) => 
            sortBy === 'top' ? b.upvote_count - a.upvote_count : new Date(b.created_at) - new Date(a.created_at)
        );
        return result;
    }, [posts, searchQuery, sortBy]);

    return (
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
            ) : visiblePosts.length === 0 ? (
                <p className="empty-state">
                    NO BOUNTIES MATCH THAT QUERY. TRY A DIFFERENT SEARCH, OR POST ONE YOURSELF.
                </p>
            ) : (
                visiblePosts.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                        commentCount={commentCountFor(post.id)}
                        hasVoted={hasVoted(post.id)}
                        onVote={() => handleVote(post.id)}
                    />
                ))
            )}

            {showCreateModal && (
                <Modal title="NEW_ENTRY.EXE" onClose={() => setShowCreateModal(false)}>
                    <PostForm onSubmit={handleCreate} submit Label="POST BOUNTY" />
                </Modal> 
            )}
        </TerminalFrame>
    );
}