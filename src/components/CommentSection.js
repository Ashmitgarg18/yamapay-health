import { useState, useEffect, useRef } from "react";
import styles from "./CommentSection.module.css";

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [reply, setReply] = useState({ parentId: null, content: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [loading, setLoading] = useState(false);
  const replyRef = useRef(null);
  const textareaRef = useRef(null);
  const commentTextareaRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }

    fetchComments();

    // Add event listener for clicks outside the reply box
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener on unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [replyingTo]);

  const fetchComments = async () => {
    try {
      const response = await fetch("/api/comments");
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handlePostComment = async () => {
    if (newComment.trim() === "") return;

    setLoading(true);
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment }),
      });

      if (response.ok) {
        const addedComment = await response.json();
        setComments([...comments, addedComment]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
    setLoading(false);
  };

  const handleReply = async (parentId) => {
    if (reply.content.trim() === "") return;

    setLoading(true);
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: reply.content, parentId }),
      });

      if (response.ok) {
        const addedReply = await response.json();
        setComments(
          comments.map((comment) =>
            comment._id === parentId
              ? { ...comment, replies: [...comment.replies, addedReply] }
              : comment
          )
        );
        setReply({ parentId: null, content: "" });
        setReplyingTo(null);
      }
    } catch (error) {
      console.error("Error posting reply:", error);
    }
    setLoading(false);
  };

  const handleKeyPress = (e, parentId) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (parentId) {
        handleReply(parentId);
      } else {
        handlePostComment();
      }
    }
  };

  const handleClickOutside = (event) => {
    if (replyRef.current && !replyRef.current.contains(event.target)) {
      setReplyingTo(null);
      setReply({ parentId: null, content: "" });
    }
  };

  return (
    <div className={styles.commentSection}>
      <h3>Discussion</h3>
      <ul className={styles.commentList}>
        {comments.map((comment) => (
          <li key={comment._id} className={styles.comment}>
            <p>{comment.content}</p>
            <ul className={styles.replyList}>
              {comment.replies.map((reply) => (
                <li key={reply._id} className={styles.reply}>
                  {reply.content}
                </li>
              ))}
            </ul>
            {isAuthenticated && (
              <div className={styles.replyButtonContainer}>
                {replyingTo !== comment._id && (
                  <button
                    onClick={() => setReplyingTo(comment._id)}
                    className={styles.button}
                  >
                    Reply
                  </button>
                )}
                {replyingTo === comment._id && (
                  <div ref={replyRef} className={styles.replyInputContainer}>
                    <textarea
                      ref={textareaRef}
                      value={reply.content}
                      onChange={(e) =>
                        setReply({
                          parentId: comment._id,
                          content: e.target.value,
                        })
                      }
                      onKeyPress={(e) => handleKeyPress(e, comment._id)}
                      placeholder="Write a reply..."
                      className={styles.textarea}
                    />
                    <button
                      onClick={() => handleReply(comment._id)}
                      className={styles.button}
                      disabled={loading}
                    >
                      {loading ? "Posting..." : "Post Reply"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      {isAuthenticated ? (
        <div className={styles.commentForm}>
          <textarea
            ref={commentTextareaRef}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e)}
            placeholder="Write a comment..."
            className={styles.textarea}
          />
          <button
            onClick={handlePostComment}
            className={styles.button}
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Comment"}
          </button>
        </div>
      ) : (
        <p>Please sign in to post a comment.</p>
      )}
    </div>
  );
};

export default CommentSection;