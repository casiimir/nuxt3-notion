import { Client } from "@notionhq/client";
import { Body } from "nuxt/dist/head/runtime/components";

export default async (req: any, res: Response) => {
  const config = useRuntimeConfig();

  const notion = new Client({ auth: config.notionApiKey });

  if (req.method === "POST") {
    console.log("POST!");
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", async () => {
      const parsedBody = Buffer.concat(body).toString();
      const { description, id, Date, status, name } = JSON.parse(parsedBody);

      await notion.pages.create({
        parent: {
          database_id: config.notionDbId,
        },
        properties: {
          Description: {
            id: "%3ClzI",
            type: "rich_text",
            rich_text: [
              {
                type: "text",
                text: {
                  content: description,
                  link: null,
                },
                annotations: {
                  bold: false,
                  italic: false,
                  strikethrough: false,
                  underline: false,
                  code: false,
                  color: "default",
                },
                plain_text: description,
                href: null,
              },
            ],
          },
          id: {
            id: id,
            type: "number",
            number: 1,
          },
          Date: {
            id: "hpaF",
            type: "date",
            date: {
              start: Date,
              end: null,
              time_zone: null,
            },
          },
          Status: {
            id: "s%60Pf",
            type: "select",
            select: {
              id: "5be22627-cf96-4769-be12-ddb929c1d8be",
              name: status,
              color: "blue",
            },
          },
          name: {
            id: "title",
            type: "title",
            title: [
              {
                type: "text",
                text: {
                  content: name,
                  link: null,
                },
                annotations: {
                  bold: false,
                  italic: false,
                  strikethrough: false,
                  underline: false,
                  code: false,
                  color: "default",
                },
                plain_text: name,
                href: null,
              },
            ],
          },
        },
      });
    });
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
