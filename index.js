const express = require('express')

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//app.use(bodyParser.urlencoded({ extended: false }));

app.get('/sendotp', async(req,res) => {

    var number = req.query.number 
    const Nexmo = require("nexmo")
    require('dotenv').config()
    
    const nexmo = new Nexmo({
        apiKey: "4cfc2072",
        apiSecret: "lNGlcFVzNrV6SI3x"
      })
    
    await nexmo.verify.request({
        number: number,
        brand: "My Super App"
    }, (err,result)=>{
        if (err) {
            console.error(err);
          } else {
            const verifyRequestId = result.request_id
            console.log('request_id', verifyRequestId)
            // res.send(`OTP Sent!`)
           // res.send(verifyRequestId);

            Promise.resolve(verifyRequestId).then(function(value) {
              res.setHeader('Content-Type', 'application/json');
              const resp = {
                number : value
              };
              res.send(resp)
            });



          }
    })

});


app.get('/checkotp', async(req,res) => {
  
  const Nexmo = require("nexmo")
  require('dotenv').config()
  
  const nexmo = new Nexmo({
      apiKey: "4cfc2072",
      apiSecret: "lNGlcFVzNrV6SI3x"
    })
var id  = req.query.id;
var code = req.query.otp;

nexmo.verify.check({
    request_id: id,
    code: code
  }, (err, result) => {
    if (err) {
      console.error(err)
    } else {
      Promise.resolve(result).then(function(value) {
        res.setHeader('Content-Type', 'application/json');
        res.send(result)
      });
    }
  })

});


//app.listen(process.env.PORT);
app.listen(8091, function () { console.log('Server listening on port 8091!') })
