import { useAxios } from "src/composables/useAxios";
export const PostApi = () => {
  const { callApi } = useAxios();
  // โพสต์ทั้งหมด
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

  // โพสต์ตนเอง
  const findAllByMyPost = async (id) => {
    return await callApi({
      method: "GET",
      url: `/findAllByYouPost?id=${id}`,
    });
  };

  // โพสต์ที่ไปคอมเมนต์
  const findAllByMyReplyPost = async (id) => {
    return await callApi({
      method: "GET",
      url: `findAllByYouCommentToPost?id=${id}`,
    });
  };

  // โพสต์ที่ถูกใจ
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

  const updateTextPost = async (req = {}) => {
    return await callApi({
      method: "PUT",
      url: `/postEditContent`,
      body: req,
    });
  };

  // Add Post
  const addPost = async (req = {}) => {
    return await callApi({
      method: "POST",
      url: `/postUpload`,
      body: req,
    });
  };

  // postImgAddMore For Edit Post
  // const postImgAddMore = async (id, req = {}) => {
  //   return await callApi({
  //     method: "POST",
  //     // url: `/postImgAddMore?post_id=${id}`,
  //     url: `/postImgAddMore?post_id=${parseInt(id)}`,
  //     body: req,
  //   });
  // };
  const postImgAddMore = async (req = {}, id) => {
    return await callApi({
      method: "POST",
      url: `/postImgAddMore`,
      body: req,
    });
  };


  // const postEditMultipleUploadImage = async (file) => {
  //   const postImgData = new FormData();
  //   postData.append("fileName_", file);
  //   return await callApi({
  //     method: "POST",
  //     url: "/postEditMultipleUploadImage",
  //     contentType: "multipart/form-data",
  //     body: postImgData,
  //   });
  // };

  // Delete Post
  const deletePost = async (ids) => {
    return await callApi({
      method: "DELETE",
      url: `/post?_ids=${ids}`,
    });
  };

  return {
    getPostList,
    getOneUserPost,
    findAllByMyPost,
    findAllByMyReplyPost,
    findAllByMyLikePost,
    detailPost,
    addPost,
    deletePost,
    updateTextPost,
    postImgAddMore,
  };
};
