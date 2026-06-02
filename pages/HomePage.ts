import { Page } from "@playwright/test";

export class HomePage {
  constructor(private page: Page) {}

  async openHelpCenter() {
    const helpCenterSelector = 'div:has-text("Help CentreSell on")';
    await this.page.locator(helpCenterSelector).nth(2).waitFor({ state: "visible" });
  }

  async searchProduct(productName: string) {
    const searchBox = this.page.getByPlaceholder('Search for products, brands...');
    const searchButton = this.page.getByRole('button', { name: 'search' });
    await searchBox.click();
    await searchBox.fill(productName);
    await searchButton.click();
  }
}