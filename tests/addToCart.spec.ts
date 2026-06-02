import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homepage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { BASE_URL } from "../playwright.config";

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
});

test('[TC-01] Add product to cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchResultsPage = new SearchResultsPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  const productName = 'a1707';
  const productLabel = 'Battery for Apple Macbook Pro Retina 15,4 A1820, A1707 (2016-2017)';

  // Home Page
  await homePage.openHelpCenter();
  await homePage.searchProduct(productName);

  // Search Results
  const resultsHeader = await searchResultsPage.locateSearchResults(productName);
  const productContainer = await searchResultsPage.locateProduct(productLabel);
  await expect(resultsHeader).toBeVisible();
  await expect(productContainer).toBeVisible();

  // Product Page
  await productPage.addToCart(productLabel);

  // Cart Page
  await cartPage.navigateToCart();
  const cartHeader = await cartPage.locateCartHeader();
  const qtyElement = await cartPage.locateQty();
  await expect(cartHeader).toBeVisible();
  await expect(qtyElement).toBeVisible();
  await cartPage.proceedToCheckout();
});
