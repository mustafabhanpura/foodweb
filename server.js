const express = require('express');
var hbs = require('hbs');
const fs = require('fs');
var app = express();
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');


hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
})
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase()
})
app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{
  var now = new Date().toString();
  var log=(`${now}: ${req.method} ${req.url}`);
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
      console.log('Unable to connects');
    };
  });

  next();
});
app.get('/',(req,res)=>{
// res.send('<h1>Hello Express</h1>');
  res.render('about.hbs',{
    pageTitle:'Home Page',
    welcomeMessage:'Welcome to my website',
    // currentYear:new Date().getFullYear()
  });
});
// app.get('/about',(req,res)=>{
//   res.render('about.hbs',{
//     pageTitle:'About Page',
//     currentYear:new Date().getFullYear()
//   });
// });
app.listen(3000,()=>{
  console.log('Server is up');
});
