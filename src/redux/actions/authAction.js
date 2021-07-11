import axios from 'axios';

export const GET_PROFILE = 'GET_PROFILE';
export const GET_VERSION = 'GET_VERSION';

export const updateProfile = (profile) => {
  return {
    type: GET_PROFILE,
    payload: {
      profile,
    },
  };
};

export const getVersion = () => {
  return async (dispatch) => {
    const res = await axios.get('https://api.codingthailand.com/api/version');
    dispatch({
      type: GET_VERSION,
      payload: {
        version: res.data.data.version,
      },
    });
  };
};
