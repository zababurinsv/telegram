const express = require("express");
const cors = require('cors')
let fs = require('fs')
const path = require('path')
const Enqueue = require('express-enqueue')
// const compression = require('compression')
const formidableMiddleware = require('express-formidable');
const IPFS = require('ipfs')
const WebSocket = require('ws');
const isEmpty = require('is-empty');
const request = require('./request.js');
const response = require('./response.js')
let cookieParser = require('cookie-parser')
let tdb = require('./telegram.js')
let tonDb = require('./TDLib.js')
const app = express();
// app.use(compression())
app.use(cookieParser())
app.use(cors())
app.use(formidableMiddleware());
app.disable('x-powered-by');


const queue = new Enqueue({
    concurrentWorkers: 4,
    maxSize: 200,
    timeout: 30000
});
app.use(queue.getMiddleware());
let whitelist = ['https://web3-monopoly.web.app','http://localhost:8886','http://localhost:8887','http://localhost:8888','http://localhost:8889','https://xart-3e938.firebaseapp.com','https://xart-3e938.web.app','https://universitykids.ru','https://vashi-faili.web.app','https://vashi-faili.web.app',  'https://www.universitykids.ru', 'https://tuning-fork.firebaseapp.com','http://localhost:8888', 'https://jainagul-tezekbaeva.firebaseapp.com','https://tezekbaeva.firebaseapp.com']
const account = `/3N8n4Lc8BMsPPyVHJXTivQWs7ER61bB7wQn`
app.use(cors({
    credentials: true,
}));
let corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors({
    origin: 'http://localhost:8888'
}));
const http = require("http");
const server = http.createServer(app);

class Clients {
    constructor(name) {
        this.wsList = {}
        this.sigList = {}
        this.tlList = {}
        this.fsList = {}
        this.wsSave = this.wsSave.bind(this)
        this.wsRemove = this.wsRemove.bind(this)
        this.tlSave = this.tlSave.bind(this)
        this.tlRemove = this.tlRemove.bind(this)
        this.fsRemove = this.fsRemove.bind(this)
        this.fsSave = this.fsSave.bind(this)
        this.sigSave = this.sigSave.bind(this)
        this.sigRemove = this.sigRemove.bind(this)
        this.getCookie = this.getCookie.bind(this)


    }
    fsSave(username, client){
        this.wsList[username] = client
    }
    fsRemove(username){
        delete this.wsList[username]
    }
    wsSave(username, client){
        this.wsList[username] = client
    }
    wsRemove(username){
        delete this.wsList[username]
    }
    tlSave(username, client){
        this.tlList[username] = client
    }
    tlRemove(username){
        delete this.tlList[username]
    }
    sigSave(username, client){
        this.sigList[username]= client
    }
    sigRemove(username, client){
        delete this.sigList[username]
    }
    get size(){
        return Object.keys(this.wsList).length
    }
    get class(){
        return {
            tl:Object.keys(this.tlList),
            ws: Object.keys(this.wsList),
            sig: Object.keys(this.sigList),
            fs: Object.keys(this.fsList)
        }
    }
    getCookie(cookie, name) {
        let value = "; " + cookie;
        let parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }
}
let telegram = new Clients()

const webSocketServer = new WebSocket.Server({ server });
function getUniqueID (){
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
}

