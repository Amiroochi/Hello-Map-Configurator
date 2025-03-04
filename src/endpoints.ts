const BASE_URL = "";

function withBaseURL(url: string) {
  return `${BASE_URL}/${url}`;
}

const auth = {
  login: () => withBaseURL("login"),
};

const dashboard = {
  readProjects: (userId: string) => withBaseURL(`users/${userId}/projects`),
  readProject: (projectId: string) => withBaseURL(`projects/${projectId}`),
  readProjectConfig: (projectId: string) => withBaseURL(`projects/${projectId}/config`),
};

export { auth, dashboard };
