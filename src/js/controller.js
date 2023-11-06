import * as model from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import resulstView from "./views/resulstView";
import paginationView from "./views/paginationView";

import "core-js";
import "regenerator-runtime";
import resulstView from "./views/resulstView";

if (module.hot) module.hot.accept();

///////////////////////////////////////
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) throw new Error("No ID");

    recipeView.renderSpinner();

    // 1) load recipe
    await model.loadRecipe(id);

    // 2) render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    // console.error(err);
    recipeView.renderError(err);
  }
};

const controlSearchQuery = async function () {
  try {
    resulstView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search query
    await model.loadSearchResult(query);

    // 3) Render results
    // resulstView.render(model.state.search.results);
    resulstView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resulstView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchQuery);
  paginationView.addHandlerClick(controlPagination);
};

init();
