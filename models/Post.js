class Post {
  constructor(
    userId,
    postId,
    content,
    posted,
    likes,
    comments,
    shares,
    date,
    image
  ) {
    this.userId = userId;
    this.postId = postId;
    this.content = content;
    this.posted = posted;
    this.likes = likes;
    this.comments = comments;
    this.shares = shares;
    this.date = date;
    this.image = image;
  }
}

export default Post;
