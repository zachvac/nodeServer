# Node Server #

I'm using this to learn node.js, but also to build a functioning web server I can use to host a variety of projects.

## Format of Server ##
### To server up a static web page ###
server/folder/www/path/page.extension

### To call a node.js function###
server/folder/data/functionName?arg1=1&arg2=2...

### folderLookup.txt ###
a JSON with folder names mapped to server locations.
If there is no mapping the server looks for the folder
in the same location as the server.js file

### node.js functions ###
The folder must have an index.js with the following:
```
exports.export = function(funcName,query){
	if(this[funcName]){
		return(this[funcName](query));
	}
	return("ERR, "+funcName+" does not exist");
}
```
Functions may then be defined as follows:
```
exports.[functionName] = function(query){
  ...
}
```
For example, here is a function called add, which returns the sum of arguments
n1 and n2. If this were in a folder called zach it would be called by:
server/zach/data/add?n1=5&n2=7

```
exports.add = function(query){
	return((Number(query.n1)+Number(query.n2)).toString());
}
```
