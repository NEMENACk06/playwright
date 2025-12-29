import { type Locator, type Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartTitle: Locator;
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartTitle = page.getByTestId("top-controller-container");
    this.checkoutButton = page.getByTestId("checkout-button");
    this.cartItems = page.getByTestId("cart-item");
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  getCartItemByProductCode(productCode: string): Locator {
    return this.cartItems.filter({
      hasText: productCode,
    });
  }

  getProductPriceByProductCode(productCode: string): Locator {
    return this.getCartItemByProductCode(productCode).getByTestId("price");
  }

  getProductCodeByProductCode(productCode: string): Locator {
    return this.getCartItemByProductCode(productCode).getByTestId("sku");
  }
}
