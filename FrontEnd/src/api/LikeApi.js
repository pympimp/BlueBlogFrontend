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

  const LikeComment = async (id) => {
    return await callApi({
      method: "POST",
      url: `/likeCommentApi?post_id=59&comment_id=${id}`,
    });
  };

  const UnlikeComment = async (id) => {
    return await callApi({
      method: "POST",
      url: `/unlikeCommentApi?post_id=56&comment_id=${id}`,
    });
  };

  const CountLike = async (id) => {
    return await callApi({
      method: "GET",
      url: `/CountLikePost?post_id=${id}`,
    });
  };

  const CheckLikePost = async (id) => {
    return await callApi({
      method: "GET",
      url: `/checkLikePost?comment_id=${id}`,
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

  return {
    LikePost,
    UnlikePost,
    LikeComment,
    UnlikeComment,
    CountLike,
    ListLikePost,
    CheckLikePost,
    CheckLikeComment,
  };
};
