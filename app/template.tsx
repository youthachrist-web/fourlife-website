// Re-mounts on every navigation, so the `.page-enter` CSS animation replays
// on each route change (respects prefers-reduced-motion via globals.css).
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
