window.toolbelt = {};

toolbelt.loop = function(collection, callback){

  if (Array.isArray(collection)){
    for (var i = 0; i < collection.length; i++){
      callback(collection[i], i);
    }
  } else if (typeof collection === 'object'){
    for (var key in collection){
      callback(collection[key], key);
    }
  }

};


toolbelt.transform = function(collection, callback){
	var results = [];
	toolbelt.loop(collection, function(element){
		results.push(callback(element));
	});
	return results;
};


toolbelt.filterBy = function(collection, predicate) {
  var results = [];
  toolbelt.loop(collection, function(element) {
    if (predicate(element)) {
      results.push(element);
    }
  });
  return results;
};


toolbelt.distill = function(collection, callback, startValue) {
  var returnValue = startValue;
  toolbelt.loop(collection, function(element) {
    returnValue = callback(element, returnValue);
  });
  return returnValue;
};
