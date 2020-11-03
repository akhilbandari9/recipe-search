export default class List {
	constructor() {
		this.items = []; // when we call the list object an empty array is created, then later changes are pushed into this array.
	}

	addItem(count, unit, ingredient) {
		const item = {
			id:
				Math.floor(Math.random() * (9999 - 999) + 999) *
				Math.floor(Math.random() * (999 - 99) + 99),
			//jonas used a third party library to generate unique ids evertime.
			count,
			unit,
			ingredient,
		};
		this.items.push(item);
		return item;
	}
	deleteItem(id) {
		const index = this.items.findIndex((el) => el.id === id);
		this.items.splice(index, 1);
	}

	updateCount(id, newCount) {
		//console.log(this.items.count); //undefined
		this.items.find((el) => el.id === id).count = newCount;
	}
}
