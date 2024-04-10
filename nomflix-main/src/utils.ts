export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}
export const makeComingSoonImg="https://www.whats-on-netflix.com/wp-content/uploads/2023/06/first-look-whats-coming-to-netflix-july-2023-jpg.webp"
export const makeNoImg="https://images.unsplash.com/photo-1621955964441-c173e01c135b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1186&q=80"
