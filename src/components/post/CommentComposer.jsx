import { useState } from "react";
import './CommentComposer.css';

export default function CommentComposer({ onSubmit }) {
    const [body, setBody] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!body.trim()) return;
        onSubmit(body.trim());
        setBody('');
    };

    return (
        <form className="comment-composer" onSubmit={handleSubmit}>
            <label htmlFor="comment-body" className="visually-hidden">Write an answer</label>
            <textarea 
                id="comment-body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="> type your answer..."
                rows={3}
            />
            <button
                type="submit"
                className="btn magenta"
                disabled={!body.trim()}
            >
                [SUBMIT ANSWER]
            </button>
        </form>
    );
}