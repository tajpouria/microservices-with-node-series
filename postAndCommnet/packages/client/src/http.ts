const { POST_SERVICE_URL, COMMENT_SERVICE_URL } = process.env;

export const createPost = (body: { title: string }) =>
  fetch(`${POST_SERVICE_URL}/post`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getPosts = () => fetch(`${POST_SERVICE_URL}/post`);

export const createComment = ({
  postId,
  content,
}: {
  postId: string;
  content: string;
}) =>
  fetch(`${COMMENT_SERVICE_URL}/post/${postId}/comment`, {
    method: "POST",
    body: JSON.stringify({ content }),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getPostComment = ({ postId }: { postId: string }) =>
  fetch(`${COMMENT_SERVICE_URL}/post/${postId}/comment`);
