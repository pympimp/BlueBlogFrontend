import { useAxios } from "src/composables/useAxios";
export const CommentApi = () => {
  const { callApi } = useAxios();

  const detailComment = async (id) => {
    return await callApi({
      method: "GET",
      url: `/detailCommentInPost?post_id=${id}`,
    });
  };

  return {
    detailComment,
  };
};
