import { adjectives } from "./adjectives";
import { nouns } from "./nouns";

export function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

export function nounsOf(indices: [number, number]):[string, string] {
  return [nouns[indices[0]], nouns[indices[1]]]
}

export function adjectivesOf(indices: [number, number, number]):[string, string, string] {
  return [adjectives[indices[0]], adjectives[indices[1]], adjectives[indices[2]]]
}

// from https://stackoverflow.com/a/1349426/7371580
export function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}