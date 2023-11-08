import icon from "url:../../img/icons.svg";
import View from "./View";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipes found for your query! Please try again :)";
  _message = "";

  _generateMarkup() {
    return this._data.map((res) => this._generateMarkupPreview(res)).join("");
  }

  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);

    return `
    <li class="preview">
        <a class="${
          result.id === id ? "preview__link--active" : ""
        } preview__link" href="#${result.id}">
            <figure class="preview__fig">
            <img src="${result.img}" alt="${result.title}" />
            </figure>
            <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
            </div>
        </a>
        </li>
    `;
  }
}

export default new ResultsView();
