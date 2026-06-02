import { Page } from "@playwright/test";

export class SearchResultsPage {
  constructor(private page: Page) {}

  async locateSearchResults(productName: string) {
    return this.page.getByText(`results for "${productName}"`);
  }

  async locateProduct(productLabel: string) {
    return this.page.getByLabel(productLabel);
  }
}