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

  const findAllByMyReplyPost = async (id) => {
    return await callApi({
      method: "GET",
      url: `findAllByMyCommentToPost?user_id=${id}`,
    });
  };

  const findAllByMyLikePost = async (id) => {
    return await callApi({
      method: "GET",
      url: `findAllByMyLikePost?user_id=${id}`,
    });
  };

  const detailPost = async (id) => {
    return await callApi({
      method: "GET",
      url: `/DetailPost?post_id=${id}`,
    });
  };

  // Crate Post Multiple Upload Image
  const postMultipleUploadImage = async (file, Text) => {
    const postData = new FormData();
    postData.append("fileName", file);
    postData.append("titlePost", Text);
    postData.append("contentPost", Text);
    return await callApi({
      method: "POST",
      url: "/postMultipleUploadImage",
      contentType: "multipart/form-data",
      body: postData,
    });
  };

  return {
    getPostList,
    getOneUserPost,
    findAllByMyReplyPost,
    findAllByMyLikePost,
    detailPost,
    postMultipleUploadImage,
  };
};
