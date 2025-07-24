const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'BELTAH-MD;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0I5dTlXYkpVeW1Mb1JlSnNtLzhvME5QRFN2WjdMdWpYc0dzMUNFbmFXST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaU1BbHdSZ3JwYUxiTWJaVm5Oa2UzOUw5Y3MyeTN6U3VjSXV0VGVrVzZ5Yz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5UG90VWdtY1A4dXpnYXVxdTdBeExlZUxDcGw2NVhKZ21vR094NnZBNjFZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzaEJwVzdyR3FEdVNaUXJUc0N4NE1OUmFSSzlidS8wamdQbDlUdFJLQmdRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllQdlE3TFJ2UG8yOTRpZ1VYN1FnMi9EREdWRUFkMzM1TWwrOThXVm9ybGs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkpnSUVHNkFIaExwRlFyeFFYdmFWbW4zT1FPL09MY3c1bEhEdUlEeHNVRVU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZURyRGJsVnl5Vk5Sc3NmeGZqWTV6TVBFZHZKZUMweDZxazBGNmx5S3dVVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicWNXN2tUci9sZVZVRUFVMmtlcktibjlMWnJlTy92RTRyQ2NXbWNLRjhYMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik52aGw0cnRSajJyRGd0RWJlemtsRVkzdHNJZkQwQmpmaDVLb1Q1enFaV01FZTRRWWllNjgwN3Nya21OYkwrd1lsOFprOWJaYVl1OGQ0WFNZOVN5Y2hnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTQsImFkdlNlY3JldEtleSI6ImRCakZGeW5RRnVTNno0dWJLaUIwa0dINnNsbGFiSnRQZjZOclZHWVV5dGs9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTY3NzcxMTYwMjA0QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjFENTQ4MjJGNDFENjJGMEVBNzI1MTVCRDRCMTQyQjVBIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTMzOTgzMzJ9LHsia2V5Ijp7InJlbW90ZUppZCI6Ijk2Nzc3MTE2MDIwNEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI0RkUxQzVBMjM1RUFDNzMxNjRBMzBEQUU1REM0MURGNiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUzMzk4MzMyfSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5Njc3NzExNjAyMDRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQTc1QkM4NUY0MTQ2RDBGMzlCNjA1MkZFQjQ5RTBFMjIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MzM5ODMzOH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiUUM4WDk1QjQiLCJtZSI6eyJpZCI6Ijk2Nzc3MTE2MDIwNDo3MEBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjE2MDgwNDEyOTIxNDQ4Mjo3MEBsaWQiLCJuYW1lIjoi8J+RoyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSm1YejlvQkVLNzRpc1FHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiWGFoZUtFc2lnQk9ud21TQ3dTYlFGanEwU0IzZERycllTV2gvRGhXd0FWZz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiWWNsSlk5RjhxNUNHck5kcXFNUlJmNVZhK0ZxeFprcVd1VzdHR1RwSGNUK2pZOGhUS2pBcjBGUnFrZDNaZThMTS9KU0Y0MlpPL3U2L2FsRVFmcXpaQmc9PSIsImRldmljZVNpZ25hdHVyZSI6IkpjVW13NHlsMDZqQW4wTitSMmRaRG5sV2NtZzRtSkN3TEVUU2xudWFodjlzV0k2cHZNMW9vNzgremlZMDErTFRCTHJ5WDJEb0Y3V0dHT1lqbmJWSWd3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTY3NzcxMTYwMjA0OjcwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlYyb1hpaExJb0FUcDhKa2dzRW0wQlk2dEVnZDNRNjYyRWxvZnc0VnNBRlkifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBMElCUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MzM5ODMzMSwibGFzdFByb3BIYXNoIjoiMlAxWWhmIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFGb2kifQ==',
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
