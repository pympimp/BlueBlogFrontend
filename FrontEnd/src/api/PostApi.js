import { useAxios } from "src/composables/useAxios";
export const PostApi = () => {
  const { callApi } = useAxios();
  const getPostList = async (
    req = {
      page: 1,
      perPage: 10,
    }
  ) => {
    return await callApi({
      method: "GET",
      url: `/findAllByCreateDateDesc?page=${req.page}&perPage=${req.perPage}`,
    });
  };

  return {
    getPostList,
  };
};
