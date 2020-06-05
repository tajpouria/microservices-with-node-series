const URL = "http://postandcomment.com";

export const createPost = (body: { title: string }) =>
  fetch(`${URL}/post`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getPosts = () => fetch(`${URL}/post`);

export const createComment = ({
  postId,
  content,
}: {
  postId: string;
  content: string;
}) =>
  fetch(`${URL}/post/${postId}/comment`, {
    method: "POST",
    body: JSON.stringify({ content }),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getPostComment = ({ postId }: { postId: string }) =>
  fetch(`${URL}/post/${postId}/comment`);

export const getPostAndComments = () => fetch(`${URL}/query`);
