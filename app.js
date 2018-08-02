var http = require('http');
const router=require("./router.js");
//var file=require("fs");

//create a server object:
http.createServer(function (req, res) {
	
		
		    
            router.home(req,res);
            router.diffUser(req,res);
        
           
            //res.end("jjj");

	
		//res.end();
	
  
 
   //end the response
}).listen(8080); //the server object listens on port 8080




console.log("hello");
