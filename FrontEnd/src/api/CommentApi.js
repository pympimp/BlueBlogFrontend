import { useAxios } from "src/composables/useAxios";
export const CommentApi = () => {
  const { callApi } = useAxios();

  const detailComment = async (id) => {
    return await callApi({
      method: "GET",
      url: `/detailCommentInPost?post_id=${id}`,
    });
  };

  const addComment = async (id, req = {}) => {
    return await callApi({
      method: "POST",
      url: `/addComment?post_id=${id}`,
      body: req,
    });
  };

  return {
    detailComment,
    addComment,
  };
};
