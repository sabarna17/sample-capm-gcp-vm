const express = require('express')
const cds = require('./lib')

/**
 * Standard express.js bootstrapping, constructing an express `application`
 * and launching a corresponding http server using `app.listen()`.
 * Project-specific `./server.js` can overload this and react to these
 * events:
 *
 * - cds.on('bootstrap',(app)) - emitted before any middleware is added
 * - cds.on('loaded',(model)) - emitted when a model was loaded
 * - cds.on('connect',(srv)) - emitted when a service was connected
 * - cds.on('serving',(srv)) - emitted when a service was served
 * - cds.on('listening',({server,url})) - emitted when the server is listening
 *
 * @param {object} options - canonicalized options from `cds serve` cli
 * @param {boolean} options.in_memory - true if we need to bootstrap an in-memory database
 * @param {string} options.service - name of service to be served; default: 'all'
 * @param {string} options.from - filenames of models to load; default: '*'
 * @param {express.Application} options.app - filenames of models to load; default: '*'
 * @param {express.Handler} options.index_html - custom handler for /
 * @param {express.Handler} options.favicon - custom handler for /favicon.ico
 * @param {express.Handler} options.logger - custom request logger middleware
 * @returns Promise resolving to a Node.js http server as returned by express' `app.listen()`.
 */
module.exports = async (options, o = { ...options, __proto__:defaults }) => {

    
    //Begin of Change 1: - by Sabarna Custom
    // const app = cds.app = o.app || express()
    var app = cds.app = o.app || express()
    //End of Change 1: - by Sabarna Custom

    cds.emit('bootstrap',app) // hook for project-local server.js

    // mount static resources and common middlewares...
    app.use (express.static (cds.env.folders.app))  //> defaults to ./app
    app.use ('/favicon.ico', o.favicon)             //> if none in ./app
    app.get ('/', o.index_html)                     //> if none in ./app
    app.use (o.logger)                              //> basic request logging

    // load specified models or all in project
    let model = cds.model = await cds.load (o.from)

    // bootstrap --in-memory db if requested
    if (o.in_memory) await cds.deploy (model,o)

    // pre-unfold models to minimize memory consumption
    if (cds.env.features.snapi) model = cds.model = cds.linked(cds.compile.for.odata(model))

    // connect to primary database if required
    if (cds.requires.db) cds.db = await cds.connect.to('db')

    // bootstrap messaging service if required
    if (cds.requires.messaging) await cds.connect.to('messaging')

    //Begin of Change 2: - by Sabarna Custom
    var myserver = require('../../../myCustAPI');
    app = myserver.custAPI(app);    
    //End of Change 2: - by Sabarna Custom

    // construct and mount modelled services
    /* cds.services = */ await cds.serve(o).from (model) .in (app)
    cds.emit ('served', cds.services)

    // start http server
    return app.listen (o.port || process.env.PORT || 4004)

}


// -------------------------------------------------------------------------
// Default handlers, which can be overidden by options passed to the server
//
const defaults = {

    // default generic index.html page
    get index_html() {
        const index = require ('./app/index.js')
        return (_,res) => res.send (index.html)
    },

    // default favicon
    get favicon() {
        const favicon = require.resolve ('./app/favicon.ico')
        return express.static (favicon, {maxAge:'14d'})
    },

    // default request logger
    get logger() {
        const DEBUG = cds.debug('server')
        return (req,_,next) => { /* eslint-disable no-console */
            console.log (req.method, decodeURI(req.url))
            if (/\$batch/.test(req.url))  req.on ('dispatch', (req) => {
                console.log ('>', req.event, req._path, req._query)
                if (DEBUG && req.query) console.debug (req.query)
            })
            next()
        }
    },
}


// -------------------------------------------------------------------------
if (!module.parent)  module.exports (process.argv[2])