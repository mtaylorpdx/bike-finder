// export class QuoteService {
//   async getRandomQuote() {
//     try {
//       let response = await fetch(`http://api.forismatic.com/api/1.0/`);
//       let jsonifiedResponse = await response.json();
//       return jsonifiedResponse;
//     } catch(error) {
//       return false;
//     }
//   }
// }

export function getQuote() {
  let request = new XMLHttpRequest();
  const quoteURL = `http://api.forismatic.com/api/1.0/`;

  request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const quoteResponse = JSON.parse(this.responseText);
      returnQuote(quoteResponse);
    }
  }
  request.open("GET", quoteURL, true);
  request.send();
}