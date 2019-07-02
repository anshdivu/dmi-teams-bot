import axios from "axios";
import { CardAction, CardImage, Session, ThumbnailCard } from "botbuilder";
import Environment from "../config/environment";

export async function downloadResume(
  id: string,
  env: Environment["experience"]
) {
  const path = `resume/${id}/download/1`;
  return await connector(env).get(path, { responseType: "stream" });
}

export async function searchBySkill(
  session: Session,
  text: string,
  env: Environment["experience"]
) {
  const { data } = await searchApi(text, env);
  if (!(data && data.People && data.People.length > 0)) {
    return "> No User Found";
  }

  let msg = [];

  if (data.People.length > 3) {
    msg = (data.People || [])
      .slice(0, 3)
      .map(person => createThumbnailCard(session, person))
      .concat([showMoreCard(session, text)]);
  } else {
    msg = (data.People || []).map(person =>
      createThumbnailCard(session, person)
    );
  }

  // markdown person list
  // .map(person => `* ${person.FirstName} ${person.LastName} (${person.Email})`)
  // .join('\n');

  return msg;
}

async function searchApi(text: string, env: Environment["experience"]) {
  console.log("text", text);

  return await connector(env).get<{ People?: any[] }>(`/search`, {
    params: { term: text }
  });
}

export function connector(env: Environment["experience"]) {
  return axios.create({
    baseURL: env.apiUrl,
    headers: { Authorization: env.authHeader }
  });
}

function createThumbnailCard(session: Session, person: any) {
  return new ThumbnailCard(session)
    .title(`${person.FirstName} ${person.LastName}`)
    .subtitle(person.Email)
    .text(person.JobTitle)
    .images([
      CardImage.create(
        session,
        `https://teams.microsoft.com/api/mt/amer/beta/users/${
          person.Email
        }/profilepicturev2?displayname=${`${person.FirstName}%20${
          person.LastName
        }`}&voidCache=true`
      )
    ])
    .buttons([
      CardAction.openUrl(
        session,
        `${process.env.EXP_URL}#/people/${person.PersonID}`,
        "View Profile"
      ),
      CardAction.openUrl(
        session,
        `${process.env.APP_URL}/resume/${person.PersonID}`,
        "Download Resume"
      )
    ]);
}

function showMoreCard(session: Session, text: string) {
  return new ThumbnailCard(session).buttons([
    CardAction.openUrl(
      session,
      `${process.env.EXP_URL}#/search/${text}/All`,
      "Show More"
    )
  ]);
}

export function DeltekLinkCard(session: Session) {
  return new ThumbnailCard(session)
    .title("Deltek")
    .text(
      "DMI uses Deltek to track employee hours. Use the link below to access your timesheet"
    )
    .buttons([
      CardAction.openUrl(
        session,
        `https://timesheets.dminc.com/DeltekTC/welcome.msv`,
        "Deltek (External Link)"
      )
    ]);
}

export function AdpLinkCard(session: Session) {
  return new ThumbnailCard(session)
    .title("ADP")
    .text(
      "ADP is your resouce for pay stubs, health insurance enrollment, and tax documents."
    )
    .buttons([
      CardAction.openUrl(
        session,
        `https://workforcenow.adp.com/portal/theme`,
        "ADP (External Link)"
      )
    ]);
}
