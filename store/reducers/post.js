import { ADD_POST, SET_POSTS, LIKE_POST, UPDATE_POST } from "../actions/post";
import Post from "../../models/Post";

const initialState = {
  posts: [],
  likes: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        posts: action.posts,
      };
    case ADD_POST:
      const newPost = new Post(
        action.userId,
        action.id,
        action.content,
        action.posted,
        action.likes,
        action.comments,
        action.shares,
        action.date,
        action.image
      );

      return {
        ...state,
        posts: [newPost, ...state.posts],
      };

    case LIKE_POST:
      const x = [];
      for (const key in state.posts) {
        x.push(state.posts[key].likes);
      }

      var postIndex = state.posts.findIndex(
        (post) => post.postId === action.postId
      );

      const postLikes = state.posts[postIndex].likes;
      var likes = parseFloat(postLikes);
      likes++;

      x[postIndex] = likes;

      return {
        ...state,
        likes: x,
      };

    case UPDATE_POST:
      var postIndex = state.posts.findIndex(
        (post) => post.postId === action.postId
      );

      const updatedPost = new Post(
        state.posts[postIndex].userId,
        action.postId,
        state.posts[postIndex].content,
        state.posts[postIndex].posted,
        action.likes,
        action.comments,
        action.shares,
        state.posts[postIndex].date,
        state.posts[postIndex].image
      );

      const updatedPosts = [...state.posts];
      updatedPosts[postIndex] = updatedPost;

      return {
        ...state,
        posts: updatedPosts,
      };

    default:
      return state;
  }
};

export default postReducer;
