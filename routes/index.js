const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello from PicPulse route!')
})

// Export the router
module.exports = router;