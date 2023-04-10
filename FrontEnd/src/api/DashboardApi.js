import { useAxios } from "src/composables/useAxios";
export const DashboardApi = () => {
  const { callApi } = useAxios();

  const countPost = async () => {
    return await callApi({
      method: "GET",
      url: `/countPostCreateTodayDefault`,
    });
  };

  const countUser = async () => {
    return await callApi({
      method: "GET",
      url: `/countUserLoginTodayDefault`,
    });
  };

  return {
    countPost,
    countUser,
  };
};
