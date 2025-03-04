import { delay, http, HttpResponse } from "msw";

import projects from "./data/projects.json";
import projectConfig from "./data/project-config.json";

const DELAY = 2000;

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
      id: params.projectId,
      name: "Weather Tracker",
      description: "A project to track weather conditions.",
    });
  }),

  http.get("/projects/:projectId/config", async () => {
    await delay(DELAY);

    return HttpResponse.json(projectConfig);
  }),
];
