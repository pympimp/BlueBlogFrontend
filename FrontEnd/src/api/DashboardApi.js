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

  const countUserSignUp = async () => {
    return await callApi({
      method: "GET",
      url: `/countUserSignUpAllMonth`,
    });
  };

  return {
    countPost,
    countUser,
    countUserSignUp,
  };
};
