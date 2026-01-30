import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Cloud,
  Shield,
  Brain,
  Building2,
  Laptop,
  Eye,
  Coins,
  Scale,
  Calculator,
  Calendar,
  Users,
  Server,
  Wrench,
  ArrowRight,
  Smartphone,
  BadgeCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const TransparencyCostsPage = () => {
  const siteUrl = "https://pridesocial.org";
  const title = "Transparency & Costs | Pride Social Network (EU HQ)";
  const description =
    "Transparent cost breakdown for Pride Social Network: EU-based operations, Italy foundation registration planning, mobile apps (iOS & Android), infrastructure, and how memberships support development.";

  // ✅ Updated subscription amounts (monthly): €2.50, €8.50, €42.00
  // NOTE: Replace links below with your recurring checkout links (Stripe/Revolut/etc) when ready.
  // If you already created subscription links, paste them here and everything will work.
  const membershipLinks = {
    basic: {
      amount: 2.5,
      label: "PRIDE Basic",
      // TODO: paste real subscription checkout link
      url: "", // e.g. "https://buy.stripe.com/...."
    },
    pro: {
      amount: 8.5,
      label: "PRIDE Pro",
      // TODO: paste real subscription checkout link
      url: "",
    },
    elite: {
      amount: 42,
      label: "PRIDE Elite",
      // TODO: paste real subscription checkout link
      url: "",
    },
  } as const;

  // Support buttons (now EU / product-first)
  const supportButtons = [
    {
      label: "Support Infrastructure",
      description: "Hosting, database, uptime, backups, and monitoring",
      planKey: "basic" as const,
      icon: <Server className="h-5 w-5" />,
    },
    {
      label: "Support Mobile Apps",
      description: "iOS + Android development & store publishing costs",
      planKey: "pro" as const,
      icon: <Smartphone className="h-5 w-5" />,
    },
    {
      label: "Support Italy Foundation Setup",
      description: "Legal setup, compliance preparation, and registration planning",
      planKey: "elite" as const,
      icon: <Building2 className="h-5 w-5" />,
    },
  ];

  // Updated cost list to reflect EU HQ + Italy foundation + mobile apps + sponsorship
  const currentCosts = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: "European Union headquarters (operations & administration)",
      amount: "EU-based",
      type: "ongoing",
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "Pride Lab Foundation Italy — registration planning",
      amount: "planned",
      type: "planned",
    },
    {
      icon: <Scale className="h-6 w-6" />,
      title: "Legal & compliance (policies, agreements, governance)",
      amount: "ongoing",
      type: "ongoing",
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Platform tools & services (website stack, tooling, workflows)",
      amount: "ongoing",
      type: "ongoing",
    },
    {
      icon: <Server className="h-6 w-6" />,
      title: "Hosting & infrastructure (web, database, realtime, storage)",
      amount: "ongoing",
      type: "recurring",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Safety & moderation systems (policies + tooling)",
      amount: "planned",
      type: "planned",
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI layer (assistive features, safety assistance, tooling)",
      amount: "planned",
      type: "planned",
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile apps (iOS + Android)",
      amount: "planned",
      type: "planned",
    },
    {
      icon: <Laptop className="h-6 w-6" />,
      title: "Equipment & development environment",
      amount: "ongoing",
      type: "ongoing",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Community events & activations (online/offline)",
      amount: "planned",
      type: "planned",
    },
    {
      icon: <BadgeCheck className="h-6 w-6" />,
      title: "Sponsorship & partnerships (brands, creators, NGOs)",
      amount: "planned",
      type: "planned",
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "USA foundation initiative",
      amount: "postponed (indefinite)",
      type: "planned",
    },
  ];

  const handleMembership = (planKey: keyof typeof membershipLinks) => {
    const url = membershipLinks[planKey].url;
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    // fallback UX if link not set yet
    window.location.href = "/support";
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${siteUrl}/transparency-and-costs`} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${siteUrl}/transparency-and-costs`} />
      </Helmet>

      <Layout>
        {/* Hero */}
        <section className="py-20 lg:py-28 gradient-hero">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-pride mb-6">
                <Eye className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Transparency & <span className="gradient-pride-text">Costs</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                We believe trust is built through transparency — clear priorities, clear spending, clear progress.
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 lg:py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Pride Social Network is built and operated from the European Union. Our next foundation milestone is{" "}
                <span className="font-medium text-foreground">Pride Lab Foundation Italy</span>. The USA foundation
                initiative is <span className="font-medium text-foreground">postponed for an indefinite period</span>.
                <br />
                <br />
                Below is how we share costs and priorities openly. This page is updated as the platform grows, mobile
                apps move into production, and the Italy foundation work progresses.
              </p>
            </div>
          </div>
        </section>

        {/* Current & Planned Costs */}
        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <Coins className="h-4 w-4" />
                  Financial Breakdown
                </div>
                <h2 className="font-display text-3xl font-bold mb-4">Current & Planned Costs</h2>
                <p className="text-muted-foreground">
                  Cost items are grouped by status: recurring, one-off, ongoing, and planned.
                </p>
              </div>

              <div className="grid gap-4">
                {currentCosts.map((cost, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-5 rounded-xl bg-card border shadow-card animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      {cost.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{cost.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-primary font-semibold">{cost.amount}</span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            cost.type === "one-off"
                              ? "bg-blue-500/10 text-blue-600"
                              : cost.type === "recurring"
                              ? "bg-green-500/10 text-green-600"
                              : cost.type === "ongoing"
                              ? "bg-purple-500/10 text-purple-600"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {cost.type}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sponsorship note */}
              <div className="mt-8 p-6 rounded-2xl bg-card border shadow-card animate-fade-in" style={{ animationDelay: "0.25s" }}>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl gradient-pride flex items-center justify-center shrink-0">
                    <BadgeCheck className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display font-semibold text-lg mb-1">Sponsorship & Partnerships</p>
                    <p className="text-muted-foreground">
                      Alongside memberships, we plan structured sponsorship packages (brands, NGOs, creators, events).
                      Sponsorship will be transparent, optional, and aligned with our values — with clear disclosure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support Buttons */}
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <Users className="h-4 w-4" />
                  Support Pride Social
                </div>
                <h2 className="font-display text-3xl font-bold mb-4">Memberships (Monthly)</h2>
                <p className="text-lg text-muted-foreground">
                  €2.50, €8.50, and €42 per month — predictable support that helps us ship faster (web + iOS + Android).
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-6 mb-12">
                {supportButtons.map((button, index) => {
                  const plan = membershipLinks[button.planKey];
                  return (
                    <button
                      key={index}
                      onClick={() => handleMembership(button.planKey)}
                      className="group p-6 rounded-2xl bg-card border shadow-card hover:shadow-elevated hover:border-primary transition-all duration-300 text-left animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex items-center justify-center mb-4">
                        {button.icon}
                      </div>
                      <h3 className="font-display font-semibold mb-1">{button.label}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{button.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg text-primary">
                          €{plan.amount.toFixed(plan.amount % 1 === 0 ? 0 : 2)} / month
                        </span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Plan: <span className="font-medium text-foreground">{plan.label}</span>
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Contribute to Events / Sponsorship CTA */}
              <div className="p-8 rounded-2xl gradient-pride-soft border text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="h-14 w-14 rounded-xl gradient-pride flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">Events & Sponsorship</h3>
                <p className="text-muted-foreground mb-6">
                  Want to support Pride Social Network through partnerships or event sponsorship? We’ll publish clear
                  packages and disclosure rules.
                </p>
                <Button variant="pride" size="lg" asChild>
                  <Link to="/contact">
                    Contact for Partnerships
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Apps section */}
        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="p-8 rounded-2xl bg-card border shadow-card animate-fade-in">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                    <Smartphone className="h-4 w-4" />
                    Mobile Apps
                  </div>
                  <h2 className="font-display text-2xl font-semibold mb-2">iOS & Android</h2>
                  <p className="text-muted-foreground">
                    Mobile apps are part of the roadmap. Memberships help fund development, testing, and store releases.
                  </p>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-xl bg-muted/40 border">
                    <p className="font-medium mb-1">iOS app</p>
                    <p className="text-sm text-muted-foreground">App build, testing, and App Store release pipeline</p>
                  </div>
                  <div className="p-5 rounded-xl bg-muted/40 border">
                    <p className="font-medium mb-1">Android app</p>
                    <p className="text-sm text-muted-foreground">Play Store release, device coverage, and performance tuning</p>
                  </div>
                  <div className="p-5 rounded-xl bg-muted/40 border">
                    <p className="font-medium mb-1">Shared foundation</p>
                    <p className="text-sm text-muted-foreground">Auth, safety tooling, notifications, media, and scalability</p>
                  </div>
                </div>

                <div className="text-center pt-6 border-t mt-6">
                  <p className="text-sm text-muted-foreground">
                    Want to see the full plan? Check the{" "}
                    <Link to="/roadmap" className="text-primary hover:underline">
                      Roadmap
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Statement */}
        <section className="py-16 lg:py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <Shield className="h-12 w-12 text-primary mx-auto mb-6" />
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every membership helps keep Pride Social Network independent, inclusive, and community-first. Support is
                used to fund development, infrastructure, safety tooling, and the long-term foundation direction —
                starting with Italy, with EU-based operations.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="pride" size="lg" asChild>
                  <Link to="/support">
                    View Memberships
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/transparency-and-costs">
                    Refresh This Page
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: If a membership checkout link is not configured yet, the button will open the Support page.
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default TransparencyCostsPage;
