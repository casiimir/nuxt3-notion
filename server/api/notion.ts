import { Client } from "@notionhq/client";

export default async (req: Request, res: Response) => {
  const config = useRuntimeConfig();

  const notion = new Client({ auth: config.notionApiKey });

  if (req.method === "POST") {
    // TODO
  } else {
    const db = await notion.databases.query({ database_id: config.notionDbId });
    const api = [];

    db.results.map((item: any): void => {
      api.push({
        id: item.properties?.id?.number || "no-id",
        date: item.properties?.Date?.date?.start || "no-date",
        description:
          item.properties?.Description?.rich_text[0]?.plain_text ||
          "no-description",
        name: item.properties?.name?.title[0]?.plain_text || "no-name",
        status: item.properties?.Status?.select?.name || "no-status",
      });
    });

    return api.sort((item1, item2) => item1.id - item2.id);
  }
};
