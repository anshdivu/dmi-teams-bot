import { UniversalBot } from 'botbuilder';
import { TeamsChatConnector, TeamsMessage } from 'botbuilder-teams';
// import { getMessage } from './message-builder';
import Environment from '../config/environment';

export function teamsBot(config: Environment) {
  const { connector } = initBotAndConnector(config);
  return connector;
}

function initBotAndConnector({ teamsBot, experience }: Environment) {
  const connector = new TeamsChatConnector({
    appId: teamsBot.id,
    appPassword: teamsBot.password
  });

  const bot = new UniversalBot(connector, async session => {
    session.sendTyping();
    const text = TeamsMessage.getTextWithoutMentions(session.message);
    session.send(text);

    // const msgs = await getMessage(text, session, experience);
    // msgs.forEach(msg => session.send(msg));
  });

  return { connector, bot };
}
