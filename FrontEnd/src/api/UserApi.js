import { useAxios } from "src/composables/useAxios";
export const UserApi = () => {
  const { callApi } = useAxios();
  const getUserList = async (
    req = {
      page: 1,
      perPage: 10,
    }
  ) => {
    return await callApi({
      method: "GET",
      url: `/user?page=${req.page}&perPage=${req.perPage}`,
    });
  };

  const getOne = async (id) => {
    return await callApi({
      method: "GET",
      url: `/userReadSingle?_id=${id}`,
    });
  };
  return {
    getUserList,
    getOne,
  };
};
