import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>
        This site is still under construction, it&apos;s possible that the page
        you&apos;re looking for hasn&apos;t been built yet.
      </p>
      <Link className="underline" href="/">
        Return Home
      </Link>
    </div>
  );
}
