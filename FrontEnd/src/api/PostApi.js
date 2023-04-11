import { useAxios } from "src/composables/useAxios";
export const PostApi = () => {
  const { callApi } = useAxios();
  const getPostList = async (
    req = {
      page: 1,
      perPage: 10,
      body: "",
    }
  ) => {
    return await callApi({
      method: "GET",
      url: `/findAllBy${req.body}?page=${req.page}&perPage=${req.perPage}`,
    });
  };

  const getOneUserPost = async (id) => {
    return await callApi({
      method: "GET",
      url: `/post?user_id=${id}`,
    });
  };

  const findAllByMyPost = async (id) => {
    return await callApi({
      method: "GET",
      url: `/findAllByYouPost?id=${id}`,
    });
  };

  const findAllByMyReplyPost = async (id) => {
    return await callApi({
      method: "GET",
      url: `findAllByYouCommentToPost?id=${id}`,
    });
  };

  const findAllByMyLikePost = async (id) => {
    return await callApi({
      method: "GET",
      url: `findAllByYouLikePost?id=${id}`,
    });
  };

  const detailPost = async (id) => {
    return await callApi({
      method: "GET",
      url: `/DetailPost?post_id=${id}`,
    });
  };

  return {
    getPostList,
    getOneUserPost,
    findAllByMyPost,
    findAllByMyReplyPost,
    findAllByMyLikePost,
    detailPost,
  };
};
