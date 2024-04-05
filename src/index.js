const app = require("./app");
const { logger } = require("./utils/logger");
const { PORT } = require("./utils/secrets");

app.listen(PORT, () => {
  logger.info(`Running on PORT ${PORT}`);
});
