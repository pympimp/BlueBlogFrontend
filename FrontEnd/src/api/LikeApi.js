import { useAxios } from "src/composables/useAxios";
export const LikeApi = () => {
  const { callApi } = useAxios();

  const LikePost = async (id) => {
    return await callApi({
      method: "POST",
      url: `/likePostApi?post_id=${id}`,
    });
  };

  const UnlikePost = async (id) => {
    return await callApi({
      method: "POST",
      url: `/unlikePostApi?post_id=${id}`,
    });
  };

  const LikeComment = async (id, id1) => {
    return await callApi({
      method: "POST",
      url: `/likeCommentApi?post_id=${id1}&comment_id=${id}`,
    });
  };

  const UnlikeComment = async (id, id1) => {
    return await callApi({
      method: "POST",
      url: `/unlikeCommentApi?post_id=${id1}&comment_id=${id}`,
    });
  };

  const CountPost = async (id) => {
    return await callApi({
      method: "GET",
      url: `/CountLikePost?post_id=${id}`,
    });
  };

  const CountComment = async (id) => {
    return await callApi({
      method: "GET",
      url: `/countLikeComment?comment_id=${id}`,
    });
  };

  const CheckLikePost = async (id) => {
    return await callApi({
      method: "GET",
      url: `/checkLikePost?post_id=${id}`,
    });
  };

  const CheckLikeComment = async (id) => {
    return await callApi({
      method: "GET",
      url: `/checkLikeComment?comment_id=${id}`,
    });
  };

  //ไว้รอทำฟังก์ชั่นดูรายชื่อว่าใครไลก์โพสบ้าง
  const ListLikePost = async (id) => {
    return await callApi({
      method: "GET",
      url: `/ListLikePost?post_id=${id}`,
    });
  };

  //ไว้รอทำฟังก์ชั่นดูรายชื่อว่าใครไลก์คอมเมนต์บ้าง
  const ListLikeComment = async (id) => {
    return await callApi({
      method: "GET",
      url: `/ListLikeComment?comment_id=${id}`,
    });
  };

  return {
    LikePost,
    UnlikePost,
    LikeComment,
    UnlikeComment,
    CountPost,
    CountComment,
    ListLikePost,
    ListLikeComment,
    CheckLikePost,
    CheckLikeComment,
  };
};
