import { elements, searchTerms } from './base.js';

export const getInput = () => {
	const userInput = elements.searchInput.value;
	if (searchTerms.includes(userInput)) {
		return userInput;
	} else {
		alert('Not a search Term');
		clearInput();
	}
};
export const clearInput = () => {
	elements.searchInput.value = '';
};

export const clearResults = () => {
	//clearing out the results in results tab
	elements.searchResList.innerHTML = '';

	//clearing out the pagination buttons
	elements.searchResPages.innerHTML = '';
};

/**
    'Pasta with tomato and spinach '
    acc= 0 / acc+ cur.length = 5 / newTitle = ['Pasta']
    acc= 5 / acc+ cur.length = 9 / newTitle = ['Pasta', 'with']
    acc = 9 / acc+ cur.length = 15 / newTitle = ['Pasta', 'with', 'tomato']
    acc = 15 / acc+ cur.length = 18 *loop breaks* / newTitle = ['Pasta', 'with', 'tomato']
 */

const limitRecipeTitle = (title, limit = 17) => {
	const newTitle = [];
	if (title.length > limit) {
		title.split(' ').reduce((acc, cur) => {
			if (acc + cur.length <= limit) {
				newTitle.push(cur);
			}
			return acc + cur.length;
		}, 0);
		//return the result
		return `${newTitle.join(' ')}...`;
	}
	return title;
};
//function which reners the item view in results tab
const rendorRecipe = (recipe) => {
	const markup = `
            <li>
            <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
            </div>
            </a>
            </li>`;
	elements.searchResList.insertAdjacentHTML('beforeend', markup);
};
//function to just return a template string based on type and page number
// type tells if the button should go back or forward
// type can be 'prev' or 'next'
const createPageButton = (page, type) =>
	`
	<button class="btn-inline results__btn--${type}" data-goto=${
		type === 'prev' ? page - 1 : page + 1
	}>
    
	<span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
	<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${
			type === 'prev' ? 'left' : 'right'
		}"></use>
    </svg>
    </button>	
	`;

//function to implement pagination
const renderButtons = (page, numResults, resPerPage) => {
	const pages = Math.ceil(numResults / resPerPage); // number of pages to display = number of results received / results per page that we want . // math.ceil rounds to the next integer. eg. 4.5 gives 5
	let button;
	if (page === 1 && pages > 1) {
		//only one button to go to next page
		button = createPageButton(page, 'next');
	} else if (page < pages) {
		// we want both buttons
		button = `${createPageButton(page, 'prev')}
					${createPageButton(page, 'next')};`; // this renders two buttons as it is called twice.
	} else if (page === pages && pages > 1) {
		//this is last page
		//only one button to go to previous page
		button = createPageButton(page, 'prev');
	}

	elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (resultArray, page = 1, resPerPage = 10) => {
	// to display only resPerPage number of results
	//render results of current page
	const start = (page - 1) * resPerPage;
	const end = page * resPerPage;

	resultArray.slice(start, end).forEach(rendorRecipe); //loops over the result array and passes each result array element into rendorRecepie, where it renders it onto the page.

	//render pagination buttons
	renderButtons(page, resultArray.length, resPerPage);
};
