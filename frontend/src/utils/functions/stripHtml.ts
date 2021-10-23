export const stripHtml = (text: string) => {
  return text.replace(/<[^>]*>/g, '');
};
