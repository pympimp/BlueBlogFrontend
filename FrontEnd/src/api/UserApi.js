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
  const createUser = async (req = {}) => {
    return await callApi({
      method: "POST",
      url: "/userAdd",
      body: req,
    });
  };
  const updateUser = async (req = {}) => {
    return await callApi({
      method: "PUT",
      url: "/user",
      body: req,
    });
  };
  const deleteUser = async (ids) => {
    return await callApi({
      method: "DELETE",
      url: `/user?_ids=${ids}`,
    });
  };

  const userChangePwd = async (ids) => {
    return await callApi({
      method: "POST",
      url: "/userChangePwd",
    });
  };
  return {
    getUserList,
    getOne,
    createUser,
    updateUser,
    deleteUser,
    userChangePwd,
  };
};
