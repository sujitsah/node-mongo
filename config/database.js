if(process.env.NODE_ENV=== 'production'){
module.exports = {
     mongoURI: 'mongodb+srv://sujit:Sujits@h60@node-crud-5lftc.mongodb.net/test?retryWrites=true&w=majority'
}

}
else{
    module.exports ={mongoURI: 'mongodb://localhost/vidjot-dev'}
}
