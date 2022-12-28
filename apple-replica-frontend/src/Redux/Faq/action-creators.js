import axios from "axios";
import { toast } from "react-toastify";
import { FaqActions } from "./FaqSlice";

const api = process.env.REACT_APP_API;

export const fetchFaq = () => {
  return async (dispatch) => {
    const fetch = axios.get(`${api}/faq`);

    dispatch(
      FaqActions.fetchFaq({
        QnA: [],
        isLoading: true,
        error: false,
      })
    );

    fetch
      .then((d) =>
        dispatch(
          FaqActions.fetchFaq({
            QnA: d.data.data,
            isLoading: false,
            error: false,
          })
        )
      )
      .catch((d) => {
        FaqActions.fetchFaq({
          QnA: [],
          isLoading: false,
          error: true,
        });
        toast.error(d.response.data.error, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
};

export const postFaq = (token, QnA) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    dispatch(FaqActions.postFaq({ isLoading: true, error: false }));

    const post = axios.post(`${api}/faq`, QnA, config);
    toast.promise(post, {
      pending: "Adding Faq...",
      success: {
        render({ d }) {
          dispatch(FaqActions.postFaq({ isLoading: false, error: false }));

          return `Successfully Added a new FAQ`;
        },
      },
      error: {
        render({ data }) {
          dispatch(FaqActions.postFaq({ isLoading: false, error: true }));
          console.log(data);
          return `${
            data.response.data.error ? data.response.data.error : data.response.data
          }`;
        },
      },
    });
  };
};
