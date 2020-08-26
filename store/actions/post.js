import Post from "../../models/Post";

export const LIKE_POST = "LIKE_POST";
export const ADD_POST = "ADD_POST";
export const SET_POSTS = "SET_POSTS";
export const UPDATE_POST = "UPDATE_POST";

export const fetchPosts = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://friendbook-64688.firebaseio.com/posts.json"
    );

    const resData = await response.json();
    const loadedPosts = [];

    for (const key in resData) {
      loadedPosts.push(
        new Post(
          resData[key].userId,
          key,
          resData[key].content,
          resData[key].posted,
          resData[key].likes,
          resData[key].comments,
          resData[key].shares,
          resData[key].date,
          resData[key].image
        )
      );
    }

    loadedPosts.sort((a, b) => a > b);

    dispatch({ type: SET_POSTS, posts: loadedPosts });
  };
};

var today = new Date();
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var time = today.getDate() + " " + months[today.getMonth()];

export const addPost = (userId, content, image) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://friendbook-64688.firebaseio.com/posts.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          content,
          posted: Date.now(),
          likes: 0,
          comments: 0,
          shares: 0,
          date: time,
          image,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: ADD_POST,
      id: resData.name,
      userId,
      content,
      posted: Date.now(),
      likes: 0,
      comments: 0,
      shares: 0,
      date: time,
      image,
    });
  };
};

export const updatePost = (postId, likes, comments, shares) => {
  return async (dispatch) => {
    await fetch(
      `https://friendbook-64688.firebaseio.com/posts/${postId}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes,
          comments,
          shares,
        }),
      }
    );
    dispatch({
      type: UPDATE_POST,
      postId,
      likes,
      comments,
      shares,
    });
  };
};

export const likePost = (postId, likes) => {
  return async (dispatch) => {
    dispatch({
      type: LIKE_POST,
      postId,
      likes,
    });
  };
};
