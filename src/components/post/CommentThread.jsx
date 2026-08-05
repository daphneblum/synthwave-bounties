import CommentItem from './CommentItem';

export default function CommentThread({
  comments,
  acceptedCommentId,
  canMarkBest,
  onMarkBest,
  currentUserId,
  onDeleteComment,
}) {
  if (comments.length === 0) {
    return (
      <p className="empty-state">
        NO ANSWERS LOGGED YET. BE THE FIRST TO RESPOND.
      </p>
    );
  }

  const sorted = [...comments].sort((a, b) => {
    if (a.id === acceptedCommentId) return -1;
    if (b.id === acceptedCommentId) return 1;
    return new Date(a.created_at) - new Date(b.created_at);
  });

  return (
    <div className="comment-thread">
      {sorted.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isAccepted={comment.id === acceptedCommentId}
          canMarkBest={canMarkBest}
          onMarkBest={() => onMarkBest(comment.id)}
          isAuthor={currentUserId === comment.author_id}
          onDelete={() => onDeleteComment(comment.id)}
        />
      ))}
    </div>
  );
}