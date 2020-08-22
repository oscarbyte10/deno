import { MongoClient } from "../config/deps.ts";
import { config } from "../config/deps.ts";

const { DB_USER, DB_PASSWORD, DB_HOST } = config();

export class DatabaseConnection {
  private dbUser = DB_USER;
  private dbPassword = DB_PASSWORD;
  private dbHost = DB_HOST;
  private dbName = "";
  private client: MongoClient;
  private collection = "";

  constructor() {
    this.client = new MongoClient();
  }

  connect = (dbName: string) => {
    this.dbName = dbName;
    const uri =
      `mongodb+srv://${this.dbUser}:${this.dbPassword}@${this.dbHost}/${this.dbName}?retryWrites=true&w=majority`;
    console.log(`Connection opened with ${dbName} database`);
    this.client.connectWithUri(uri);
  };

  getDatabase = () => this.dbName;

  setCollection = (collection: string) => this.collection = collection;

  getAll = async () =>
    await this.client.database(this.dbName).collection(this.collection)
      .find((
        data: any,
      ) => data);

  insertOne = async (value: any) =>
    await this.client.database(this.dbName).collection(this.collection)
      .insertOne({ ...value });
}
const db = new DatabaseConnection();
export { db };
