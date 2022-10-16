class Connector {
    constructor() {
        this.fauna = require('faunadb');

        const key = process.env.FAUNA_KEY;
        this.client = this.fauna.Client({ secret: key });
    };

    getDoc = async (colName, id) => {
        const { Get, Ref, Collection } = this.fauna.query();
        const resp = await this.client.query(
            Get(
                Ref(
                    Collection(colName),
                    id
                )
            )
        );

        return resp;
    };

    updateDoc = async (colName, id, data) => {
        const { Update, Ref, Collection } = this.fauna.query();
        const resp = this.client.query(
            Update(
                Ref(
                    Collection(colName),
                    id
                ),
                data
            )
        );

        return resp;
    };
}

export default Connector;