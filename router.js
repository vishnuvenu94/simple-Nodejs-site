const Profile= require("./profile.js");
const renderer= require("./renderer.js");
const queryString=require("querystring");

const header={"Content-Type":"text/html"};
function home(req,res){
    if (req.url==="/"){
        if(req.method.toLowerCase()==="get"){

        
        res.writeHead(200,header);
        renderer.view("header",{},res);
        renderer.view("search",{},res);
        renderer.view("footer",{},res);
        res.end();
        }
        else{
            req.on("data",function(body){
                const query=queryString.parse(body.toString());
                res.writeHead(303,{"location":"/"+query.username});
                res.end();

            });

        }

       // res.write("middle\n");
        //res.end("ended");


    }
}

    function diffUser(req,res){
        const username=req.url.replace("/","");
        if(username.length>0){
            res.writeHead(200,header);
            renderer.view("header",{},res);
            
             

            const userProfile= new Profile(username);
            userProfile.on("end",function(json){
                const values={
                    username:json.profile_name,
                    avatarurl:json.gravatar_url,
                    badges:json.badges.length,
                    javascriptPoints:json.points.JavaScript
                };
                renderer.view("profile",values,res);

                renderer.view("footer",{},res);
                res.end();
            });

            userProfile.on("error",function(error){  
               renderer.view("error",{errorMessage:error.message},res);
               renderer.view("search",{},res);
               renderer.view("footer",{},res);

               res.end();
            });
        }
    }

    module.exports.home=home;
    module.exports.diffUser=diffUser;