import React, { createContext, useReducer, useContext } from "react";
import {
  SET_CURRENT_POST,
  REMOVE_POST,
  UPDATE_POSTS,
  ADD_POST,
  ADD_FAVORITE,
  UPDATE_FAVORITES,
  REMOVE_FAVORITE,
  LOADING,
  ADD_MESSAGE,
  UPDATE_MESSAGE,
  REMOVE_MESSAGE
} from "./actions";


const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_POST:
      return {
        ...state,
        currentPost: action.post,
        loading: false
      };

    case UPDATE_POSTS:
      return {
        ...state,
        posts: [...action.posts],
        loading: false
      };

    case ADD_POST:
      return {
        ...state,
        posts: [action.post, ...state.posts],
        loading: false
      };

    case REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => {
          return post._id !== action._id;
        })
      };

    //messages
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [action.message, ...state.messages],
        loading: false
      };

    case REMOVE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter((post) => {
          return post._id !== action._id;
        })
      };

    case UPDATE_MESSAGE:
      return {
        ...state,
        messages: [...action.messages],
        loading: false
      };


    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [action.post, ...state.favorites],
        loading: false
      };

    case UPDATE_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites],
        loading: false
      };

    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter((post) => {
          return post._id !== action._id;
        })
      };

    case LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    posts: [],
    currentPost: {
      _id: 0,
      username: "",
      header: "",
      body: "",
      link: "",
      category: ""
    },
    favorites: [],
    likes: [],
    messages: [],
    loading: false
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };