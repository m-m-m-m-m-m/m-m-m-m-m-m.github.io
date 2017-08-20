function checkBodyOnPut(body){
  return body.username || body.password || body.email;
}

function checkBodyOnPost(body){
  return body.username && body.password && body.email;
}

module.exports = function(req, res, next) {
  if(req.method == 'POST'){
    if(!checkBodyOnPost(req.body)){
      res.status(400).end();
      return;
    }
  } else {
   if(!checkBodyOnPut(req.body)) {
     res.status(400).end();
     return
   }
  }

  next();
};