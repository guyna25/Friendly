export function get_full_access_url(
  username: string,
  password: string,
  cluster_url: string,
) {
  const res = `mongodb+srv://${username}:${password}@${cluster_url}/?retryWrites=true&w=majority`;
  return res;
}
