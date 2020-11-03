export default class Recepie {
	constructor(id) {
		this.id = id;
	}

	async getRecepie() {
		try {
			// we need to fetch the recepie itslef from the forkify api
			const blob = await fetch(
				`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
			);

			const json = await blob.json();
			//console.log(json);
			const recipe = json.recipe;
			//console.log(recipe);

			this.ingredientList = recipe.ingredients;

			this.publisher = recipe.publisher;
			this.title = recipe.title;
			this.image = recipe.image_url;
			this.source_url = recipe.source_url;
		} catch (error) {
			console.log(error);
		}
	}
	cookTime() {
		// we dont exactly know how much time it takes. SO lets assume that for every 3 ingredients it takes 15 minutes.
		const numIng = this.ingredientList.length;
		const periods = Math.ceil(numIng / 3);
		this.time = periods * 15; // 15 min per 3 ingredients
	}
	calcServings() {
		this.servings = 4;
	}
	//this method is to normalize the ingredient list as per our liking and get the units straight
	parseIngredirents() {
		const unitLong = [
			'tablespoons',
			'tablespoon',
			'ounces',
			'ounce',
			'teaspoons',
			'teaspoon',
			'cups',
			'pound',
		];
		const unitShort = [
			'tbsp',
			'tbsp',
			'oz',
			'oz',
			'tsp',
			'tsp',
			'cup',
			'pound',
			'oz,',
		];

		const newingredients = this.ingredientList.map((el) => {
			//1) uniform units
			// grabs a raw ingredient and converts into lowercase. foreach loops through uniLong and replaces any word that it finds similar in raw ingredient to similar word in unitShort
			let ingredient = el.toLowerCase();
			unitLong.forEach((unit, i) => {
				ingredient = ingredient.replace(unit, unitShort[i]);
			});
			//console.log(ingredient);
			//2)remove brackets
			ingredient = ingredient.replace(/ *\([^)]*\) */g, ' '); // this is a regEx which replaces parathesis

			//3) parse into units, counts and ingredienst
			const arrIng = ingredient.split(' '); //this retruns an array with words of each ingredient
			const unitIndex = arrIng.findIndex((el2) => unitShort.includes(el2)); // here the findIndex() returns the index of arrIng where the callback function turns out to be true
			let objIng;
			if (unitIndex > -1) {
				//there is a unit
				const arrCount = arrIng.slice(0, unitIndex); // 4 1/2 cups will give ['4', '1/2']
				let count;
				if (arrCount.length === 1) {
					count = eval(arrIng[0].replace('-', '+'));
					count = Math.round(count * 100) / 100;
				} else {
					count = eval(arrIng.slice(0, unitIndex).join('+'));
					count = Math.round(count * 100) / 100;
				}
				objIng = {
					count,
					unit: arrIng[unitIndex],
					ingredient: arrIng.slice(unitIndex + 1).join(' '),
				};
			} else if (parseInt(arrIng[0], 10)) {
				//no unit but, 1st element is a number
				objIng = {
					count: parseInt(arrIng[0], 10),
					unit: '',
					ingredient: arrIng.slice(1).join(' '),
				};
			} else if (unitIndex === -1) {
				//there is no unit and no number in 1st position
				objIng = {
					count: 1,
					unit: '',
					ingredient, //ws6 we can use object delclaration like this
				};
			}
			return objIng;
		});
		this.ingredientList = newingredients;
	}

	updateServings(type) {
		//type is increase or decrease
		//servings
		const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

		//ingredients
		this.ingredientList.forEach((ing) => {
			ing.count *= newServings / this.servings;
		});

		this.servings = newServings;
	}
}
