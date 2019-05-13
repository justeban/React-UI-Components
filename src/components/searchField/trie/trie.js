/*
 * This module serves 2 primary functions
 *
 * create()
 * takes a dictionary
 * returns trie data structure
 *
 * check()
 * taske a trie and a query
 * returns a result from querying the trie
 *
 * you should not alter the arguments for create or check
 * you may create any helper functions that you might need
 *
 */

/*
 * Write an algorithm that builds a trie structure from a dictionary
 *   during development, use `npm run test:create`
 *   it may be more convenient to use nodemon `npx nodemon test/create`
 *
 * parameters:
 *   @dictionary   an object containing words and definitions
 *                 see ./test/sample-dictionary.json as a reference
 * returns:
 *   An object containing all words from given dictionary
 *   stored in a Trie structure that is compatible with check()
 */
class Node {
  constructor(value = null) {
    this.value = value && value.definition
    this.children = {};
  }
}

class Trie {

  constructor() {
    this.value = null;
    this.children = {};
  }

  set(word, definition) {

    const _set = (trie, word, definition) => {

      const firstLetter = word.slice(0, 1);

      if (word.length === 1) {
        trie.children[firstLetter] = new Node({ definition });
        return;
      }

      if (trie.children[firstLetter]) {
        return _set(trie.children[firstLetter], word.slice(1), definition);
      }



      trie.value = trie.value || null;
      trie.children[firstLetter] = new Node();

      _set(trie.children[firstLetter], word.slice(1), definition);
    }

    _set(this, word, definition);
  }
}

export const create = dictionary => {
  const trie = new Trie();
  const arrayOfWords = Object.keys(dictionary);
  arrayOfWords.map(word => trie.set(word, dictionary[word]));
  return JSON.parse(JSON.stringify(trie));
}

/*
 * Write an algorithm that checks a trie for a query
 *   during development, use `npm run test:check`
 *   it may be more convenient to use nodemon `npx nodemon test/check`
 *
 * parameters:
 *   @trie         an Trie structure containing all words in a dictionary
 *                 see ./test/sample-trie.json for the object shape
 *
 *   @query        an String input to check the trie for existing nodes
 *
 * returns:
 *   @result that is one of:
 *
 *   node value    the value of a node if the trie contains the query in either a branch or a leaf node
 *   true          if the trie contains the query in a branch and is not a leaf node (does not have a value)
 *   false         if the trie does not contain the query in either a branch or a leaf node
 *
 * @result if query found a leaf node that is not a branch
 *   { ...the data stored in this node }
 *
 * @result if query found a leaf node that is also a branch
 *   { ...the data stored in this node }
 *
 * @result if query found a branch that is not a leaf node
 *   true
 *
 * @result if query did not find a leaf node or branch
 *   false
 *
 */
export const check = (trie, query) => {

  const firstLetter = query.slice(0, 1);

  const _walk = (_trie, _query) => {

    const _firstLetter = _query && _query.slice(0, 1);
    
    if (_query.length === 0) {

      if (_trie.value && Object.keys(_trie.children).length > 0) {
        return { value: _trie.value, availableWords: predictWord(query, _trie) };
      } else if (_trie.value) {
        return { value: _trie.value };
      } else if (Object.keys(_trie.children).length > 0) {
        return { availableWords: predictWord(query, _trie) };
      } else {
        return false;
      }

    } else if (_trie && _trie.children && _trie.children[_firstLetter]) {
      return _walk(_trie.children[_firstLetter], _query.slice(1));
    } else {
      return false;
    }
  }

  const _check = _walk(trie.children[firstLetter], query.slice(1));
  return typeof _check === "boolean" ? _check : { ..._check };
}

const predictWord = (string, remainingTree) => {

  const allWords = [];

  const allWordsHelper = function (stringSoFar, tree) {
    for (let key in tree.children) {
      const child = tree.children[key];
      const newString = stringSoFar + key;
      if (child.value) {
        allWords.push(newString);
      }
      allWordsHelper(newString, child);
    }
  };

  if (remainingTree) {
    allWordsHelper(string, remainingTree);
  }
  return allWords;
}