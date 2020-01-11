const { Client } = require('tdl')
const path = require('path')
const api_id = '1090666'
const api_hash = '2fabed7aa041a49d8b52cb55a1b81d76'

module.exports = async (obj, id) =>{
    let telegram = await (new Client( obj, {
        apiId: api_id, // Your api_id
        apiHash: api_hash, // Your api_hash
        databaseDirectory: path.resolve(__dirname, `./storage/${id}`),
        filesDirectory: path.resolve(__dirname, `./downloads/${id}`),
        databaseEncryptionKey:'secretss',
        tdlibParameters:{
            use_secret_chats: true,
            use_message_database: true,
            system_language_code: 'en',
            application_version: '1.0',
            device_model: 'Unknown device',
            system_version: 'Unknown',
            enable_storage_optimizer: true
        }
    }))

    return  telegram
}