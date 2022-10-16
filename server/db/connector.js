class Connector {
    constructor() {
        const dotnenv = require('dotenv');
        dotnenv.config();

        this.fauna = require('faunadb');

        const key = process.env.FAUNA_KEY;
        console.log(key);
        this.client = new this.fauna.Client({
             secret: key,
             domain: "db.eu.fauna.com"
        });
    };

    getDoc = async (colName, id) => {
        const { Get, Ref, Collection } = this.fauna.query;

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
        const { Update, Ref, Collection } = this.fauna.query;
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

module.exports = Connector;