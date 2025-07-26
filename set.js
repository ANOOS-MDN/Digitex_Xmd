const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUxBb01DbVphVFFEeVRjM0JrRFdRelUwbWRKd2ZwRndnUnNLeklwUyszOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUd1WEhpWnhxMFFQbkpadElFZ3pTdkdsS3F1clpZRHIrUjFNSThBbjRuaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2S2VGUTdVaDBES1RqQWJGa2VjekVuZ1V5VWlBWUpHR0l4b0p2Q3NIWVVZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJIMS8zUTRHZTE2RkVwbWtSYTBPQlhxcFdiTmdnM2tMTVRZVlVuUTIwWFVJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRLOXhac1VQOUVTb004MjAzbmtpOVVVdmg3Y0Z4MjJWNzc0cVZmWFBCV009In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlV2eXJ3c2tDcmNna0lHVU4zQWVqenFwKzM4K1FnY2doYjByaVU1YndMQUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ011Nm5OV2paNXIrVnBCQlEra3N5c0J1bmJHVHVGaXU5djd6aEdEbG8xRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicWU2UDlCd05nNzFQcHZHbmxRZFhXSWdQYmVmRWNnN1dHRnNVaXdNNmFFQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikh4bHZ0RjlxaHR4ZG55RU1QZ2JSdS9McTk4NnNWeUxhdWQ3MVJsSEFtdy83VWROd0xCYmJVUWhDdTF5OU4vT215OEVnM04rbzVaR2pzMnBoRk5ZUWd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjIsImFkdlNlY3JldEtleSI6IjdkVmliZmlpUU9oOFBUUW5VTnVYRFczdHRMR1dTcnQyVGNEaXBQRTRabDA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTY3NzcxMTYwMjA0QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjQ2MEE4NUY3QzU5RTdGREM3RDVFOTAyQzAxRTk0Q0I1In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTM1NDQ5MzZ9LHsia2V5Ijp7InJlbW90ZUppZCI6Ijk2Nzc3MTE2MDIwNEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzNzU4NkZCRkU0RTE4Nzg3MkE1OTg0MTA3NTA4MEEyRSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUzNTQ0OTM2fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5Njc3NzExNjAyMDRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMEU5QjhEQkZFMzIzNDAzRjdFOUU5NDg0ODgxQTY5MDIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MzU0NDk0Nn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiQjdTTEVEWVgiLCJtZSI6eyJpZCI6Ijk2Nzc3MTE2MDIwNDo3MkBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjE2MDgwNDEyOTIxNDQ4Mjo3MkBsaWQiLCJuYW1lIjoi8J+RoyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSm1YejlvQkVOanhrOFFHR0FRZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiWGFoZUtFc2lnQk9ud21TQ3dTYlFGanEwU0IzZERycllTV2gvRGhXd0FWZz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiN2tCREJwektNZGlSTEpCa1piN2l1K1lZWVpxVU9QMzNhZTZIZ2Z6cGxoNjQ3QUczTjJ1QTIrcTVkWGo5M1g2TmpnZHJ3WnFqL1pwTmRjckRlbmlEQUE9PSIsImRldmljZVNpZ25hdHVyZSI6ImRvMi9QVmhZQlE4Tlkyc0tVclJhZEs0SncyZ0NYQnJ5MVRYYzNmM0FKUXpmWmRuaElmQXRmb1FaY09CZE1kdUpoRzJ6ZDMvS1hvZkM4bFFwcW9oWGh3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTY3NzcxMTYwMjA0OjcyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlYyb1hpaExJb0FUcDhKa2dzRW0wQlk2dEVnZDNRNjYyRWxvZnc0VnNBRlkifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBMElCUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MzU0NDkzMywibGFzdFByb3BIYXNoIjoiMlAxWWhmIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFGb3IifQ==',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/sesco001/Diigitex_xmd',
    OWNER_NAME : process.env.OWNER_NAME || "Juma Wycliffe",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254748571920",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/g7qjxj.png",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By DIIGITEX_XMD',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029Vb5zdsiA89MrLd1hAk2Q",
    SITE :process.env.SITE || "https://Digitexsmartsolutions.com",
    CAPTION : process.env.CAPTION || "DIIGITEX_XMD",
    BOT : process.env.BOT_NAME || 'DIIGITEX_XMD⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dodoma", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    FREDI_DELETE : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes', 
                
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
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
