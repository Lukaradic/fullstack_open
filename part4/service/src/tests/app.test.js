import { app } from "../../index.js";
import assert from "node:assert";
import { describe, test, beforeEach } from "node:test";
import { Blog } from "../models/blogModel.js";
import request from "supertest";

const blogObj = {
  title: "Luka test new blog",
  author: "Test Test",
  likes: 10,
  url: "https://fullstackopen.com/en/",
};

describe("Testing blogs endpoint", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    const newBlog = {
      title: "Blog for test",
      author: "Test test",
      url: "https://www.google.com",
      likes: 0,
    };
    const blogObj = new Blog(newBlog);
    await blogObj.save();
  });

  test("Get all blogs should return an array", async () => {
    const blogs = await request(app).get("/api/blogs");
    const { data } = blogs?.body || {};
    assert.ok(Array.isArray(data));
  });

  test("Blogs should have id and shouldn't have _id and __v properties", async () => {
    const blogs = await request(app).get("/api/blogs");
    const { data } = blogs?.body || {};
    const blog = data[0];

    assert.ok(blog.id);
    assert.strictEqual(undefined, blog._id);
    assert.strictEqual(undefined, blog.__v);
  });

  test("POST /api/blogs should create a blog", async () => {
    const createResponse = await request(app).post("/api/blogs").send(blogObj);

    const data = createResponse?.body?.data;

    const blogsResponse = await request(app).get("/api/blogs");
    const blogs = blogsResponse?.body?.data;
    const blogsCount = blogs?.length;

    assert.equal(2, blogsCount);
    assert.strictEqual(blogObj.title, data.title);
  });

  test("POST /api/blogs should create a blog with 0 likes, if likes is missing from the request body", async () => {
    const obj = { ...blogObj };
    delete obj.likes;
    const createResponse = await request(app).post("/api/blogs").send(obj);
    const data = createResponse?.body?.data;

    assert.equal(0, data.likes);
  });

  test("POST /api/blogs should return status 400 if url or title are missing from the request body", async () => {
    const obj = { ...blogObj };
    delete obj.title;
    delete obj.url;

    const createResponse = await request(app).post("/api/blogs").send(obj);

    assert.strictEqual(400, createResponse.status);
  });

  test("DELETE /api/blogs/:id should delete a single resource", async () => {
    const getBlogsResponse = await request(app).get("/api/blogs");
    const blogId = getBlogsResponse?.body?.data?.[0]?.id;

    const deleteResponse = await request(app).delete(`/api/blogs/${blogId}`);
    assert.strictEqual(204, deleteResponse.status);
  });

  test("DELETE /api/blogs/:id should return status 400 if id is not valid", async () => {
    const deleteResponse = await request(app).delete("/api/blogs/1234");
    assert.strictEqual(400, deleteResponse.status);
  });

  test("PUT /api/blogs/:id should change the number of likes", async () => {
    const getBlogsResponse = await request(app).get("/api/blogs");
    const blogId = getBlogsResponse?.body?.data?.[0]?.id;
    const blogLikes = getBlogsResponse?.body?.data?.[0]?.likes;

    const updatedBlog = await request(app)
      .put(`/api/blogs/${blogId}`)
      .send({ likes: 10 });
    const updatedLikes = updatedBlog?.body?.data?.likes;

    assert.notEqual(blogLikes, updatedLikes);
    assert.equal(10, updatedLikes);
  });
});
