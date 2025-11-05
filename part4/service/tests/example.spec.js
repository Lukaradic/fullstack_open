import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("textbox", { name: "Username" }).click();
  await page.getByRole("textbox", { name: "Username" }).fill("lar");
  await page.getByRole("textbox", { name: "Username" }).press("Tab");
  await page.getByRole("textbox", { name: "Password" }).fill("123");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByTestId("blog--btn__show-details").first().click();
  await page.getByTestId("blog--btn__show-details").first().click();
  await page.getByTestId("blog--btn__show-details").nth(1).click();
  await page.getByTestId("blog--btn__like").click();
  await page.getByRole("button", { name: "hide" }).click();
  await page.getByRole("button", { name: "Logout" }).click();
});
