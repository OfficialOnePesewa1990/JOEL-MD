const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSURoSS9hLzh5R2hZZXFDSndlWmJ4SlJPNWwvL25Gc1JQVjdmdDZtaTNVOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS3d6NytWK1ZUaWhESzdLYmtKbDNQSnFKaE5IL2lqcjc5NCtQaVNIQmdSUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTSnRUMFhna2ozQnFuaUZibzA4M200VUFMNjN3K2tyeTlJQ1V5MVNKRVZzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJTUFYRDc3WERiUjVVTitLNnJ6U1ZubHNWR3M3WHcyUk9HamN3eHNXUVJJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndBUjArMjRlRVExQ1VwQ3RPVFdGNUw1WFhPTmVvR2hSUldjOUFycXpoMjQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImE4dnl1RXpxTlFpYkkyMEZyY1BwNjM2UEZ6Wlo0eW92RU5nZVJtZTU2Z1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0prcjgrRXRNMmx6TUJKSlVnUndCaGwrM2xQVjJuKyt3QWRXUXBMeVVHZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibEthMW9NNnhXdC83QzlyaUplSnNIMGdZSTdMTE81Tm1xLzVzbjZ0dG8zOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBXVm53QmhFVTBNNjBpdzMwbDYxSG5NcWtaNWFGZG11bFU0cVk0NWRTc204eFlUZ0VCU0ZWNVkrOWx0ZjBSMkVyRllHcG12WEdEcndHT1JvR0hKeUJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzUsImFkdlNlY3JldEtleSI6IjNjbEZTYTduV2dPZVduRkNITVIvUXBHUzAxaTVxdUpHejVKS1pCN1pUR1E9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImRISmR5Qm1LUVp1OE5STC1CTDBleFEiLCJwaG9uZUlkIjoiZjhjNGFmZmUtZDZkZi00MGQxLWE0YjktYzkxZGUwYjEwNjlkIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ims3NXhqbHJHaDd0Z3FRd0J6bWtnMFdGNWdCQT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJajNZVGF3ZExsTU1xSTJJenBteTRqRDM0L1E9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiVDFIMVQzNU4iLCJtZSI6eyJpZCI6IjIzMzU0NDQ4MjQ5NDoxOUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJPZmZpY2lhbCBPbmVQZXNld2EifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09HSnV6RVF2KzZvdGdZWUF5QUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjROUHdEd3NGaVJRd01DV1lWYXdnQm1jMUk4RXVyVWVuazFvc3ZHTXVuRlU9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkswdVBXVGpIa1pIYzdXWkl0QlZiTmhuVGR6Y0ZVcTVpMCszT1NZMEQva2VxMHpmWjQ3MzJFb2lDYkZ6UThteHljVnBCOUtST2N6RVdlM1ZsdVdqYUFRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJkUXJoVWIrQWdKYU95SG5WVG5qUmgra3pRTzUrM3dVQmo5VkVCYmZ5U09neG5ERUdoSmN5LzNNTldPNStwNmMxSW12dVluRDE1U0Zyc2kxcktDQ3lCQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzMzU0NDQ4MjQ5NDoxOUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlRFQ4QThMQllrVU1EQWxtRldzSUFabk5TUEJMcTFIcDVOYUxMeGpMcHhWIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI0NTI4NDYxfQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Official OnePesewa",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "233544482494",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Official OnePesewa Bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/7fad220f8082eaff5eb1d.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '1',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   DB: process.env.DB || 'postgres://neoverse:pomrleUMXwlmlpIcW2oFJmMX0CXzaFkf@dpg-combonun7f5s73d7uoog-a.oregon-postgres.render.com/neoverse_wz98',
                  /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
