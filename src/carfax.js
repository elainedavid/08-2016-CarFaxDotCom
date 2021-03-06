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

// filter by refactoring
var filterByColor = function(collection, inputColor) {	
	return toolbelt.filterBy(collection, function(element) {
		return element["color"] === inputColor;
	});
}
console.log("Filter By Color (Refactor)");
var redCars = filterByColor(carData, "red");
console.dir(redCars);

var filterAboveYear = function(collection, year) {
	return toolbelt.filterBy(collection, function(element) {
		return element["year"] > year;
	});
};
console.log("Filter Above Year (Refactor)");
var carsAbove2010 = filterAboveYear(carData, 2010);
console.dir(carsAbove2010);

var filterBelowYear = function(collection, year) {
	return toolbelt.filterBy(collection, function(element) {
		return element["year"] < year;
	});
};
console.log("Filter Below Year (Refactor)");
var carsBelow2000 = filterBelowYear(carData, 2000);
console.dir(carsBelow2000);

var filterBetweenYears = function(collection, startYear, endYear) {
	return toolbelt.filterBy(collection, function(element) {
		return element["year"] > startYear && element["year"] < endYear;
	});
};
console.log("Filter Between Years");
var carsBetween2010To2015 = filterBetweenYears(carData, 2010, 2015);
console.dir(carsBetween2010To2015);

var averagePriceCalculator = function(collection) {
	var averagePrice = 0;
	toolbelt.loop(collection, function(element) {
		averagePrice = averagePrice + element;
	});
	return Math.round(averagePrice / collection.length);
};
console.log("Average Price Calculator");
database["currentAveragePrice"] = averagePriceCalculator(database["currentPrices"]);
console.log(database["currentAveragePrice"]);

var mostExpensiveCar = function(collection) {
	var result = {
		price: 0
	};
	toolbelt.loop(collection, function(element) {
		if (element["price"] > result["price"]) {
			result = element;
		}
	});
	return result;
};
console.log("Most Expensive Car");
database["mostExpensiveCar"] = mostExpensiveCar(carData);
console.log(database["mostExpensiveCar"]);

var leastExpensiveCar = function(collection) {
	var result = {
		price: 0
	};
	toolbelt.loop(collection, function(element) {
		if (element["price"] < result["price"] || result["price"] === 0) {
			result = element;
		}
	});
	return result;
};
console.log("Least Expensive Car");
database["leastExpensiveCar"] = leastExpensiveCar(carData);
console.log(database["leastExpensiveCar"]);

var averagePriceCalculator = function(collection) {
	var averagePrice = toolbelt.distill(collection, function(element, currentValue) {
		return element + currentValue;
	}, 0);	
	return Math.round(averagePrice / collection.length);
};
console.log("Average Price Calculator (Refactor)");
console.log(averagePriceCalculator(database["currentPrices"]));

var mostExpensiveCar = function(collection) {
	return toolbelt.distill(collection, function(element, currentValue) {
		if (element["price"] > currentValue["price"]) {
			return element;
		} else {
			return currentValue;
		}
	}, {price: 0});
};
console.log("Most Expensive Car (Refactor)");
var carResult = mostExpensiveCar(carData);
console.log(carResult);

var leastExpensiveCar = function(collection) {
	return toolbelt.distill(collection, function(element, currentValue) {
		if (element["price"] < currentValue["price"] || currentValue["price"] === 0) {
			return element;
		} else {
			return currentValue;
		}
	}, {price: 0});	
};
console.log("Least Expensive Car (Refactor)");
var carResult = leastExpensiveCar(carData);
console.log(carResult);

// data modeling
var makeAndModelMatrix = function(collection) {
	return toolbelt.transform(collection, function(element) {
		return [element.make, element.model];
	});
};
console.log("Make and Model Matrix");
var resultMatrix = makeAndModelMatrix(carData);
console.dir(resultMatrix);

var calculateTotalCarsByMake = function(collection) {
	var result = {};
	// first find all the distinct makes in the car collection
	toolbelt.loop(collection, function(element) {
		if (!result.hasOwnProperty(element["make"])) {
			result[element["make"]] = 0;
		}
	});
	// loop through all the makes and get the total for each
	// TODO: possibly refactor this to simplify the matching logic without the need for the loop
	toolbelt.loop(result, function(value, key) {
		result[key] = toolbelt.distill(collection, function(element, currentValue) {
			if (element["make"] === key) {
				return value++;
			} else {
				return value;
			}
		}, 0);
		//console.log("Total for " + key + ": " + result[key]);
	});
	return result;
};
console.log("Calculate Total Cars By Make");
var carsTotal = calculateTotalCarsByMake(carData);
console.log(carsTotal);