webSocketServer.on("connection", async (ws, req) => {
    try {
        console.log('~~~~~~~~~~~~~~~~~ws~~~~~~~~~~~~~~~~~~~~~~~')
        let id = await telegram.getCookie(req.headers['cookie'], 'webRTC')
        // console.log('~~~~~~~id~~~~~~~', await telegram.ipfs)

        let TDLib = await tonDb()
        ws.isAlive = true;

        ws.on('pong', () => {
            ws.isAlive = true;
        });
        if(id === undefined){
            id = getUniqueID()
            ws.id = id
            let WebRTC = {}
            WebRTC['id'] = ws.id
            WebRTC['_'] = 'WebRTC'
            ws.send(JSON.stringify(WebRTC))
        }
            ws.id = id
            telegram.wsSave(ws.id, ws)

        if(telegram.tlList[id] === undefined){
            telegram.tlSave(id, await tdb(TDLib, id))
            await telegram.tlList[id].connect()
        }
        await request(telegram, id)
        await response(telegram.tlList[id],telegram.wsList[id])

        console.info("Total connected clients:", telegram.class);
    }catch (e) {

        console.log('@@@@@@@@@@@@@@@@@@@@@@@@', e)
    }

});
setInterval(() => {
    // console.info("Total connected clients:", telegram.class);
    // console.info("Total connected clients:", telegram.class);
    // console.log('@@@@@@@@@tlList@@@@@@@@2',telegram.wsList[key].isAlive)
    for(let key in telegram.wsList){
        if(!telegram.wsList[key].isAlive){
            telegram.wsList[key].terminate()
        }else{
            telegram.wsList[key].isAlive = false;
            telegram.wsList[key].ping(null, false, (e)=>{
            });
        }
    }
}, 1000);
app.use( express.static('static'));
app.use( express.static('dist'));

app.options('/connect', cors(corsOptions))
app.get('/connect',  async (req, res) => {
    console.log('~~~~~~~~~~~~~~~connect~sse~~~~~~~~~~~~~')
    let response = "event: " + 'ping' + "\n" + "data: " + JSON.stringify({ version: `server side events true`, date:Date.now()}) + "\n\n"
    let length = response.length + 3
    res.writeHead(200, {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Content-length': length.toString(),
    });
    res.write('\n');
    res.write(response);
});
app.options('/Authorization', cors(corsOptions))
app.post('/Authorization', async (req, res) => {
    try {
        console.log('~~~~~~~~~~~Authorization~~~~~~~~~~~~~~~~')

        let client = telegram['tlList'][req.cookies.webRTC]
        if(client === undefined){
            telegram['sigSave'](req.cookies.webRTC, req['fields']['sigSave'])
            res.send({_:'status', status:'false'})
        }else{
            telegram['sigSave'](req.cookies.webRTC, req['fields']['sigSave'])
            let getAuthorizationState = await client.invoke({_: 'getAuthorizationState'})
            switch (getAuthorizationState['_']) {
                case 'authorizationStateReady':
                    await client.invoke({_: 'getMe'})
                    break
                case 'authorizationStateWaitPhoneNumber':
                    await client.invoke({
                        _: 'setAuthenticationPhoneNumber',
                        phone_number: req['fields']['phone_number']
                    })
                    break
                default:
                    console.log('необрабатываемое событие', getAuthorizationState)
                    break
            }
            console.info("Total connected clients:", telegram.class);
            res.send({_:'status', status:'ok'})
        }

    }catch (e) {
        console.log('~~~~~~~~error~~~~~~~~~~',e)
        res.send({status:e})
    }
})
app.options('/init', cors(corsOptions))
app.post('/init', async (req, res) => {
    try {
        if(req.cookies.webRTC === undefined){
            res.send({_:'init'})
        }else{
            if(telegram['tlList'][req.cookies.webRTC] === undefined || telegram['tlList'][req.cookies.webRTC] === null){
                res.send({_:'init'})
            }else{
                    console.log('~~~~~~~~~~~~~~~~~init~~~~~~~~~~~~~~~~~~~~~~~')
                    telegram.sigSave(req.cookies.webRTC, req['fields']['sigSave'])
                    let getAuthorizationState =  await telegram['tlList'][req.cookies.webRTC].invoke({_: 'getAuthorizationState'})
                    console.info("Total connected clients:", telegram.class);
                    res.send(getAuthorizationState)
            }
        }

    }catch (e) {
        console.log('~~~~~~~~error~~~~~~~~~~',e)
        res.send({status:e})
    }
    // res.send({_:'init'})
})
app.options('/*', cors(corsOptions))
app.get('/*', async (req, res) => {
    // await client.connect()

    // console.log('~~~~~~~~~~~~~', req.cookies.webRTC)

    res.sendFile('/index.html', { root: __dirname });
})

app.use(queue.getErrorMiddleware())

server.listen(process.env.PORT || 7000, () =>  { console.info(`Server running on port: 7000`)
});