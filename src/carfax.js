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
	/*
	// solve using loop()
	var priceList = [];
	toolbelt.loop(carCollection, function(carObject) {
		priceList.push(carObject.price);
	});
	return priceList;
	*/
	// solve using transform()
	return toolbelt.transform(carCollection, function(carObject) {
		return carObject.price;
	});
};
console.log("Price Parser");
toolbelt.loop(priceParser(carData), logger);

var yearParser = function(carCollection) {
	// this assumes the output does not contain distinct year(s) but the year for each car in the collection
	return toolbelt.transform(carCollection, function(carObject) {
		return carObject.year;
	});
};
console.log("Year Parser");
toolbelt.loop(yearParser(carData), logger);

var averageAgeCalculator = function(carCollection) {
	var totalYear = 0;
	toolbelt.loop(yearParser(carCollection), function(element) {
		totalYear = totalYear + element;
	});
	return Math.round(totalYear / carCollection.length);
};
console.log("Average Age Calculator");
logger(averageAgeCalculator(carData));
