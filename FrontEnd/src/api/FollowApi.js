import { useAxios } from "src/composables/useAxios";
export const FollowApi = () => {
  const { callApi } = useAxios();

  const Follow = async (id) => {
    return await callApi({
      method: "POST",
      url: `/addFollow?follow_id=${id}`,
    });
  };

  const unFollow = async (id) => {
    return await callApi({
      method: "POST",
      url: `/unFollow?follow_id=${id}`,
    });
  };

  const countFol = async (id) => {
    return await callApi({
      method: "GET",
      url: `/countFollow?user_id=${id}`,
    });
  };

  const checkFollower = async (id) => {
    return await callApi({
      method: "GET",
      url: `/checkFollow?follow_id=${id}`,
    });
  };

  return {
    Follow,
    unFollow,
    countFol,
    checkFollower,
  };
};
