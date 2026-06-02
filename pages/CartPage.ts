import { Page } from "@playwright/test";

export class CartPage {
  constructor(private page: Page) {}

  async navigateToCart() {
    const goToCartLink = this.page.getByRole('link', { name: 'Go to Cart' });
    await goToCartLink.click();
  }

  async locateCartHeader() {
    return this.page.getByRole('heading', { name: 'Shopping Cart' });
  }

  async locateQty() {
    return this.page.getByLabel('Qty:12345678910+');
  }

  async proceedToCheckout() {
    const checkoutLink = this.page.getByRole('link', { name: 'Proceed to Checkout' });
    await checkoutLink.click();
  }
}
