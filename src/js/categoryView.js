import Storage from "./storage.js";

const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category");
const toggleAddCategorybtn = document.querySelector("#toggle-add-category");
const categoryWrapper = document.querySelector("#category-wrapper");
const cancleAddCategorybtn = document.querySelector("#cancelAdd");

class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    toggleAddCategorybtn.addEventListener("click", (e) =>
      this.toggleAddCategory(e)
    );
    cancleAddCategorybtn.addEventListener("click", (e) =>
      this.cancleAddCategory(e)
    );
    this.categories = [];
  }
  addNewCategory(e) {
    e.preventDefault();
    const title = categoryTitle.value.trim();
    const description = categoryDescription.value.trim();
    if (!title || !description) {
      alert("Please fill in all fields");
      return;
    }
    Storage.savedCategory({ title, description });
    this.categories = Storage.getAllCategories();
    this.createCategoriedList();
    categoryDescription.value = "";
    categoryTitle.value = "";
    categoryWrapper.classList.add("hidden");
    toggleAddCategorybtn.classList.remove("hidden");
  }
  setApp() {
    this.categories = Storage.getAllCategories();
  }
  createCategoriedList() {
    let result = `<option class="bg-slate-500 text-slate-300" value="">
  select a category
  </option>`;
    this.categories.forEach((element) => {
      result += `<option class="bg-slate-500 text-slate-300" value=${element.id}>${element.title}
  </option>`;
    });

    const categoryDOM = document.querySelector("#product-category");
    categoryDOM.innerHTML = result;
  }
  toggleAddCategory(e) {
    categoryWrapper.classList.remove("hidden");
    toggleAddCategorybtn.classList.add("hidden");
  }
  cancleAddCategory(e) {
    e.preventDefault();
    categoryWrapper.classList.add("hidden");
    toggleAddCategorybtn.classList.remove("hidden");
  }
}

export default new CategoryView();
