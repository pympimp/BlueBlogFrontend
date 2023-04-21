import { useAxios } from "src/composables/useAxios";
export const PostImgApi = () => {
  const { callApi } = useAxios();

  // Del PostImg
  const delPostImg = async (ids) => {
    return await callApi({
      method: "DELETE",
      url: `/postImg?_ids=${ids}`,
    });
  };

  return {
    delPostImg,
  };
};
