declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module 'next-auth/react' {
  // minimal typing for useSession in this codebase
  export function useSession(): { data?: { user?: { email?: string } } };
}

declare module 'next-auth/middleware' {
  const _default: unknown;
  export default _default;
}
