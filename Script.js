var fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
var start = new Date();
var findWords = fs.readFileSync('find_words.txt', 'utf8').split('\n');
var frenchWord = fs.readFileSync('french_dictionary.csv', 'utf8');
var words = JSON.parse(convertJSON(frenchWord));
var emparray=[];
function countOccurences(string, word) {
    return string.split(word).length - 1;
 }
 var addToObject = function (obj, key, value, index) {

	// Create a temp object and index variable
	var temp = {};
	var i = 0;

	// Loop through the original object
	for (var prop in obj) {
        debugger;
		if (obj.hasOwnProperty(prop)) {

			// If the indexes match, add the new item
			if (i === index && key && value) {
				temp[key] = value;
			}

			// Add the current item in the loop to the temp obj
			temp[prop] = obj[prop];

			// Increase the count
			i++;

		}
	}

	// If no index, add to the end
	if (!index && key && value) {
		temp[key] = value;
	}

	return temp;

};
fs.readFile('t8.shakespeare.txt', 'utf-8', function(err, data) {
    if (err) throw err;
    else{
        
        findWords.forEach((element,index) => { 
            var count=countOccurences(data,element).toString();
          var oneindex=addToObject(words[index], 'frequency',count)
          
            if(words[index].english == element){
                var searchRegExp = new RegExp(element, 'ig'); 
                data = data.replace(searchRegExp, words[index].french);
            }
            emparray.push(oneindex);           
        }); 
        const csvWriter = createCsvWriter({
            path: 'frequency.csv',
            header: [
              {id: 'english', title: 'English'},
              {id: 'french', title: 'French'},
              {id: 'frequency', title: 'Frequency'},
            ]
           });
          
          csvWriter
            .writeRecords(emparray)
            .then(()=> console.info('The CSV file was written successfully'));
       
    }
    fs.writeFileSync('t8.shakespeare.translated.txt',data)
})

function convertJSON(csv){
    debugger;
    var lines=csv.split("\n");
    lines.unshift('english,french')
    var result = [];
    var headers=lines[0].split(",");
    for(var i=1;i<lines.length;i++){
        var obj = {};
        var currentline=lines[i].split(",");
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return JSON.stringify(result); 
  }
  var minutes=function(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + " minutes " + (seconds < 10 ? '0' : '') + seconds + " seconds";
  }

// Memory usage after execution
const used = process.memoryUsage().heapUsed / 1024 / 1024;
const Memory="Memory used: "+ Math.round(used * 100) / 100 + ' MB';
console.info(Memory);

setTimeout(function () {
  // execution time simulated with setTimeout function
  var end = new Date() - start
  var time="Time to process: "+ minutes(end);
  console.info(time);
  const performance= time+"\n"+Memory;
  fs.writeFileSync('performance.txt',performance)
}, 1000)
 