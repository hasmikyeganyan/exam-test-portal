export const validResponse = (res: Response) => {
  if (!res || res.status < 200 || res.status >= 400) return false;

  return true;
};
