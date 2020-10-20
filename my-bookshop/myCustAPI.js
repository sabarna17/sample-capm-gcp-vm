module.exports =
{
    custAPI: function (app) {
        const express = require('express');
        const bodyParser = require('body-parser');
        const { urlencoded } = require('body-parser');
        var fullpath = __dirname.replace("/\\", '/');
        
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(express.static("public"));
        app.use(bodyParser.json());

        app.get("/API_without_CDS", function (request, response) {
            function_API_without_CDS(request, response);
        });
        
        return app;
    }
}

function function_API_without_CDS(request, response){
    var query = request.query;
    if (query.VAL1 && query.VAL2) {
        response.json({ 'query': query, 'sample_query': query.VAL1 + query.VAL2 });
    }
}