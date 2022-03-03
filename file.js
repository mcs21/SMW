var http=require('http');
var fs=require('fs');
var formidable = require("formidable");

http.createServer(function(req,res){
    if(req.url=='/'){
    res.writeHead(200,{'content-type':'text/html'});
    res.write('<form action="app" method="post" enctype="multipart/form-data">');
    res.write('<h1>Select two files</h1>');
    res.write('<input type="file"name="rf"><br>');
    res.write('<input type="file"name="wf"><br>');
    res.write('<input type="submit">');
    res.end();
    }else if (req.url=='/app') {
        var form=new formidable.IncomingForm();
        form.parse(req,function(err,fields,files) {
            if (!err) {
                var wf=files.wf.name,rf=files.rf.name;
                    console.log(wf);
                //opening destination file for appending
                var w=fs.createWriteStream(wf,{flags:'a'});

                //open source file for reading
                var r=fs.createReadStream(rf);

                w.on('close',function() {
                    console.log("writing done");
                });

                r.pipe(w);
                res.write('rf');
                res.end("Appended Successfully");
            }
            else{res.write("error in writing");}
        });
    }
    else{
        res.end("Page not Found");
    }
}).listen(8001);