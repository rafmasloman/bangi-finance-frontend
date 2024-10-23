export function formatPathToTitle(path: string) {
  const segments = path.split('/');
  const lastSegment = segments[segments.length - 1];

  const formattedTitle = lastSegment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return formattedTitle;
}
