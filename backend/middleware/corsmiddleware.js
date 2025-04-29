// Add this file to your backend codebase
// and require it in your server.js file

/**
 * Custom CORS middleware that works even if the cors npm package isn't working properly
 * This is a more aggressive approach that should work in most scenarios
 */
module.exports = function(req, res, next) {
    // Set specific domains you want to allow, or use * for any domain
    res.header('Access-Control-Allow-Origin', 'https://rolsa-tech-ea9t.onrender.com');
    
    // Allow credentials
    res.header('Access-Control-Allow-Credentials', 'true');
    
    // Allow these methods 
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
    // Allow these headers
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    // Handle preflight OPTIONS requests (browser sends these before actual requests)
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
    // Continue to the next middleware
    next();
  };