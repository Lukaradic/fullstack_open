import { test, describe, beforeEach } from "node:test";
import assert, { strictEqual } from "node:assert";
import {
  totalLikes,
  favoriteBlog,
  authorMostBlogs,
  authorMostLikes,
} from "./list_helper.js";

// test("dummy returns one", () => {
//   const blogs = [];

//   const result = dummy(blogs);
//   assert.strictEqual(result, 1);
// });
const blogs = [
  {
    title: "My First Blog",
    author: "Luka Radic",
    url: "https://lukaradicsblog.com/first",
    likes: 5,
  },
  {
    title: "My Second Blog",
    author: "Luka Radic",
    url: "https://lukaradicsblog.com/second",
    likes: 15,
  },
  {
    title: "My Third Blog",
    author: "Luka Radic",
    url: "https://lukaradicsblog.com/third",
    likes: 25,
  },
  {
    title: "My First blog",
    author: "Marko Markovic",
    url: "https://lukaradicsblog.com/third",
    likes: 125,
  },
];

describe("Testing list_helper functions", () => {
  test("Total likes should return 170", () => {
    const total = totalLikes(blogs);
    assert.strictEqual(total, 170);
  });

  test("Total likes should return 0 when an empty array is passed", () => {
    const total = totalLikes([]);
    assert.strictEqual(total, 0);
  });
});

describe("Testing favorite blog", () => {
  test("Favorite blog should have 125 likes", () => {
    const likes = favoriteBlog(blogs)?.likes;
    assert.strictEqual(likes, 125);
  });
  test("It should return undefined if no blogs are passed", () => {
    const favorite = favoriteBlog([]);
    assert.strictEqual(undefined, favorite);
  });
});

describe("Testing authorMostBlogs", () => {
  test("Should return Luka Radic with 3 blogs", () => {
    const result = authorMostBlogs(blogs);
    assert.deepEqual({ author: "Luka Radic", blogs: 3 }, result);
  });

  test("Should return null if no blogs are provided", () => {
    const result = authorMostLikes([]);
    assert.strictEqual(null, result);
  });
});

describe("Testing authorMostLikes", () => {
  test("Should return Marko Markovic with 125", () => {
    const result = authorMostLikes(blogs);
    assert.deepEqual({ author: "Marko Markovic", likes: 125 }, result);
  });
  test("Should return null when no blogs are provided", () => {
    const result = authorMostLikes([]);
    assert.strictEqual(null, result);
  });
});
