const { logger } = require('../../utils/logger');
const { createTableUsers: createTableUsersQuery } = require('../queries');

(() => {    
   require('../../config/db.config').query(createTableUsersQuery, (err, _) => {
        if (err) {
            logger.error(err.message);
            return;
        }
        logger.info('Table users created!');
        process.exit(0);
    });
})();
