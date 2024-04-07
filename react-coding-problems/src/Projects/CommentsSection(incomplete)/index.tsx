import style from "./style.module.scss";

const CommentComp = (props: any) => {
  return (
    <div className={style.container}>
      <div className={style.commentContent}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
        voluptatibus numquam quia nam libero consequatur sit dignissimos,
        consequuntur nemo explicabo doloremque minus officiis quod deserunt
        voluptatem laborum dolores, molestiae aspernatur.
      </div>
      <div className={style.actions}>
        <div className={style.reply}>View Reply</div>
        <div className={style.viewReply}>Reply</div>
      </div>
    </div>
  );
};

const CommentsSection = () => {
  return <>
  <CommentComp />
  <CommentComp />
  <CommentComp />
  </>
};

export default CommentsSection;
