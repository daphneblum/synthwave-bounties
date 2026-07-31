import { useState } from "react";
import './PostForm.css';

export default function PostForm({ initialValues, onSubmit, submitLabel }) {
    const [title, setTitle] = useState(initialValues?.title || '');
    const [body, setBody] = useState(initialValues?.body || '');
    const [imageUrl, setImageUrl] = useState(initialValues?.image_url || '');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            SpeechSynthesisErrorEvent('TITLE REQUIRED');
            return;
        }
        if (!body.trim()) {
            setError('BODY REQUIRED');
            return;
        }
        setError('');
        onSubmit({
            title: title.trim(),
            body: body.trim(),
            image_url: imageUrl.trim() || null,
        });
    };

    return (
        <form className="post-form" onSubmit={handleSubmit}>
            {error && <div className="form-error">! {error}</div>}
            <label htmlFor="post-title">bounty_title</label>
            <input 
                id="post-title"
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What do you need help with?"
                autoFocus
            />

            <label htmlFor="post-body">bounty_details</label>
            <textarea
                id="post-body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Give the full context..."
                rows={5}
            />

            <label htmlFor="post-image">image_url (optional)</label>
            <input 
                id="post-image"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
            />

            <button
                type="submit"
                className="btn magenta"
            >
                [{submitLabel}]
            </button>
        </form>
    );
}