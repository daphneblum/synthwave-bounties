import { useState, useMemo } from 'react';
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
import { mockPosts, mockComments, mockVotes } from '../data/mockData';

export default function PostDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { flickerEnabled, toggle, lockedByOS } = useFlickerPreference();

  const [, forceRerender] = useState(0);
  const rerender = () => forceRerender((n) => n + 1);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const isLoading = false; // TODO: real loading state once Supabase is wired up

  const post = mockPosts.find((p) => p.id === id);
  const comments = useMemo(
    () => mockComments.filter((c) => c.post_id === id),
    [id, mockComments.length] // eslint-disable-line react-hooks/exhaustive-deps
  );

  if (isLoading) {
    return (
      <TerminalFrame title="POST.EXE">
        <LoadingIndicator label="FETCHING RECORD" />
      </TerminalFrame>
    );
  }

  if (!post) {
    return (
      <TerminalFrame title="POST.EXE">
        <p className="empty-state">RECORD NOT FOUND. IT MAY HAVE BEEN PURGED.</p>
      </TerminalFrame>
    );
  }

  const isAuthor = user && user.id === post.author_id;
  const hasVoted =
    !!user && mockVotes.some((v) => v.post_id === post.id && v.user_id === user.id);

  const handleVote = () => {
    if (!user) return;
    const existingIndex = mockVotes.findIndex(
      (v) => v.post_id === post.id && v.user_id === user.id
    );
    if (existingIndex >= 0) {
      mockVotes.splice(existingIndex, 1);
      post.upvote_count -= 1;
    } else {
      mockVotes.push({ id: `v${Date.now()}`, post_id: post.id, user_id: user.id });
      post.upvote_count += 1;
    }
    rerender();
  };

  const handleEdit = ({ title, body, image_url }) => {
    post.title = title;
    post.body = body;
    post.image_url = image_url;
    setShowEditModal(false);
    rerender();
  };

  const handleDelete = () => {
    const index = mockPosts.findIndex((p) => p.id === post.id);
    if (index >= 0) mockPosts.splice(index, 1);
    setShowDeleteConfirm(false);
    navigate('/');
  };

  const handleAddComment = (body) => {
    mockComments.push({
      id: `c${Date.now()}`,
      post_id: post.id,
      author_id: user.id,
      author_username: user.username,
      body,
      created_at: new Date().toISOString(),
    });
    rerender();
  };

  const handleMarkBest = (commentId) => {
    post.accepted_comment_id =
      post.accepted_comment_id === commentId ? null : commentId;
    rerender();
  };

  return (
    <TerminalFrame title="POST.EXE">
      <Navbar
        flickerEnabled={flickerEnabled}
        onToggleFlicker={toggle}
        flickerLocked={lockedByOS}
      />

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