/**
 * Helper to resolve asset URLs consistently across local dev, Vite preview,
 * GitHub Pages repository subpaths, and custom domain deployments.
 */
export const getAssetUrl = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL || './';
  const sep = base.endsWith('/') ? '' : '/';
  return `${base}${sep}${cleanPath}`;
};
