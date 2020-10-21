# Custom NodeJS API with CDS Service
You can create an CDS Service and write some NodeJS scripts and enhance the existing modules.

## Problem with CDS:
1. Custom output structure is hard to expose.
2. Free custom SQLite syntax can not be executed
3. Full Control along with the API

## Solution:
The below technique is just an way to enhance the way we can write code in NodeJS
1. Create a myCustAPI.js file as given here ./my-bookshop/myCustAPI.js
2. Change the existing CDS 'server.js' file - node_modules>@sap>cds>server.js
   - To change the file use reference code from ./server.js file

## Testing:
Lets execute the API - [API_without_CDS](http://localhost:4004/API_without_CDS)

### like this method you can enhance the entire CDS services according to your requirement

