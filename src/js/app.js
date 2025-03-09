import categoryView from "./categoryView.js";
import productView from "./productView.js";

document.addEventListener("DOMContentLoaded", () => {
  try {
    categoryView.setApp();
    productView.setApp();
  } catch (error) {
    console.error("Error initializing the app:", error);
    alert("Something went wrong while loading data.");
  }

  categoryView.createCategoriedList();
  productView.createProductsList(productView.products);
});
