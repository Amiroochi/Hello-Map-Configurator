import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/login", () => {
    return HttpResponse.json({
      token: "mocked_user_token",
    });
  }),
];
