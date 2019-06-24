// @ts-ignore
import LUISClient from 'luis-client';
import { Response } from 'superagent';
import superagent from 'superagent';
import Environment from '../config/environment';

const agent = superagent.agent();
const env = new Environment();

// set proxy on each request
agent.use(req => {
  return req;
});

const luis: {
  predict: (text: string) => Promise<Response>;
} = new LUISClient(
  {
    appId: env.luis.id,
    appKey: env.luis.key,
    authoringKey: env.luis.authoringKey,
    verbose: 'false',
    region: 'westus',
    version: '2.0',
    versionId: '0.1'
  },
  agent
);

type Intent = 'Query_For_Skills' | 'None' | 'Find_Resume' | 'Timesheet' | 'ADP';
interface LuisResponse {
  query: string;
  topScoringIntent: {
    intent: Intent;
    score: number;
  };
  intents: { intent: Intent; score: number }[];
  entities: {
    entity: string;
    type: string;
    startIndex: number;
    endIndex: number;
    resolution: any;
  }[];
}

const predict = async (text: string) => {
  const res = await luis.predict(text);
  return res.body as LuisResponse;
};

export { predict };
