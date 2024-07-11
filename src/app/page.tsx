import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#02550d] to-[#152c1e] text-white">
      <h1 className="text-6xl font-bold">Welcome to J5 Software</h1>
      <p>Website build in progress</p>
      <p>
        Check out my{" "}
        <Link className="underline" href="/projects">
          projects
        </Link>
      </p>
      <p>
        Visit my{" "}
        <Link className="underline" href="/blog">
          blog
        </Link>
      </p>
    </main>
  );
}
