import { timeAgo } from '../../lib/formatTime';
import './CommentItem.css';

export default function CommentItem({
  comment,
  isAccepted,
  canMarkBest,
  onMarkBest,
  isAuthor,
  onDelete,
}) {
  return (
    <div className={`comment-item ${isAccepted ? 'accepted' : ''}`}>
      {isAccepted && (
        <div className="accepted-banner">✓ VERIFIED — BEST ANSWER</div>
      )}

      <p className="comment-body">{comment.body}</p>

      <div className="comment-meta">
        <span>@{comment.author_username}</span>
        <span className="meta-sep">//</span>
        <span>{timeAgo(comment.created_at)}</span>
        {canMarkBest && !isAccepted && (
          <>
            <span className="meta-sep">//</span>
            <button className="mark-best-btn" onClick={onMarkBest}>
              mark as best answer
            </button>
          </>
        )}
        {isAuthor && (
          <>
            <span className="meta-sep">//</span>
            <button className="mark-best-btn comment-delete-btn" onClick={onDelete}>
              delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}