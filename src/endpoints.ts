const BASE_URL = "";

function withBaseURL(url: string) {
  return `${BASE_URL}/${url}`;
}

const auth = {
  login: () => withBaseURL("login"),
};

export { auth };
