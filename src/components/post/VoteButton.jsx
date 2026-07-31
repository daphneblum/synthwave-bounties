import './VoteButton.css';

export default function VoteButton({ count, hasVoted, onVote, disabled }) {
    return (
        <button 
            className={`vote-button ${hasVoted ? 'voted' : ''}`}
            onClick={onVote}
            disabled={disabled}
            aria-pressed={hasVoted}
            title={hasVoted ? 'Remove upvote' : 'Upvote this bounty'}
        >
            <span className='vote-arrow'>▲</span>
            <span className='vote-count'>{count}</span>
        </button>
    );
}