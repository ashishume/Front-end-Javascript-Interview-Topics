import style from "../style.module.scss";
import CommentActionField from "./inputField";

const CommentBox = ({
  isVisible,
  value,
  onChange,
  toggleCommentField,
  onSubmitHandler,
  commentMessage,
  activeCommentId,
  id,
}: any) => {
  return (
    <div className={style.container}>
      <div className={style.commentContent}>{commentMessage}</div>
      <div className={style.actions}>
        {/* <div className={style.viewReply}>View Reply</div> */}
        <div className={style.reply} onClick={toggleCommentField}>
          Reply
        </div>
      </div>
      {isVisible && activeCommentId === id ? (
        <CommentActionField
          value={value}
          onChange={onChange}
          onSubmitHandler={onSubmitHandler}
        />
      ) : null}
    </div>
  );
};

export default CommentBox;
