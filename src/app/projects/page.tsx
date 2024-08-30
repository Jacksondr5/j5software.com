import Link from "next/link";
import { type ReactNode } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function Page() {
  return (
    <>
      <h1 className="text-green-11 text-center text-6xl font-extrabold">
        Projects
      </h1>
      <p className="text-gray-11 mt-6 text-center text-lg">
        This page gives you an overview of the different types of projects
        I&apos;ve worked on, both personally and professionally. Each of them
        has a page that goes over the project in detail.{" "}
      </p>
      <CardGroup
        title="Developer Platform"
        description="My biggest passion in software engineering is giving other engineers the tools they need to get more done faster.  These projects showcase how I accelerated a banking startup and gave my colleagues the power to keep up industry-leading momentum."
      >
        <ProjectCard
          title="CI/CD"
          description="Pipelines to ship a core banking platform faster than just about anyone else."
          href="/projects/developer-platform/ci-cd"
        />
        <ProjectCard
          title="Automated Testing"
          description="A scalable framework that keeps my colleagues confident as they rapidly iterate."
          href="/projects/developer-platform/automated-testing"
        />
        <ProjectCard
          title="Component Library"
          description="Everything my teams need to build high-quality UI"
          href="/projects/developer-platform/component-library"
        />
      </CardGroup>
      <CardGroup
        title="Homelab"
        description="Over the last few years, I've been building a mini-data center to self-host personal projects and learn more about the infrastructure that hosts my apps."
      >
        <ProjectCard
          title="Platform"
          href="/projects/homelab/platform"
          description="The foundation for my homelab, including kubernetes, DNS, certificates, and more."
        />
        <ProjectCard
          title="Automation"
          href="/projects/homelab/automation"
          description="Everything I've done to make building my homelab easier."
        />
        <ProjectCard
          title="Power Loss Management"
          href="/projects/homelab/power-loss"
          description="A system that gracefully shuts down my homelab during power outages."
        />
      </CardGroup>
      <CardGroup
        title="Personal Projects"
        description="These are some other noteworthy projects that don't fit into a bigger category."
      >
        <ProjectCard
          title="j5software.com"
          href="/projects/personal/j5software"
          description="The website you're on right now."
        />
        <ProjectCard
          title="Chromatic Usage Tool"
          href="/projects/personal/chromatic"
          description="A tool I made to help me analyze how we were using Chromatic snapshots at my job and find ways to reduce that usage."
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

function ProjectCard({ href, description, title }: CardProps) {
  return (
    <Card className="text-green-11 w-full bg-transparent text-center">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-gray-11">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="justify-center">
        <Button asChild variant="link" size="lg">
          <Link href={href}>Learn more</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

type CardGroupProps = {
  children: ReactNode;
  description: string;
  title: string;
};

function CardGroup({ children, description, title }: CardGroupProps) {
  return (
    <div className="text-green-11 m-4 mb-12">
      <h2 className="mb-8 w-full text-center text-4xl font-bold">{title}</h2>
      <p className="text-gray-11 text-center">{description}</p>
      <div className="mt-4 flex gap-12">{children}</div>
    </div>
  );
}
