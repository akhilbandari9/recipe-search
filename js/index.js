import { elements, renderLoader, clearLoader } from './views/base.js';
import Search from './models/Search.js';
import Recepie from './models/Recepie.js';
import List from './models/List.js';
import * as searchView from './views/searchView.js';
import * as recipeView from './views/recipeView.js';
import * as listView from './views/listView.js';
import * as likesView from './views/likesView.js';
import Likes from './models/Likes.js';

/** Global state of the app
 * - Search object
 * - Current recepie object
 * - shopping list object
 * - Liked recepies
 */

const state = {};

/** SEARCH CONTROLLER */
const controlSearch = async () => {
	// 1. get query from view
	const query = searchView.getInput();
	//console.log(query);
	//if there is a query
	if (query) {
		//2. new search object and add it to state
		state.search = new Search(query);
		// 3. Prepare UI for results
		searchView.clearInput();
		searchView.clearResults();
		renderLoader(elements.resultsDiv);
		//4. search for recepies
		await state.search.getResults(); //getResults is a async function and every async function returns a promise automatically
		// const search = new Search('pizza');
		// console.log(search);
		// search.getResults(); //this method call adds 'this.results' to the object 'search'

		// 5. render results on UI (since we have to display results only after getting the results, we await for the results)
		clearLoader();
		searchView.renderResults(state.search.result); //here the default parameters are taken.
	}
};

// this event is activated once the 'search' buton is hit
elements.searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	controlSearch();
});

//pagination buttons event
elements.searchResPages.addEventListener('click', (e) => {
	const btn = e.target.closest('.btn-inline'); // closest method picks up the given parameter (here the .btn-inline class) even if the target is any other elements inside the parameter which are added for styling purposes.

	if (btn) {
		const goToPage = parseInt(btn.dataset.goto, 10); //this is read from the html dataset
		//console.log(goToPage);
		searchView.clearResults(); //if we dont use clear results, the next statement adds the next page results just beloe the existing results
		searchView.renderResults(state.search.result, goToPage); // this is to render results if there are more than one page
	}
});

/** RECEPIE CONTROLLER */

const controlRecepie = async () => {
	const id = window.location.hash.replace('#', ''); // window.location gives the complete Url, .hash gives the hash of the url

	if (id) {
		//1.prepare Ui for changes
		recipeView.clearRecipe();
		renderLoader(elements.recipeContainer);
		// 2. create recepie object based on recepie ID slected
		state.recipe = new Recepie(id);

		try {
			//3. get recepie data
			await state.recipe.getRecepie();
			console.log(state.recipe);
			state.recipe.parseIngredirents();
			//4. call servings and time
			state.recipe.cookTime();
			state.recipe.calcServings();

			//5.render UI
			clearLoader();
			recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
		} catch (e) {
			console.log(e);
		}
	}
};

// fire up this event for any hash changes
// window.addEventListener('hashchange', controlRecepie);
//what happens is whenever we load the page for the first time, there is a previos hash ID already in the url, and there is nothing displayed on the page related to that ID. to overcome that, we do the below
// window.addEventListener('load', controlRecepie);
// this works, but if there are more events, this will be a problem, to avoid that we write the above two lines of code as below

['hashchange', 'load'].forEach((event) =>
	window.addEventListener(event, controlRecepie)
);
/** LIST CONTROLLER */

const controlList = () => {
	//create a new List IF there is none yet
	if (!state.list) {
		state.list = new List();
		//	console.log(state.list.items);
	}
	//this loops over ingredient list and calls addItem at each Item
	state.recipe.ingredientList.forEach((el) => {
		const item = state.list.addItem(el.count, el.unit, el.ingredient);

		listView.renderItem(item);
	});
};

//handling list update count and delete events
elements.shopList.addEventListener('click', (e) => {
	const id = parseFloat(e.target.closest('.shopping__item').dataset.itemid);

	if (e.target.matches('.shopping__delete, .shopping__delete *')) {
		//delete from state
		state.list.deleteItem(id);

		//detelet from ui
		listView.deleteItem(id);
	} else if (e.target.matches('.shopping__count-input')) {
		const val = parseInt(e.target.value, 10);
		//since the click already matches with the click, we can direcly get the value form target
		state.list.updateCount(id, val);
		console.log(state.list);
	}
});

const controlLike = () => {
	if (!state.likes) state.likes = new Likes();
	const currentId = state.recipe.id;

	if (!state.likes.isLiked(currentId)) {
		//user not yet likes current recipe
		//add like to state
		const newLike = state.likes.addLike(
			currentId,
			state.recipe.title,
			state.recipe.publisher,
			state.recipe.image
		);
		//toggle the like button
		likesView.toggleLikeBtn(true);
		// add like to Ui list
		likesView.renderLike(newLike);
	} else {
		//user has likes current recipe
		//remove like form the state
		state.likes.deleteLike(currentId);
		//toggle the like button
		likesView.toggleLikeBtn(false);
		//remove ui from UI list
		likesView.deleteLike(currentId);
	}
	likesView.toggleLikesMenu(state.likes.getNumLikes());
};
//restore Likes on page load
window.addEventListener('load', () => {
	state.likes = new Likes();
	state.likes.readStorage();
	likesView.toggleLikesMenu(state.likes.getNumLikes());
	//render existing
	state.likes.likes.forEach((like) => likesView.renderLike(like));
});

//handling recepie increase or decrease button clicks
elements.recipeContainer.addEventListener('click', (e) => {
	if (e.target.matches('.btn-decrease, .btn-decrease *')) {
		//servings decrease clicked
		if (state.recipe.servings > 1) {
			state.recipe.updateServings('dec');
			recipeView.updateServIngredients(state.recipe);
		}
	} else if (e.target.matches('.btn-increase, .btn-increase *')) {
		//servings increase clicked
		state.recipe.updateServings('inc');
		recipeView.updateServIngredients(state.recipe);
	} else if (e.target.matches('.recipe__btn-add, .recipe__btn-add *')) {
		//add to shoopping list buttton clicked
		controlList();
	} else if (e.target.matches('.recipe__love, .recipe__love *')) {
		controlLike();
	}
});
