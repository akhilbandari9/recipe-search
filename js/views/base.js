export const elements = {
	/**SearchView Elemenst */
	searchForm: document.querySelector('.search'),
	searchInput: document.querySelector('.search__field'),
	searchResList: document.querySelector('.results__list'),
	resultsDiv: document.querySelector('.results'),
	searchResPages: document.querySelector('.results__pages'),
	/**Recepie View Elements */
	recipeContainer: document.querySelector('.recipe'),
	addToList: document.querySelector('.recipe__btn-add'),
	/** List View Elemenst */
	shopList: document.querySelector('.shopping__list'),
	likesMenu: document.querySelector('.likes__field'),
	likesList: document.querySelector('.likes__list'),
};

export const elementNames = {
	loader: 'loader',
};
//implementing the loading spinner
export const renderLoader = (parent) => {
	// here it is the parent element where the loader is shown
	const loader = `
            
        <div class="${elementNames.loader}">
        <svg>
        <use href= "img/icons.svg#icon-cw"></use>
        </svg>
        </div>
                    `;

	parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
	const loader = document.querySelector('.' + elementNames.loader);
	if (loader) {
		loader.remove();
	}
};

export const searchTerms = [
	'apple',
	'apricot',
	'arepas',
	'artichoke',
	'asparagus',
	'avocado',
	'bacon',
	'banana',
	'basil',
	'bbq',
	'bean',
	'beef',
	'beetroot',
	'blackberry',
	'blackcurrant',
	'blueberry',
	'boysenberry',
	'broccoli',
	'brussel sprouts',
	'bunny chow',
	'cabbage',
	'cake',
	'carrot',
	'cauliflower',
	'celery',
	'champ',
	'cherry',
	'chicken',
	'chickpea',
	'chili',
	'chili',
	'chips',
	'chocolate',
	'cinnamon',
	'coconut',
	'coriander',
	'corn',
	'crab',
	'croissant',
	'cucumber',
	'curry',
	'dill',
	'donuts',
	'duck',
	'fajitas',
	'fig',
	'fish',
	'fries',
	'garlic',
	'goat',
	'grape',
	'grapefruit',
	'green bean',
	'green pepper',
	'ham',
	'hamburger',
	'hummus',
	'ice cream',
	'kebab',
	'ketchup',
	'kiwifruit',
	'lamb',
	'lasagna',
	'leek',
	'lemon',
	'lentil',
	'lettuce',
	'lime',
	'lobster',
	'lychee',
	'mandarin',
	'mango',
	'maple syrup',
	'marzipan',
	'masala',
	'melon',
	'mushrooms',
	'nectarine',
	'onion',
	'orange',
	'oregano',
	'paella',
	'papaya',
	'parma ham',
	'parsley',
	'passion fruit',
	'pasta',
	'peach',
	'pear',
	'peas',
	'pepperoni',
	'pie',
	'pierogi',
	'pineapple',
	'pizza',
	'plum',
	'poke',
	'pomegranate',
	'popcorn',
	'pork',
	'potato',
	'poutine',
	'pudding',
	'pumpkin',
	'quince',
	'radish',
	'raspberry',
	'red pepper',
	'rendang',
	'ribs',
	'rosemary',
	'saffron',
	'salad',
	'salami',
	'sausage',
	'seafood',
	'som tam',
	'steak',
	'strawberry',
	'sushi',
	'sweet potato',
	'tacos',
	'toast',
	'tofu',
	'tomato',
	'turkey',
	'watermelon',
	'zucchini',
];