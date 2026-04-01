export const moderationService = {
  canModerate(user: any) {
    return ['founder', 'admin', 'moderator'].includes(user.role);
  }
};
