import * as sqlite3 from "sqlite3";
import { promisify } from "util";

export default abstract class Database {
  protected dbGet;
  protected dbAll;
  protected dbRun;

  constructor() {
    const db = new sqlite3.Database("db");
    this.dbGet = promisify(db.get.bind(db));
    this.dbAll = promisify(db.all.bind(db));
    this.dbRun = function (arg: string) {
      return new Promise((resolve, reject) => {
        db.run.apply(db, [
          arg,
          function (this: sqlite3.Database, err: Error) {
            // eslint-disable-next-line
            err ? reject(err) : resolve(this);
          },
        ]);
      });
    };
  }
}
