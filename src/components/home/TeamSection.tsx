import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Globe, Linkedin } from "lucide-react";

type TeamLinks = {
  website?: string;
  linkedin?: string;
};

type TeamMember = {
  name: string;
  title: string;
  description: string;
  image: string;
  // Where clicking the image/name should go (primary action)
  primaryUrl: string;
  links?: TeamLinks;
};

const teamMembers: TeamMember[] = [
  {
    name: "Pride Lab Foundation",
    title: "Community & Foundation",
    description:
      "Building Pride Social Network and supporting LGBTQ+ initiatives through technology and community-driven projects.",
    image: "/team/pride-foundation.png",
    primaryUrl: "https://pridesocial.org",
    links: {
      website: "https://pridesocial.org",
    },
  },
  {
    name: "NIX Space",
    title: "AI Infrastructure & Automation",
    description:
      "AI systems, automation, and infrastructure for modern products — from prototypes to production.",
    image: "/team/nix-space.png",
    primaryUrl: "https://nix.space",
    links: {
      website: "https://nix.space",
      // linkedin: "https://www.linkedin.com/company/XXXXX" // optional
    },
  },
  {
    name: "AByte Consult",
    title: "AI Development & Business Automation",
    description:
      "A global technology company specializing in AI development and business automation across multiple industries.",
    image: "/team/abyte-consult.png",
    primaryUrl: "https://abyte-consult.com",
    links: {
      website: "https://abyte-consult.com",
      // linkedin: "https://www.linkedin.com/company/XXXXX" // optional
    },
  },
];

function LinkIconButton({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <Button asChild variant="outline" size="sm" className="gap-2">
      <a href={href} target="_blank" rel="noreferrer">
        {icon}
        <span>{label}</span>
      </a>
    </Button>
  );
}

export function TeamSection() {
  return (
    <section id="team" className="py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight">Team & Partners</h2>
          <p className="mt-3 text-muted-foreground">
            The people and organizations helping us build Pride Social Network and launch the
            Pride Lab Foundation.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((m) => (
            <Card key={m.name} className="overflow-hidden">
              {/* Primary click area: image + name */}
              <a
                href={m.primaryUrl}
                target="_blank"
                rel="noreferrer"
                className="block hover:opacity-95 transition"
                aria-label={`Open ${m.name}`}
                title={`Open ${m.name}`}
              >
                <div className="flex items-center gap-4 p-6">
                  <div className="h-14 w-14 overflow-hidden rounded-xl border bg-background">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate text-lg font-semibold">{m.name}</h3>
                      <ExternalLink className="h-4 w-4 opacity-60" />
                    </div>
                    <p className="text-sm text-muted-foreground">{m.title}</p>
                  </div>
                </div>
              </a>

              <div className="px-6 pb-6">
                <p className="text-sm text-muted-foreground">{m.description}</p>

                {/* Optional: small logo link under the text (same as primary) */}
                <div className="mt-4">
                  <a
                    href={m.primaryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm underline underline-offset-4 opacity-90 hover:opacity-100"
                  >
                    Visit {m.name}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>

                {/* Secondary links: Website / LinkedIn */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {m.links?.website ? (
                    <LinkIconButton
                      href={m.links.website}
                      label="Website"
                      icon={<Globe className="h-4 w-4" />}
                    />
                  ) : null}

                  {m.links?.linkedin ? (
                    <LinkIconButton
                      href={m.links.linkedin}
                      label="LinkedIn"
                      icon={<Linkedin className="h-4 w-4" />}
                    />
                  ) : null}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamSection;

