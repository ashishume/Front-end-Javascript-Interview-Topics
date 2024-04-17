import { useState } from "react";
import CommentBox from "./components/commentBox";
import { generateId } from "@/lib/utils";
const commentListData = [
  {
    id: "1",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui magnam assumenda perferendis minima exercitationem, repellendus harum laudantium quod inventore incidunt cum dicta iure officiis excepturi aliquid ad cupiditate impedit laboriosam?",
    children: [
      {
        id: "2",
        message: "my name is ashish",
        children: [
          {
            id: "3",
            message: "my name is deb",
          },
        ],
      },
    ],
  },
];
const CommentComp = () => {
  const [comment, setComment] = useState("");
  const [activeCommentId, setActiveCommentId] = useState("");
  const [showCommentField, setShowCommentField] = useState(false);
  const [commentsData, setCommentsData] = useState(commentListData as any);

  const onCommentHandler = (e: any) => {
    setComment(e.target.value);
  };

  /**
   * find the target user id and add the reply to that specific user
   * @param commentsData
   * @param targetId
   */
  const findAndUpdateCommentWithId = (
    commentsData: any,
    targetId: string
  ): any => {
    const updatedComments = commentsData.map((obj: any) => {
      if (obj.id === targetId) {
        const newReply = {
          id: generateId(),
          message: comment,
        };
        if (obj.children) {
          obj.children.push(newReply);
        } else {
          obj.children = [newReply];
        }
        return obj;
      }
      if (obj.children) {
        const foundInChildren = findAndUpdateCommentWithId(
          obj.children,
          targetId
        );
        if (foundInChildren) {
          return foundInChildren;
        }
      }
      return obj;
    });
    setCommentsData(updatedComments);
  };
  const onSubmitHandler = async (id: string) => {
    await setShowCommentField(!showCommentField);
    await findAndUpdateCommentWithId(commentsData, id);
    await setComment("");
  };
  const showReplyInputField = (id: string) => {
    setShowCommentField((prev) => !prev);
    setActiveCommentId(id);
  };
  const renderNestedComments = (commentsRenderData: any) => {
    return commentsRenderData.map(({ id, message, children }: any) => {
      return (
        <div key={id}>
          <CommentBox
            id={id}
            toggleCommentField={() => showReplyInputField(id)}
            value={comment}
            commentMessage={message}
            isVisible={showCommentField}
            activeCommentId={activeCommentId}
            onChange={onCommentHandler}
            onSubmitHandler={() => onSubmitHandler(id)}
          />
          <div style={{ marginLeft: "30px" }}>
            {children && renderNestedComments(children)}
          </div>
        </div>
      );
    });
  };

  return renderNestedComments(commentsData);
};

export default CommentComp;
