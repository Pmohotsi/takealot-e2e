import { Page } from "@playwright/test";

export class ProductPage {
  constructor(private page: Page) {}

  async addToCart(productLabel: string) {
    const productContainer = this.page.getByLabel(productLabel);
    const addToCartButton = productContainer.getByRole('button', { name: 'Add to Cart' });
    await addToCartButton.click();
  }
}
