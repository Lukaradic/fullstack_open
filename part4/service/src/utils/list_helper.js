import isEmpty from "lodash/isEmpty.js";

export const dummy = (blogs) => {
  return 1;
};

export const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => {
    return acc + curr.likes;
  }, 0);
};

export const favoriteBlog = (blogs) => {
  let favorite;
  let max = 0;

  blogs.forEach((blog) => {
    if (blog.likes > max) {
      max = blog.likes;
      favorite = blog;
    }
  });

  return favorite;
};

export const authorMostBlogs = (blogs) => {
  if (isEmpty(blogs)) {
    return null;
  }
  const map = {};

  blogs.forEach((blog) => {
    const { author } = blog;
    if (map.hasOwnProperty(author)) {
      map[author]++;
    } else {
      map[author] = 1;
    }
  });

  const sorted = Object.keys(map).sort((a, b) => map[b] - map[a]);

  return {
    author: sorted[0],
    blogs: map[sorted[0]],
  };
};

export const authorMostLikes = (blogs) => {
  if (isEmpty(blogs)) {
    return null;
  }
  const map = {};

  blogs.forEach((blog) => {
    const { author, likes } = blog;
    if (map.hasOwnProperty(author)) {
      map[author] += likes;
    } else {
      map[author] = likes;
    }
  });

  const sorted = Object.keys(map).sort((a, b) => map[b] - map[a]);

  return {
    author: sorted[0],
    likes: map[sorted[0]],
  };
};
