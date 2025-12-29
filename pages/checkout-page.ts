import { type Page } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameField;
  readonly lastNameField;
  readonly emailField;
  readonly zipCodeField;
  readonly confirmPaymentButton;
  readonly subTotalPrice;
  readonly shippingFee;
  readonly vat;
  readonly totalPrice;

  constructor(page: Page) {
    this.page = page;
    this.firstNameField = page.getByTestId("firstname-field");
    this.lastNameField = page.getByTestId("lastname-field");
    this.emailField = page.getByTestId("email-field");
    this.zipCodeField = page.getByTestId("zipcode-field");
    this.confirmPaymentButton = page.getByTestId("confirm-payment-button");
    this.subTotalPrice = page.getByTestId("subtotal-price");
    this.shippingFee = page.getByTestId("shipping-fee");
    this.vat = page.getByTestId("vat");
    this.totalPrice = page.getByTestId("total-price");
  }

  async fillCheckoutForm(
    firstName: string,
    lastName: string,
    email: string,
    zipCode: string
  ) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.emailField.fill(email);
    await this.zipCodeField.fill(zipCode);
  }

  getSummaryPrices() {
    return {
      subTotal: this.subTotalPrice,
      shipping: this.shippingFee,
      vat: this.vat,
      total: this.totalPrice,
    };
  }

  async clickConfirmPaymentButton() {
    await this.confirmPaymentButton.click();
  }
}
