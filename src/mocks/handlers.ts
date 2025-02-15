import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.post("/login", async () => {
    await delay(3000);

    return HttpResponse.json({
      token: "mocked_user_token",
    });
  }),
];
