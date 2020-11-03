export default class Search {
	constructor(query) {
		this.query = query;
	}
	//this is a method of the class
	async getResults() {
		try {
			const blob = await fetch(
				`https://forkify-api.herokuapp.com/api/search?q=${this.query}`
			);

			const json = await blob.json();
			// console.log(json);
			this.result = json.recipes;
			// console.log(this.result); //array of recepies related to query
		} catch (error) {
			console.log(error);
		}
	}
}
