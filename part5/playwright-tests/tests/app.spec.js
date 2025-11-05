import { test, expect, beforeEach, describe } from "@playwright/test";

const userData = {
  username: "admin",
  password: "root",
  name: "admin",
};

// describe("Blog app", () => {
//   beforeEach(async ({ page, request }) => {
//     await request.post("http://localhost:5173/api/testing/reset");
//     await request.post("http://localhost:5173/api/users", {
//       data: {
//         name: userData.name,
//         username: userData.username,
//         password: userData.password,
//       },
//     });
//     await page.goto("http://localhost:5173/");
//   });

//   test("Show login form", async ({ page }) => {
//     const form = page.locator("form");
//     const usernameInput = form.getByTestId("form--username");
//     const passwordInput = form.getByTestId("form--password");
//     const submitBtn = form.getByTestId("form--button__submit");

//     await expect(usernameInput).toBeVisible();
//     await expect(passwordInput).toBeVisible();
//     await expect(submitBtn).toBeVisible();
//   });

//   test("Test fialed login", async ({ page }) => {
//     await page.getByTestId("form--username").fill(userData.username);
//     await page.getByTestId("form--password").fill("badPassword");
//     await page.getByTestId("form--button__submit").click();

//     const notification = page.getByTestId("notification");

//     await expect(notification).toBeVisible();
//     await expect(notification).toHaveClass("notification error");
//   });

//   test("Correct login", async ({ page }) => {
//     await page.getByTestId("form--username").fill(userData.username);
//     await page.getByTestId("form--password").fill(userData.password);
//     await page.getByTestId("form--button__submit").click();

//     await page.waitForResponse((res) => res.url().includes("/api/users/login"));

//     const userInfo = page.getByTestId("user-info");
//     await expect(userInfo).toBeVisible();
//   });
// });

