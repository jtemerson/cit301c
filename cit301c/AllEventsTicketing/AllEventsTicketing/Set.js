function Set() { // the middle

	this.intersection = function(listA, listB) {

	   var resultList = [];
		 if (listA === null || listB === null){
			 return null;
		 }
		 for (var i = 0; i < listA.length; i++){
			 for (var j = 0; j < listB.length; j++){
				 if(listA[i] === listB[j]){
					 resultList.push(listB[j]);
					 break;
				 }
			 }
		 }
	   return resultList;
	};



	this.union = function(listA, listB) { //everything but w/0 duplicates

	   var resultList = [];

		 if (listA === null || listB === null){
		 	return null;
		 }
		 for (var i = 0; i < listA.length; i++){
		 	for (var j = 0; j < listB.length; j++){
				if(listA[i] === listB[j]){
					listB.splice(j);
					break;
				}
				resultList.push(listB[j]);
		 	}
		 }
		 return resultList;
		};






	this.relativeComplement = function(listA, listB) { //everything existing inside 'a' but not in 'b'

	   var resultList = [];

		 if (listA === null || listB === null){
			 return null;
		 }
		 for (var i = 0; i < listA.length; i++){
			 resultList.push(listA[i]);
		 }
	   return resultList;
	}



	this.symmetricDifference = function(listA, listB) { //everything but not the middle

		var resultList = new Array();
		        if (listA === null || listB === null) {
		            return null;
		        }

		        for (var i = 0; i < listA.length; i++) {
		            var nextValue = listA[i];

		            for (var j = 0; j < listB.length; j++) {
		                if (listB[j] === nextValue) {
		                    resultList.push(listB[j]);
		                    break;
		                }
		            }
		        }
			   return resultList;
			}


}
