require("dotenv").config({ path: "./.env.production" });
const app = require("./app.js");
const connectDb = require("./db/mongodb.js");
const { appConfig, dbConfig } = require("./config.js");

async function initApp(appConfig, dbConfig) {
  try {
    await connectDb(dbConfig);

    app.listen(appConfig.port, () =>
      console.log(`listen on ${appConfig.port}`)
    );
  } catch (e) {
    console.error(e);
    process.exit(0);
  }
}

initApp(appConfig, dbConfig);
