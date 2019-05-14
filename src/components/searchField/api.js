import dictionaryData from './data/dictionary.json';
import { create, check } from './trie/trie';

let trie;

const loadData = async () => {
  trie = create(dictionaryData);
}

loadData();

export const checkTerm = (query) => {
  const result = query.length > 0 ? check(trie, query) : false;
  return result;
}