describe("Logged in", () => {
  beforeEach(async ({ page, request }) => {
    //  go to the page and reset data
    await request.post("http://localhost:5173/api/testing/reset");
    await request.post("http://localhost:5173/api/users", {
      data: {
        name: userData.name,
        username: userData.username,
        password: userData.password,
      },
    });
    await page.goto("http://localhost:5173/");

    //  login user
    await page.getByTestId("form--username").fill(userData.username);
    await page.getByTestId("form--password").fill(userData.password);
    await page.getByTestId("form--button__submit").click();

    await page.waitForResponse((res) => res.url().includes("/api/users/login"));

    //  create few blogs

    const createBlogButton = page.getByTestId("create-blog--btn__show");

    await createBlogButton.click();

    const titleInput = page.getByTestId("create-blog--title");
    const authorInput = page.getByTestId("create-blog--author");
    const urlInput = page.getByTestId("create-blog--url");
    const submitBtn = page.getByTestId("create-blog--btn__submit");

    await titleInput.fill("Test title playwright");
    await authorInput.fill("Luka Radic");
    await urlInput.fill("https://playwright.dev/");

    await submitBtn.click();
    await Promise.all([
      page.waitForResponse(
        (resp) =>
          resp.url().includes("/api/blogs") &&
          resp.request().method() === "POST"
      ),
      page.waitForResponse(
        (resp) =>
          resp.url().includes("/api/blogs") && resp.request().method() === "GET"
      ),
    ]);
  });

  test("Create blog", async ({ page }) => {
    const createBlogButton = page.getByTestId("create-blog--btn__show");
    await expect(createBlogButton).toBeVisible();
    await createBlogButton.click();

    const titleInput = page.getByTestId("create-blog--title");
    const authorInput = page.getByTestId("create-blog--author");
    const urlInput = page.getByTestId("create-blog--url");
    const submitBtn = page.getByTestId("create-blog--btn__submit");

    await titleInput.fill("Test title playwright");
    await authorInput.fill("Luka Radic");
    await urlInput.fill("https://playwright.dev/");

    await Promise.all([
      page.waitForResponse(
        (resp) =>
          resp.url().includes("/api/blogs") &&
          resp.request().method() === "POST"
      ),
      page.waitForResponse(
        (resp) =>
          resp.url().includes("/api/blogs") && resp.request().method() === "GET"
      ),
      submitBtn.click(),
    ]);

    const blog = page.getByTestId("blog--container").first();
    await expect(blog).toBeVisible();
    await expect(blog.getByTestId("blog--title")).toContainText(
      "Test title playwright"
    );
  });

  test("User can like a blog post", async ({ page }) => {
    const firstBlog = page.getByTestId("blog--container").first();
    const blogId = await firstBlog.getAttribute("id");
    const viewBtn = firstBlog.getByTestId("blog--btn__show-details");

    await viewBtn.click();
    await firstBlog.getByTestId("blog--btn__like").click();

    await page.waitForResponse(
      (res) =>
        res.url().includes(`/api/blogs/${blogId}`) &&
        res.request().method() === "PUT"
    );

    await expect(firstBlog.getByTestId("blog--likes")).toContainText("1");
  });

  test("User can delete a blog post", async ({ page }) => {
    page.on("dialog", async (dialog) => await dialog.accept());

    const firstBlog = page.getByTestId("blog--container").first();
    const blogId = await firstBlog.getAttribute("id");
    const viewBtn = firstBlog.getByTestId("blog--btn__show-details");

    await viewBtn.click();

    await firstBlog.getByTestId("blog--btn__delete").click();
    //  await del req

    await page.waitForResponse(
      (res) =>
        res.url().includes(`/api/blogs/${blogId}`) &&
        res.request().method() === "DELETE"
    );

    await expect(firstBlog).not.toBeAttached();
  });

  test("Only the creator can see the delete button", async ({ page }) => {
    const firstBlog = page.getByTestId("blog--container").first();
    const blogId = await firstBlog.getAttribute("id");
    const viewBtn = firstBlog.getByTestId("blog--btn__show-details");

    await viewBtn.click();

    // await firstBlog.getByTestId("blog--btn__delete").click();
    const deleteBtn = firstBlog.getByTestId("blog--btn__delete");
    await expect(deleteBtn).toBeVisible();
  });

  // test("Blog posts are sorted by number of likes", async ({ page }) => {
  //   //  create 2  blog posts

  //   const titleInput = page.getByTestId("create-blog--title");
  //   const authorInput = page.getByTestId("create-blog--author");
  //   const urlInput = page.getByTestId("create-blog--url");
  //   const submitBtn = page.getByTestId("create-blog--btn__submit");

  //   await titleInput.fill("Test title playwright");
  //   await authorInput.fill("Luka Radic");
  //   await urlInput.fill("https://playwright.dev/");

  //   await Promise.all([
  //     page.waitForResponse(
  //       (resp) =>
  //         resp.url().includes("/api/blogs") &&
  //         resp.request().method() === "POST"
  //     ),
  //     page.waitForResponse(
  //       (resp) =>
  //         resp.url().includes("/api/blogs") && resp.request().method() === "GET"
  //     ),
  //     submitBtn.click(), // ✅ trigger the action last
  //   ]);

  //   //  like the second one

  //   const secondBlog = page.getByTestId("blog--container").nth(1);
  //   await secondBlog.getByTestId("blog--btn__show-details").click();
  //   await secondBlog.getByTestId("blog--btn__like").click();

  //   await page.waitForResponse(
  //     (res) =>
  //       res.url().includes("/api/blogs") && res.request().method() === "PUT"
  //   );

  //   await secondBlog.getByTestId("blog--blog--btn__show-details").click();

  //   const firstBlog = page.getByTestId("blog--container").nth(0);
  //   await firstBlog.getByTestId("blog--btn__show-details").click();

  //   await expect(firstBlog.getByTestId("blog--likes")).toContainText("1");
  // });
});
