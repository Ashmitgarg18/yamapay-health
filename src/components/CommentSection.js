import { useState, useEffect } from 'react';
import styles from './CommentSection.module.css';

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }

    fetch('/api/comments')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched comments:', data); // Log fetched data
        if (Array.isArray(data)) {
          setComments(data);
        } else {
          setComments([]);
        }
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, []);

  const handlePostComment = async () => {
    if (newComment.trim() === '') return;

    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newComment }),
    });

    if (response.ok) {
      const addedComment = await response.json();
      setComments([...comments, addedComment]);
      setNewComment('');
    }
  };

  return (
    <div className={styles.commentSection}>
      <h3>Discussion</h3>
      <ul className={styles.commentList}>
        {comments.map(comment => (
          <li key={comment._id} className={styles.comment}>
            <p>{comment.content}</p>
            <ul>
              {comment.replies.map(reply => (
                <li key={reply._id} className={styles.reply}>{reply.content}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {isAuthenticated ? (
        <div className={styles.commentForm}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className={styles.textarea}
          />
          <button onClick={handlePostComment} className={styles.button}>Post Comment</button>
        </div>
      ) : (
        <p>Please sign in to post a comment.</p>
      )}
    </div>
  );
};

export default CommentSection;
