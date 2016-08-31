var database = database.carDataBase
var carData = database.carData;
console.log(carData);

// testing for toolbelt
var logger = function(element) {
	console.log(element);
}

var testArray = [1,2,3,4];
toolbelt.loop(testArray, logger);

var results = toolbelt.transform(testArray, function(element) {
	return element * 2;
});
toolbelt.loop(results, logger);

// backend data parsers
var priceParser = function(carCollection) {
	return toolbelt.transform(carCollection, function(carObject) {
		return carObject.price;
	});
};
console.log("Price Parser");
database["currentPrices"] = priceParser(carData);
console.dir(database["currentPrices"]);
//toolbelt.loop(database["currentPrices"], logger);

var yearParser = function(carCollection) {
	return toolbelt.transform(carCollection, function(carObject) {
		return carObject.year;
	});
};
console.log("Year Parser");
database["currentYears"] = yearParser(carData);
console.dir(database["currentYears"]);
//toolbelt.loop(database["currentYears"], logger);

var averageAgeCalculator = function(carCollection) {
	var totalYear = 0;
	toolbelt.loop(yearParser(carCollection), function(element) {
		totalYear = totalYear + element;
	});
	return Math.round(totalYear / carCollection.length);
};
console.log("Average Age Calculator");
database["currentAverageAge"] = averageAgeCalculator(carData);
logger(database["currentAverageAge"]);

// frontend filters
var equals = function(element, value) {
	return element === value;
};

var filterByColor = function(collection, inputColor) {
	var allMatchingCars = [];
	toolbelt.loop(collection, function(element) {
		if (equals(element["color"], inputColor)) {
			allMatchingCars.push(element);
		}
	});
	return allMatchingCars;
};
console.log("Filter By Color");
var silverCars = filterByColor(carData, "silver");
console.dir(silverCars);

var greaterThan = function(element, value) {
	return element > value;
};

var lessThan = function(element, value) {
	return element < value;
};

var filterAboveYear = function(collection, year) {
	var allMatchingCars = [];
	toolbelt.loop(collection, function(element) {
		if (greaterThan(element["year"], year)) {
			allMatchingCars.push(element);
		}
	});
	return allMatchingCars;
};
console.log("Filter Above Year");
var carsAbove2010 = filterAboveYear(carData, 2010);
console.dir(carsAbove2010);

var filterBelowYear = function(collection, year) {
	var allMatchingCars = [];
	toolbelt.loop(collection, function(element) {
		if (lessThan(element["year"], year)) {
			allMatchingCars.push(element);
		}
	});
	return allMatchingCars;
};
console.log("Filter Below Year");
var carsBelow2000 = filterBelowYear(carData, 2000);
console.dir(carsBelow2000);

