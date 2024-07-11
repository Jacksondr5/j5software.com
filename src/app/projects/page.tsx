import Link from "next/link";
import { type ReactNode } from "react";

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-extrabold">Projects</h1>
      <CardGroup title="Developer Platform">
        <Card
          title="CI/CD"
          description="Pipelines to ship a core banking platform faster than just about anyone else."
          href="/projects/developer-platform/ci-cd"
        />
        <Card
          title="Automated Testing"
          description="A scalable framework that keeps teams confident as they rapidly iterate."
          href="/projects/developer-platform/automated-testing"
        />
        <Card
          title="Component Library"
          description="Everything our teams need to build high-quality UI"
          href="/projects/developer-platform/component-library"
        />
      </CardGroup>
      <CardGroup title="Homelab">
        <Card
          title="Platform"
          href="/projects/homelab/platform"
          description="The foundation for my homelab, including kubernetes, DNS, certificates, and more."
        />
        <Card
          title="Automation"
          href="/projects/homelab/automation"
          description="Everything I've done to make building my homelab easier."
        />
        <Card
          title="Power Loss Management"
          href="/projects/homelab/power-loss"
          description="A system that gracefully shuts down my homelab during power outages."
        />
      </CardGroup>
      <CardGroup title="Personal Projects">
        <Card
          title="j5software.com"
          href="/projects/personal/j5software"
          description="The website you're on right now."
        />
      </CardGroup>
    </>
  );
}

type CardProps = {
  description: ReactNode;
  href: string;
  title: string;
};

function Card({ href, description, title }: CardProps) {
  return (
    <div className="flex flex-col items-center gap-2 p-4 outline outline-2">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p>{description}</p>
      <Link href={href} className="underline">
        Learn more
      </Link>
    </div>
  );
}

type CardGroupProps = {
  children: ReactNode;
  title: string;
};

function CardGroup({ children, title }: CardGroupProps) {
  return (
    <div className="m-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="flex gap-2">{children}</div>
    </div>
  );
}
