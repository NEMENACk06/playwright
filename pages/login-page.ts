import { type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.getByTestId("login-field");
    this.passwordField = page.getByTestId("password-field");
    this.submitButton = page.getByTestId("submit-button");
    this.errorMessage = page.getByTestId("error-message-label");
  }

  async goto() {
    await this.page.goto("/");
  }

  async loginWith(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.submitButton.click();
  }

  getErrorMessageLocator(): Locator {
    return this.errorMessage;
  }
}