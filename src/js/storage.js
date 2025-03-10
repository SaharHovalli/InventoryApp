const product = [
  {
    id: 1,
    title: "mushroom",
    category: "Protein material",
    createdAt: "2023-10-31T15:07:25.556Z",
  },
  {
    id: 2,
    title: "rice",
    category: "Legumes and grains",
    createdAt: "2021-09-31T15:05:12.556Z",
  },
  {
    id: 3,
    title: "fish",
    category: "Protein material",
    createdAt: "2022-10-30T15:03:44.556Z",
  },
];

const categories = [
  {
    id: 1,
    title: "Protein material",
    description: "Protein ingredients in stock",
    createdAt: "2022-10-30T15:03:44.556Z",
  },
  {
    id: 2,
    title: "Legumes and grains",
    description: "All kinds of beans and grains available in the warehouse",
    createdAt: "2022-04-30T15:03:44.556Z",
  },
];

export default class Storage {
  static getAllCategories() {
    try {
      const savedCategories =
        JSON.parse(localStorage.getItem("category")) || [];
      return savedCategories.sort((a, b) =>
        new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1
      );
    } catch (error) {
      console.error("Error reading categories from localStorage:", error);
      return [];
    }
  }
  static savedCategory(categoryToSave) {
    try {
      const savedCategories = Storage.getAllCategories();
      const existItem = savedCategories.find((c) => c.id === categoryToSave.id);
      if (existItem) {
        existItem.title = categoryToSave.title;
        existItem.description = categoryToSave.description;
      } else {
        categoryToSave.id = new Date().getTime();
        categoryToSave.createdAt = new Date().toISOString();
        savedCategories.push(categoryToSave);
      }
      localStorage.setItem("category", JSON.stringify(savedCategories));
    } catch (error) {
      console.error("Error receiving categories", error);
    }
  }
  static getAllProducts(sort = " newest") {
    try {
      const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
      return savedProducts.sort((a, b) => {
        if (sort === "newest") {
          return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
        } else if (sort === "oldest") {
          return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
        }
      });
    } catch (error) {
      console.error("Error receiving products", error);
      return [];
    }
  }
  static savedProducts(productsToSave) {
    try {
      const savedProducts = Storage.getAllProducts();
      const existItem = savedProducts.find((c) => c.id === productsToSave.id);
      if (existItem) {
        existItem.title = productsToSave.title;
        existItem.quantity = productsToSave.quantity;
        existItem.category = productsToSave.category;
      } else {
        productsToSave.id = new Date().getTime();
        productsToSave.createdAt = new Date().toISOString();
        savedProducts.push(productsToSave);
      }
      localStorage.setItem("products", JSON.stringify(savedProducts));
    } catch (error) {
      console.error("Error saving the product", error);
    }
  }
  static deleteProduct(id) {
    const savedProducts = Storage.getAllProducts();
    const filteredProducts = savedProducts.filter((p) => p.id !== parseInt(id));
    localStorage.setItem("products", JSON.stringify(filteredProducts));
  }
}
