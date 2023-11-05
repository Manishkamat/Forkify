import * as model from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";

import "core-js";
import "regenerator-runtime";

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
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search query
    await model.loadSearchResult(query);

    // 3) render results
    console.log(model.state.search.results);

  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchQuery);
};

init();
