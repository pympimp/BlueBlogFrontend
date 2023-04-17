import { useAxios } from "src/composables/useAxios";
export const LikeApi = () => {
  const { callApi } = useAxios();

  const Like = async (id) => {
    return await callApi({
      method: "POST",
      url: `/likePostApi?post_id=${id}`,
    });
  };

  const Unlike = async (id) => {
    return await callApi({
      method: "POST",
      url: `/unlikePostApi?post_id=${id}`,
    });
  };

  const CountLike = async (id) => {
    return await callApi({
      method: "GET",
      url: `/CountLikePost?post_id=${id}`,
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
    Like,
    Unlike,
    CountLike,
    ListLikePost,
  };
};
