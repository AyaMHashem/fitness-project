const jwt = require('jsonwebtoken');



module.exports =function (req, res , next) {
    console.log(req.header);
    const token = req.header('x-auth-token');
    if(token){
        return res.status(401).send('access rejected ...')
    }
    //عاوزين نتأكد هل الtoken ده صحيح ولا هو بعت أي حاجة
    try {
        const decodeToken =jwt.verify(token, 'privateKey')
        req.user =decodeToken;
        //next بقوله خلاص اتخلص من الmiddleware وكمل
        next()
        
    } catch (error) {
        return res.status(400).send('wrong token ...')
        
    }
    
}