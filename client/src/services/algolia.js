import algoliasearch from 'algoliasearch/lite';

class Algolia {
    constructor() {
        this.client = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_KEY);
        this.bookIndex = this.client.initIndex('books');
        this.personIndex = this.client.initIndex('people');
    }

    async search(query, index) {
        const searchResult = await index.search(query);
        const hits = searchResult.hits;
        if (hits.length == 0) {
            return [];
        }
        
        return hits;
    }
    
    async searchBooks(query) {
        return await this.search(query, this.bookIndex);
    }

    async searchPeople(query) {
        return await this.search(query, this.personIndex);
    };
}

const algolia = new Algolia();
export default algolia;