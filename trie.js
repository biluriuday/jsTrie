/*trie implementation*/
/*
below is an sample object which shows a trie object(containing words "apple", "apply", "applying", "apt", "bat","cat")
obj = {
	a: {
		p: {
			p: {
				l: {
					e: {
						$: 0
						},
					y: {
						i: {
							n: {
								g: {
									$: 0
									}
								}
							},
						$: 0
						}
					}
				},
			t: {
				$: 0
				}
			},
		t: {
			$: 0
			}
		},
	b: {
		a: {
			t: {
				$: 0
				}
			}
		},
	c: {
		a: {
			t: {
				$: 0
				}
			}
		}
};
*/
(function(){
var
trie=function(arr) {
	return new trie.prototype.init(arr);
};

trie.prototype = {
	dict: {},
	isPresent: function(word) {//checks if the given word is present in the dictionary
		if(typeof word === "string") {
			var wrdArr = word.split(''), 
			i, tmp = this.dict;
			for(i=0;i<wrdArr.length;i++) {
				if(!tmp[wrdArr[i]]) {
					return false;
				}
				tmp = tmp[wrdArr[i]];
			}
			return (tmp.$ && tmp.$ === 1) ? true: false;
		}
		return false;
	},
	init: function(arr) { //build a trie object(dictionary) from the words in the input array
		var i;
		this.dict = {};
		if(arr && arr.length > 0) {
			for(i=0;i<arr.length;i++) {
				this.addWordToTrie(arr[i]);
			}
		}
	},
	addWordToTrie: function(word) {//if we want to add a new word to an already created trie object
		var 
		tmp = this.dict, 
		chars = word.split(''),
		idx = 0;
		if(!this.dict) {
			this.dict = {};
		}
		while(idx < chars.length) {
			if(!tmp[chars[idx]]) {
				tmp[chars[idx]] = {};
			}
			tmp = tmp[chars[idx]];
			idx++;
		}
		if(!tmp.$) {
			tmp.$ = 1;
		}
	},
	searchWords: function(word) {//returns array of words in trie which start with given word
		////can be used for auto-suggest kind of functionality
		var wrdArr = word.split(''), i = 0, tmpDictRoot = this.dict;
		while(i < wrdArr.length) {//we can put a constraint on min search word length(?) if the dictionary is too big
			if(!tmpDictRoot[wrdArr[i]]) {
				break;
			}
			tmpDictRoot = tmpDictRoot[wrdArr[i]];
			i++;
		}
		return i === wrdArr.length ? buildResultsArray(tmpDictRoot, word): [];
	}
};
trie.prototype.init.prototype=trie.prototype;//jQuery style of declaring prototype chain
function buildResultsArrayInternal(srchResults, tmpDictRoot, word) {
	var a;
	for(a in tmpDictRoot) {
		if(tmpDictRoot.hasOwnProperty(a)) {
			if(a === "$") {
				srchResults.push(word);
			}
			else {
				buildResultsArrayInternal(srchResults, tmpDictRoot[a], word+a);
			}
		}
	}
}
function buildResultsArray(tmpDictRoot, word) {
	var srchResults = [];
	buildResultsArrayInternal(srchResults, tmpDictRoot, word);
	return srchResults;
}
window.trie=trie;//expose trie to outside world
})();
