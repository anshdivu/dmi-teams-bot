import * as luis from "./luis";
import { Message, Session } from "botbuilder";
import * as exp from "./experience";
import Environment from "../config/environment";

type MyMessage = string | Message;

export async function getMessage(
  text: string,
  session: Session,
  env: Environment["experience"]
): Promise<MyMessage[]> {
  const results = await getMessageInteral(text, session, env);
  return ([] as MyMessage[]).concat(results);
}

async function getMessageInteral(
  text: string,
  session: Session,
  env: Environment["experience"]
) {
  try {
    const res = await luis.predict(text);

    console.log(res.topScoringIntent.intent);
    switch (res.topScoringIntent.intent) {
      case "Query_For_Skills":
      case "Find_Resume":
        const searchText = res.entities.map(e => e.entity).join(" ");
        return searchExperience(session, env, searchText);
      case "ADP":
        return new Message(session).addAttachment(exp.AdpLinkCard(session));
      case "Timesheet":
        return new Message(session).addAttachment(exp.DeltekLinkCard(session));
      default:
        return "_Unknown Intent_";
    }
  } catch (error) {
    return JSON.stringify(error);
  }
}

async function searchExperience(
  session: Session,
  env: Environment["experience"],
  searchText: string
) {
  if (!searchText) {
    return "_Could not parse search_";
  }

  const cards = await exp.searchBySkill(session, searchText, env);

  if (Array.isArray(cards)) {
    return cards.map(card => new Message(session).addAttachment(card));
  }

  return cards as string;
}
