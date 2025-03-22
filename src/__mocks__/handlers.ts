import { delay, http, HttpResponse } from "msw";

import projects from "./data/projects.json";
import projectConfig from "./data/project-config.json";

const DELAY = 100;

export const handlers = [
  http.post("/login", async () => {
    await delay(DELAY);

    return HttpResponse.json({
      token: "mocked_user_token",
    });
  }),

  http.get("/users/:userId/projects", async () => {
    await delay(DELAY);

    return HttpResponse.json(projects);
  }),

  http.get("/projects/:projectId", async ({ params }) => {
    await delay(DELAY);

    return HttpResponse.json({
      canonical_name: params.projectId,
      caption: "Weather Tracker",
      description: "A project to track weather conditions.",
    });
  }),

  http.get("/projects/:projectId/config", async () => {
    await delay(DELAY);

    return HttpResponse.json(projectConfig);
  }),

  http.post("/projects/:projectId/config/upload", async ({ request }) => {
    await delay(DELAY);

    const data = await request.formData();
    const file = data.get("file");

    if (!file) {
      return new HttpResponse("Missing file", { status: 400 });
    }

    if (!(file instanceof File)) {
      return new HttpResponse("Uploaded document is not a File", {
        status: 400,
      });
    }

    return HttpResponse.json(await file.text());
  }),

  http.post("/projects/:projectId/config/import", async ({ request }) => {
    await delay(DELAY);

    const body = await request.text();
    console.log(body);

    return HttpResponse.json(body);
  }),
];
