import { type Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly shopTitle;
  readonly addToCartButtons;
  readonly topController;
  readonly nextButton;
  readonly cartButton;

  constructor(page: Page) {
    this.page = page;
    this.shopTitle = page.getByTestId("shop-title");
    this.addToCartButtons = page.getByTestId("add-to-cart-button");
    this.topController = page.getByTestId("top-controller-container");
    this.nextButton = this.topController.getByTestId("next-page-button");
    this.cartButton = page.getByTestId("cart");
  }

  async addToCartByIndex(index: number) {
    await this.addToCartButtons.nth(index).click();
  }

  async goToNextPage() {
    await this.nextButton.click();
  }
}
