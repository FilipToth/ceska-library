import algoliasearch from 'algoliasearch/lite';

class Algolia {
    constructor() {
        this.client = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_KEY);
        this.index = this.client.initIndex('books');
    }
    
    async search(query) {
        const searchResult = await this.index.search(query);
        const hits = searchResult.hits;
        if (hits.length == 0) {
            return [];
        }
        
        let res = [];
        hits.forEach((hit) => {
            res.push(hit.objectID);
        });

        return res;
    }
}

const algolia = new Algolia();
export default algolia;