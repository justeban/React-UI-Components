import dictionaryData from './data/dictionary.json';
import { create, check } from './trie/trie';

let trie;

const loadData = async () => {
  trie = create(dictionaryData);
}

loadData();

/*
 * On api request
 *   - GET /api/check-term?q=fluo
 *   - returns
 *     - { value, childKeys }
 *   - see trie.check()
 */
export const checkTerm = (query) => {
  const result = query.length > 0 ? check(trie, query) : false;
  return result;
}

