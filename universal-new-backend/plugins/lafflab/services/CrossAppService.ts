export const CrossAppService = {
  async createLink(params: { userId: string; jokeId: string; targetApp: string }) {
    // persist cross_app_links row
    // generate deep link into target app with context
    const deepLinkUrl = `aureliaq://${params.targetApp}?source=lafflab&jokeId=${params.jokeId}`;
    return { deepLinkUrl };
  }
};
