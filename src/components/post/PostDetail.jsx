import VoteButton from './VoteButton';
import { timeAgo } from '../../lib/formatTime';
import './PostDetail.css';

export default function PostDetail({
    post,
    hasVoted,
    onVote,
    isAuthor,
    onEdit,
    onDelete,
}) {
    return (
        <div className='post-detail'>
            <div className='post-detail-header'>
                <VoteButton count={post.upvote_count} hasVoted={hasVoted} onVote={onVote} />
                <div className='post-detail-heading'>
                    <h1>
                        {post.accepted_comment_id && (
                            <span className='solved-tag'>[SOLVED]</span>
                        )}
                        {post.title}
                    </h1>
                    <div className='post-detail-meta'>
                        <span>posted by @{post.author_username}</span>
                        <span className='meta-sep'>//</span>
                        <span>{timeAgo(post.created_at)}</span>
                    </div>
                </div>
            </div>

            {post.image_url && (
                <img className='post-detail-image' src={post.image_url} alt="" />
            )}

            <p className='post-detail-body'>{post.body}</p>

            {isAuthor && (
                <div className='post-detail-actions'>
                    <button className='btn' onClick={onEdit}>
                        [EDIT]
                    </button>
                    <button className='btn danger' onClick={onDelete}>
                        [DELETE]
                    </button>
                </div>
            )}
        </div>
    );
}