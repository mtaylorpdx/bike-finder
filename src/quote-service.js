export class QuoteService {
  async getRandomQuote() {
    try {
      let response = await fetch(`http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`);
      let jsonifiedResponse = await response.json();
      return jsonifiedResponse;
    } catch(error) {
      return false;
    }
  }
}
