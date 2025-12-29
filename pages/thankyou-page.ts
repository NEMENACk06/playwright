import { Page } from "@playwright/test";

export class ThankyouPage {
  readonly page: Page;
  readonly thankYouContainer;

  constructor(page: Page) {
    this.page = page;
    this.thankYouContainer = this.page.getByTestId("thank-you-container");
  }
}