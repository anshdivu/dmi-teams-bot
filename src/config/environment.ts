/**
 * @todo: Update `.env.sample` file whenever `EnvVars` are updated.
 */
type EnvVars = Partial<{
  NODE_ENV: string;
}>;

export default class Environment {
  constructor(private readonly config: EnvVars = process.env) {}

  get app() {
    return {
      inProd: this.config.NODE_ENV === 'production'
    };
  }
}
