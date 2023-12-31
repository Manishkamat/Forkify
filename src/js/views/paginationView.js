import View from "./View";
import icon from "url:../../img/icons.svg";

class Pagination extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._nextPage(curPage);
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._prevPage(curPage);
    }

    // Other page
    if (curPage < numPages) {
      return `${this._prevPage(curPage)}${this._nextPage(curPage)}`;
    }

    // Page 1, and there are No other pages
    if (curPage === numPages) {
      return "";
    }
  }

  _prevPage(curPage) {
    return `
         <button data-goto="${
           curPage - 1
         }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
      `;
  }

  _nextPage(curPage) {
    return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
  }
}

export default new Pagination();
