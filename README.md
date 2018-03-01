# cursor-mongoose-pagination
Cursor based pagination library for mongo using mongoose.

[![npm](https://img.shields.io/npm/dm/cursor-mongoose-pagination.svg?maxAge=2592000)](https://www.npmjs.com/package/cursor-mongoose-pagination)
[![License](https://img.shields.io/npm/l/cursor-mongoose-pagination.svg?maxAge=2592000?style=plastic)](https://github.com/babayega/cursor-mongoose-pagination/blob/master/LICENSE)
[![Known Vulnerabilities](https://snyk.io/test/github/babayega/cursor-mongoose-pagination/badge.svg?targetFile=package.json)](https://snyk.io/test/github/babayega/cursor-mongoose-pagination?targetFile=package.json)


## Installation

`npm install cursor-mongoose-pagination`

## Usage
```js
const mongoose = require('mongoose'),
    cmp = require('cursor-mongoose-pagination')

const FooSchema = mongoose.Schema({
  name: String,
  age: Number
},{
  timestamps:true
})

const FooModel = mongoose.model('Foo', FooSchema)

const params = {
  find:{
      // your find params, can be left blank if all the documents are wanted
  }
  limit:5, // the limit of documents you want at a time
  next: cursor // only when calling for subsequent documents
               //you can find this in the response array from the function
}

cmp.paginate(FooModel, params)
  .then(result=>{
    const docs = result[0],  // the returned documents from the model
        hasMore = result[1],  // boolean value which tells if there are more documents left
        next = result[2]  // the cursor to the next document, this is null if hasMore is false
                          //  should be passed in the function above
  })
  
 ```

Currently this library only supports sorting based upon the updatedAt value of the document. 
Continously making changes, and looking for suggestions.

