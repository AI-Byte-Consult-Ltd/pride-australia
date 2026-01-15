import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Globe, Cloud, Shield, Brain, Building2, Laptop, Eye, Coins, Scale, Calculator, Calendar, Users, Server, Wrench, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const TransparencyCostsPage = () => {
  const siteUrl = "https://pridesocial.org";
  const title = "Transparency & Costs | PRIDE Lab Foundation Australia";
  const description =
    "Transparency and cost breakdown for PRIDE Lab Foundation Australia: registration, compliance, operations, and how early supporter contributions are used.";

  const stripeLinks = {
    10: "https://buy.stripe.com/5kQ3cu8bA1j66axfZHaVa16",
    25: "https://buy.stripe.com/aFabJ0crQaTG7eB3cVaVa17",
    50: "https://buy.stripe.com/28EfZg63s7Hu42p6p7aVa18",
  };

  const supportButtons = [
    {
      label: "Support Hosting",
      description: "Help keep our servers running",
      amount: 10,
      icon: <Server className="h-5 w-5" />,
    },
    {
      label: "Support Foundation Registration",
      description: "Help with legal setup costs",
      amount: 25,
      icon: <Building2 className="h-5 w-5" />,
    },
    {
      label: "Support Community Tools",
      description: "Fund platform development",
      amount: 50,
      icon: <Wrench className="h-5 w-5" />,
    },
  ];

  const currentCosts = [
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "Foundation registration (Australia)",
      amount: "AU $1,000",
      type: "one-off",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Hosting & infrastructure (GitHub Pages)",
      amount: "AU $100",
      type: "one-off",
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Website platform & tools (Lovable)",
      amount: "AU $60 / month",
      type: "recurring",
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Technology & automation tools (AI-based services)",
      amount: "AU $60 / month",
      type: "recurring",
    },
    {
      icon: <Laptop className="h-6 w-6" />,
      title: "Laptop & equipment",
      amount: "AU $2,950",
      type: "one-off",
    },
    {
      icon: <Calculator className="h-6 w-6" />,
      title: "Accounting & legal services",
      amount: "ongoing",
      type: "ongoing",
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "Office & administration",
      amount: "ongoing",
      type: "ongoing",
    },
    {
      icon: <Scale className="h-6 w-6" />,
      title: "Registration agents & compliance services",
      amount: "required for setup",
      type: "one-off",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Event preparation & community activities",
      amount: "planned",
      type: "planned",
    },
  ];

  const handleSupport = (amount: number) => {
    const url = stripeLinks[amount as keyof typeof stripeLinks];
    if (url) {
      window.open(url, "_blank");
    }
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
                We believe trust is built through transparency
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 lg:py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Below is an example of how costs are openly shared with the community. 
                This list is continuously updated as the Foundation progresses.
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
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          cost.type === 'one-off' ? 'bg-blue-500/10 text-blue-600' :
                          cost.type === 'recurring' ? 'bg-green-500/10 text-green-600' :
                          cost.type === 'ongoing' ? 'bg-purple-500/10 text-purple-600' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {cost.type}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
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
                  Support PRIDE
                </div>
                <h2 className="font-display text-3xl font-bold mb-4">Choose What to Support</h2>
                <p className="text-lg text-muted-foreground">
                  Select exactly what you want to contribute to — full transparency, full control
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-6 mb-12">
                {supportButtons.map((button, index) => (
                  <button
                    key={index}
                    onClick={() => handleSupport(button.amount)}
                    className="group p-6 rounded-2xl bg-card border shadow-card hover:shadow-elevated hover:border-primary transition-all duration-300 text-left animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex items-center justify-center mb-4">
                      {button.icon}
                    </div>
                    <h3 className="font-display font-semibold mb-1">{button.label}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{button.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg text-primary">AU ${button.amount}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Contribute to Events */}
              <div className="p-8 rounded-2xl gradient-pride-soft border text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="h-14 w-14 rounded-xl gradient-pride flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">Contribute to Events</h3>
                <p className="text-muted-foreground mb-6">
                  Help fund community events, workshops, and gatherings
                </p>
                <Button variant="pride" size="lg" asChild>
                  <Link to="/support">
                    View All Support Options
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Legacy Donation Options */}
        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="p-8 rounded-2xl bg-card border shadow-card animate-fade-in">
                <div className="text-center mb-8">
                  <h2 className="font-display text-2xl font-semibold mb-2">Quick Donations</h2>
                  <p className="text-muted-foreground">
                    General contributions to support the project as a whole
                  </p>
                </div>

                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  {[10, 25, 50].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="lg"
                      className="h-auto py-4 flex flex-col items-center gap-1 hover:border-primary hover:bg-primary/5"
                      onClick={() => handleSupport(amount)}
                    >
                      <span className="font-bold text-lg">AU ${amount}</span>
                      <span className="text-xs text-muted-foreground">
                        {amount === 10 && "helps keep the platform online"}
                        {amount === 25 && "covers a week of infrastructure"}
                        {amount === 50 && "supports platform stability"}
                      </span>
                    </Button>
                  ))}
                </div>

                <div className="text-center pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    For custom amounts, please visit our{" "}
                    <Link to="/support" className="text-primary hover:underline">Support page</Link>.
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
                Every contribution helps keep PRIDE independent, inclusive, and community-owned. 
                Donations are used to support the ongoing operation and development of PRIDE Social Network 
                and Pride Lab Foundation's community initiatives.
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default TransparencyCostsPage;
