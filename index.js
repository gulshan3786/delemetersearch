const express=require('express');
const app= express();
const port=3000;
app.set('view engine', 'ejs');
var parser=require('body-parser');
const mysql=require('mysql2');
const {parse}=require('path');
const {log}=require('console');


app.use(parser.json());
app.use(parser.urlencoded({extended: false}));


var db = mysql.createConnection({
  host     : "localhost",
  user     : "root",
  password : "root",
  database : "db_26"
});
db.connect((err)=>{
    if(err)throw err;
    console.log("database connected successfully");
});

app.get('/',(req,res)=>{
var q1=`select * from student_master`;
db.query(q1,(error,results)=>{
if(error)throw error;
const columns = Object.keys(results[0]);
const rows = results;
res.render('one.ejs',
{rows:results,
 columns:columns


});
})
  
})

app.post('/',(req,res)=>{
    var p=req.body.q;
    console.log(p);
    var y=p.replace(/(?=[$-/:-?{-~!"^_`\[\]])/gi,",");
    console.log(y);
    var t=y.split(',');
    
    console.log(t);

    var fname=[];
    var lname=[];
    var email=[];
    var mobile=[];
    var city=[];
    var fathername=[];


    for(let i=1;i<t.length;i++){
        if(t[i].startsWith('_')){
            val=t[i].replace('_','');
            fname.push(val);
        }
        if(t[i].startsWith('^')){
            val=t[i].replace('^','');
            lname.push(val);
        }
        if(t[i].startsWith('$')){
            val=t[i].replace('$','');
            email.push(val);
        }
        if(t[i].startsWith(';')){
            val=t[i].replace(';','');
            mobile.push(val);
        }
        if(t[i].startsWith('{')){
            val=t[i].replace('{','');
            city.push(val);
        }
        if(t[i].startsWith('}')){
            val=t[i].replace('}','');
            fathername.push(val);
        }
    }
    q1=`select * from student_master where `;
    
    if(fname.length>=1){
        for(let i=0;i<fname.length;i++){
            q1 +=` firstname like '%${fname[i]}%' or `
        }

       q1= q1.slice(0,q1.length-3) + 'and';
    }
    // console.log(fname);
    // console.log(q1);

    if(lname.length>=1){
        for(let i=0;i<lname.length;i++){
            q1 +=` lastname like '%${lname[i]}%' or `
        }

       q1= q1.slice(0,q1.length-3) + 'and';
    }
    if(email.length>=1){
        for(let i=0;i<lname.length;i++){
            q1 +=` email like '%${email[i]}%' or `
        }

       q1= q1.slice(0,q1.length-3) + 'and';
    }
    if(mobile.length>=1){
        for(let i=0;i<mobile.length;i++){
            q1 +=` contact like '%${mobile[i]}%' or `
        }

       q1= q1.slice(0,q1.length-3) + 'and';
    }
    if(city.length>=1){
        for(let i=0;i<city.length;i++){
            q1 +=` city like '%${city[i]}%' or `
        }

       q1= q1.slice(0,q1.length-3) + 'and';
    }
    if(fathername.length>=1){
        for(let i=0;i<fathername.length;i++){
            q1 +=` fathername like '%${fathername[i]}%' or `
        }

       q1= q1.slice(0,q1.length-3) + 'and';
    }
    if(q1.includes("and",q1.length-5)  ){
        q1=q1.slice(0,q1.length-4);
    }
    if(q1.includes("or",q1.length-5)  ){
        q1=q1.slice(0,q1.length-3);
    }
    
   


   console.log(q1);
   db.query(q1,(error,results)=>{
    if(error)throw error;
    // const columns = Object.keys(results[0]);
    if (results && results.length > 0) {
        const columns = Object.keys(results[0]);
        const rows = results;
        res.render('one.ejs',
        {rows:results,
         columns:columns
        });
      } else {
        res.send("<center><h1>No match Found</h1></center>")
      }
   
    
    });


})

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})