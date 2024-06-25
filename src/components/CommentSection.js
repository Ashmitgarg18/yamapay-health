import { useState, useEffect } from 'react';
import styles from './CommentSection.module.css'; // This should be correct

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [reply, setReply] = useState({ parentId: null, content: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }

    fetch('/api/comments')
      .then(response => response.json())
      .then(data => setComments(data))
      .catch(error => console.error('Error fetching comments:', error));
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

  const handleReply = async (parentId) => {
    if (reply.content.trim() === '') return;

    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: reply.content, parentId }),
    });

    if (response.ok) {
      const addedReply = await response.json();
      setComments(comments.map(comment => 
        comment._id === parentId 
          ? { ...comment, replies: [...comment.replies, addedReply] }
          : comment
      ));
      setReply({ parentId: null, content: '' });
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
            {isAuthenticated && (
              <div>
                <textarea
                  value={reply.parentId === comment._id ? reply.content : ''}
                  onChange={(e) => setReply({ parentId: comment._id, content: e.target.value })}
                  placeholder="Write a reply..."
                  className={styles.textarea}
                />
                <button onClick={() => handleReply(comment._id)} className={styles.button}>Reply</button>
              </div>
            )}
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
