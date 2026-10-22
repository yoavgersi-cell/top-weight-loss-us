// The site is served at the domain root, so nav links never carry a prefix.
export function useNavPrefix(): string {
  return "";
}

export function navHref(prefix: string, path: string): string {
  if (path === "/") return prefix || "/";
  return `${prefix}${path}`;
}
