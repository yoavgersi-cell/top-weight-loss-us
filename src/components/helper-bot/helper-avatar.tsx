// Lily's face: the friendly smiling robot (public/helper-lily.png, 192px,
// round with a transparent edge). Plain <img> so it renders identically in
// the bubble, the chat header and next to each message.
export function HelperAvatar({ className = "h-10 w-10" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/helper-lily.png" alt="" aria-hidden="true" width={96} height={96} className={`${className} rounded-full`} />
  );
}
