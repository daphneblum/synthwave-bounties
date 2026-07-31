import { Link } from "react-router-dom";
import VoteButton from '../post/VoteButton';
import { timeAgo } from "../../lib/formatTime";
import './PostCard.css';

export default function PostCard({ post, commentCount, hasVoted, onVote }) {
    return (
        <div className="post-card">
            <VoteButton count={post.upvote_count} hasVoted={hasVoted} onVote={onVote} />
            <Link to={`/post/${post.id}`} className="post-card-body">
                <h3 className="post-card-title">
                    {post.accepted_comment_id && (
                        <span className="solved-tag" title="Best answer selected">
                            [SOLVED]
                        </span>
                    )}
                    {post.title}
                </h3>
                <div className="post-card-meta">
                    <span>posted by @{post.author_username}</span>
                    <span className="meta-sep">//</span>
                    <span>{timeAgo(post.created_at)}</span>
                    <span className="meta-sep">//</span>
                    <span>{commentCount} {commentCount === 1 ? 'reply' : 'replies'}</span>
                </div>
            </Link>
        </div>
    );
}