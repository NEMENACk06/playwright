import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page.ts";

test.describe("ODT Merchandise Login Flow", () => {
  test("Login success", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.loginWith("customer1", "password");

    await expect(page).toHaveURL(
      "https://merchandise-dev.odds.team/store.html"
    );
  });

  test("Login fail", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.loginWith("invalidUser", "invalidPass");

    await expect(loginPage.errorMessage).toHaveText(
      "Invalid username or password."
    );
    await expect(page).toHaveURL("https://merchandise-dev.odds.team/");
  });

  test("Login with empty fields", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.loginWith("", "");

    await expect(loginPage.errorMessage).toHaveText(
      "Invalid username or password."
    );
    await expect(page).toHaveURL("https://merchandise-dev.odds.team/");
  });
});
