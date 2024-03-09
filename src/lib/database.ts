import { type Database } from './types'
import { Kysely, SqliteDialect} from "kysely"
import { LibsqlDialect } from "@libsql/kysely-libsql";
import { DB_AUTH } from "$env/static/private";

// const dialect = new SqliteDialect({
//     database: new SQLite('enrique.sqlite', { fileMustExist: true }),
//   })

// export const db = new Kysely<Database>({
//     dialect,
// })

export const db = new Kysely<Database>({
  dialect: new LibsqlDialect({
      url: "libsql://materias-unlam-wixdead.turso.io",
      authToken: DB_AUTH, // optional
  }),
});