import { useAxios } from "src/composables/useAxios";
export const CommentApi = () => {
  const { callApi } = useAxios();

  // DetailComment
  const detailComment = async (id) => {
    return await callApi({
      method: "GET",
      url: `/detailCommentInPost?post_id=${id}`,
    });
  };

  // DetailComment Status = 0
  const detailCommentStatus = async (id) => {
    return await callApi({
      method: "GET",
      url: `/detailCommentInPostStatus?post_id=${id}`,
    });
  };

  // Add Comment
  const addComment = async (id, req = {}) => {
    return await callApi({
      method: "POST",
      url: `/addComment?post_id=${id}`,
      body: req,
    });
  };

  // Delete Comment
  const deleteComment = async (ids) => {
    return await callApi({
      method: "DELETE",
      url: `/comment?_ids=${ids}`,
    });
  };

  // Hide Comment
  const hideComment = async (ids) => {
    return await callApi({
      method: "PUT",
      url: `/commentHide?comment_id=${ids}`,
    });
  };

  // UnHide Comment
  const unHideComment = async (ids) => {
    return await callApi({
      method: "PUT",
      url: `/commentUnHide?comment_id=${ids}`,
    });
  };

  return {
    detailComment,
    detailCommentStatus,
    addComment,
    deleteComment,
    hideComment,
    unHideComment,
  };
};
