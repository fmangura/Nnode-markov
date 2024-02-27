/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chain = new Map();
    for (let i=0; i < this.words.length; i++) {
      let curr = this.words[i]
      let nextWord = this.words[i+1] || null;

      if (chain.has(chain)) {
        chain.get(curr).push(nextWord);
      }else{
        chain.set(curr, [nextWord]);
      }
    }
    this.chain = chain;
  }


  /** return random text from chains */

  static rando(word) {
    return word[Math.floor(Math.random() * word.length)];
  }

  makeText(numWords = 100) {
    let keys = Array.from(this.chain.keys());
    let key = MarkovMachine.rando(keys);
    let resp = [];

    while (resp.length < numWords && key !== null){
      resp.push(key)
      key = MarkovMachine.rando(this.chain.get(key));
    }
    return resp.join(" ");
  }
}

module.exports = {
  MarkovMachine: MarkovMachine
};

// let mm = new MarkovMachine("the cat in the hat");

// let answer = mm.makeText();
// console.log(answer)
