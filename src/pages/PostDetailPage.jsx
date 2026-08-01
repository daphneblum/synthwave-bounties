import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TerminalFrame from '../components/layout/TerminalFrame';
import Navbar from '../components/layout/Navbar';
import PostDetail from '../components/post/PostDetail';
import CommentThread from '../components/post/CommentThread';
import CommentComposer from '../components/post/CommentComposer';
import Modal from '../components/layout/Modal';
import PostForm from '../components/post/PostForm';
import ConfirmDialog from '../components/shared/ConfirmDialog';
import LoadingIndicator from '../components/shared/LoadingIndicator';
import { useAuth } from '../hooks/useAuth';
import { useFlickerPreference } from '../hooks/useFlickerPreference';
import { fetchPostById, fetchComments, fetchUserVotes, toggleVote, updatePost, deletePost, createComment, setAcceptedComment, } from '../lib/supabaseQueries';

export default function PostDetailPage() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { flickerEnabled, toggle, lockedByOS } = useFlickerPreference();

    const [post, setPost] = useState(null);
    const [comments, setcomments] = useState([]);
    const [hasVoted, setHasVoted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    const [loadError, setLoadError] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [actionError, setActionError] = useState('');

    const loadPost = useCallback(async () => {
        setIsLoading(true);
        setLoadError('');

        const [postResult, commentsResult, votesResult] = await Promise.all([
            fetchPostById(id),
            fetchComments(id),
            user ? fetchUserVotes(user.id) : Promise.resolve({ votedPostIds: [] }),
        ]);

        if (postResult.error) {
            setLoadError(postResult.error);
            setIsLoading(false);
            return;
        }

        setPost(postResult.post);
        setcomments(commentsResult.comments || []);
        setHasVoted(votesResult.votedPostIds?.includes(id) ?? false);
        setIsLoading(false);
    }, [id, user]);

    useEffect(() => {
        loadPost();
    }, [loadPost]);

    if (isLoading) {
        return (
            <TerminalFrame title="POST.EXE">
                <LoadingIndicator label="FETCHING RECORD" />
            </TerminalFrame>
        );
    }

    if (loadError) {
        return (
            <TerminalFrame title="POST.EXE">
                <p className="empty-state">
                    CONNECTION ERROR: {loadError}
                    <br />
                    <button className="btn" onClick={loadPost} style={{ marginTop: '0.75rem' }}>
                        [RETRY]
                    </button>
                </p>
            </TerminalFrame>
        );
    }

    if (!post) {
        return (
            <TerminalFrame title="POST.EXE">
                <p className="empty-state">
                    RECORD NOT FOUND. IT MAY HAVE BEEN PURGED.
                </p>
            </TerminalFrame>
        );
    }

    const isAuthor = user && user.id === post.author_id;
    const handleVote = async () => {
        if (!user) return;
        const currentlyVoted = hasVoted;
        setHasVoted(!currentlyVoted);
        setPost((prev) => ({
            ...prev,
            upvote_count: prev.upvote_count + (currentlyVoted ? -1 : 1),
        }));

        const result = await toggleVote(post.id, user.id, currentlyVoted);
        if (result.error) {
            loadPost();
            return;
        }
        setPost((prev) => ({ ...prev, upvote_count: result.upvoteCount }));
    };

    const handleEdit = async ({ title, body, image_url }) => {
        setActionError('');
        const result = await updatePost(post.id, { title, body, imageUrl: image_url });
        if (result.error) {
            setActionError(result.error);
            return;
        }
        setPost(result.post);
        setShowEditModal(false);   
    };

    const handleDelete = async () => {
        const result = await deletePost(post.id);
        if (result.error) {
            setActionError(result.error);
            setShowDeletionConfirm(false);
            return;
        }
        navigate('/');
    };

    const handleAddComment = async (body) => {
        const result = await createComment({
            postId: post.id,
            authorId: user.id,
            body,
        });
        if (result.error) {
            setActionError(result.error);
            return;
        }
        setcomments((prev) => [...prev, result.comment]);
    };

    const handleMarkBest = async (commentId) => {
        const newAcceptedId = post.accepted_comment_id === commentId ? null : commentId;
        const result = await setAcceptedComment(post.id, newAcceptedId);
        if (result.error) {
            setActionError(result.error);
            return;
        }
        setPost(result.post);
    };

    return (
        <TerminalFrame title="POST.EXE">
        <Navbar
            flickerEnabled={flickerEnabled}
            onToggleFlicker={toggle}
            flickerLocked={lockedByOS}
        />

        {actionError && <div className="form-error">! {actionError}</div>}

        <PostDetail
            post={post}
            hasVoted={hasVoted}
            onVote={handleVote}
            isAuthor={isAuthor}
            onEdit={() => setShowEditModal(true)}
            onDelete={() => setShowDeleteConfirm(true)}
        />

        <h2 className="thread-heading">ANSWERS</h2>
        <CommentThread
            comments={comments}
            acceptedCommentId={post.accepted_comment_id}
            canMarkBest={isAuthor}
            onMarkBest={handleMarkBest}
        />

        {user && <CommentComposer onSubmit={handleAddComment} />}

        {showEditModal && (
            <Modal title="EDIT_ENTRY.EXE" onClose={() => setShowEditModal(false)}>
            <PostForm
                initialValues={post}
                onSubmit={handleEdit}
                submitLabel="SAVE CHANGES"
            />
            </Modal>
        )}

        {showDeleteConfirm && (
            <ConfirmDialog
            title="CONFIRM_PURGE.EXE"
            message="PURGE THIS RECORD? THIS ACTION CANNOT BE UNDONE."
            confirmLabel="PURGE"
            cancelLabel="ABORT"
            onConfirm={handleDelete}
            onCancel={() => setShowDeleteConfirm(false)}
            />
        )}
        </TerminalFrame>
    );
}