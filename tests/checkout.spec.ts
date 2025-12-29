import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page.ts";
import { HomePage } from "../pages/home-page.ts";
import { CartPage } from "../pages/cart-page.ts";
import { CheckoutPage } from "../pages/checkout-page.ts";
import { ThankyouPage } from "../pages/thankyou-page.ts";

test.describe("Checkout Flow", () => {
  test("user can add item in first page and checkout successfully", async ({
    page,
  }) => {
    const login = new LoginPage(page);
    const home = new HomePage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);
    const thankyou = new ThankyouPage(page);

    await test.step("login to website", async () => {
      await login.goto();
      await login.loginWith("customer1", "password");
      await expect(home.shopTitle).toBeVisible();
    });

    await test.step("add item to cart", async () => {
      await expect(page.getByTestId("cart-items-count")).toHaveText("0");
      await home.addToCartByIndex(0);
      await expect(page.getByTestId("cart-items-count")).toHaveText("1");
    });

    await test.step("open cart", async () => {
      await home.cartButton.click();
      await expect(cart.cartTitle).toBeVisible();
      await expect(cart.getCartItemByProductCode("0000000001")).toHaveCount(1);
      await expect(cart.getProductPriceByProductCode("0000000001")).toHaveText(
        "79.69"
      );
    });

    await test.step("checkout item in cart", async () => {
      await cart.proceedToCheckout();
      await checkout.fillCheckoutForm(
        "Nisit",
        "Noonuan",
        "nack@mailinator.com",
        "12345"
      );

      const summary = checkout.getSummaryPrices();

      await expect(summary.subTotal).toHaveText("79.69");
      await expect(summary.shipping).toHaveText("0");
      await expect(summary.vat).toHaveText("5.58");
      await expect(summary.total).toHaveText("85.27");
    });

    await test.step("confirm payment and show thank you message", async () => {
      await checkout.clickConfirmPaymentButton();
      await expect(thankyou.thankYouContainer).toBeVisible();
    });
  });
});
