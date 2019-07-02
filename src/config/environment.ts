/**
 * @todo: Update `.env.sample` file whenever `EnvVars` are updated.
 */
type EnvVars = Partial<{
  BOT_ID: string;
  BOT_PASSWORD: string;

  EXP_API_URL: string;
  EXP_AUTH_HEADER: string;
  EXP_URL: string;

  LUIS_APP_ID: string;
  LUIS_APP_KEY: string;
  LUIS_AUTHORING_KEY: string;

  NODE_ENV: string;
}>;

export default class Environment {
  constructor(private readonly config: EnvVars = process.env) {}

  get app() {
    return {
      inProd: this.config.NODE_ENV === "production"
    };
  }

  get experience() {
    return {
      apiUrl: this.config.EXP_API_URL,
      authHeader: this.config.EXP_AUTH_HEADER,
      url: this.config.EXP_URL
    };
  }

  get teamsBot() {
    return {
      id: this.config.BOT_ID,
      password: this.config.BOT_PASSWORD
    };
  }

  get luis() {
    return {
      id: this.config.LUIS_APP_ID,
      key: this.config.LUIS_APP_KEY,
      authoringKey: this.config.LUIS_AUTHORING_KEY
    };
  }
}
