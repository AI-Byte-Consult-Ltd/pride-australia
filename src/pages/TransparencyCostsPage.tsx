import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Globe, Cloud, Shield, Brain, Building2, Laptop } from "lucide-react";

const TransparencyCostsPage = () => {
  const siteUrl = "https://pridesocial.org";
  const title = "Transparency & Costs | PRIDE Lab Foundation Australia";
  const description =
    "Transparency and cost breakdown for PRIDE Lab Foundation Australia: registration, compliance, operations, and how early supporter contributions are used.";

  const stripeLinks: Record<number, string> = {
    10: "https://buy.stripe.com/5kQ3cu8bA1j66axfZHaVa16",
    25: "https://buy.stripe.com/aFabJ0crQaTG7eB3cVaVa17",
    50: "https://buy.stripe.com/28EfZg63s7Hu42p6p7aVa18",
  };

  const handleDonate = (amount: number) => {
    const url = stripeLinks[amount];
    if (url) {
      window.open(url, "_blank");
    }
  };

  const donationAmounts = [
    { amount: 10, label: "AUD 10", description: "helps keep the platform online" },
    { amount: 25, label: "AUD 25", description: "covers a week of infrastructure" },
    { amount: 50, label: "AUD 50", description: "supports platform stability and operations" },
  ];

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
        <main className="mx-auto w-full max-w-4xl px-4 py-16 lg:py-24">
          <header className="mb-12 animate-fade-in">
            <h1 className="font-display text-4xl font-bold mb-4">Transparency & Costs</h1>
            <p className="text-lg text-muted-foreground">
              PRIDE Social Network is a community-driven platform operated by Pride Lab Foundation.
            </p>
          </header>

          <div className="space-y-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <section className="space-y-4">
              <p className="text-muted-foreground">
                We believe transparency is essential to trust, especially in projects built by and for the community.
                Below are our current and upcoming operational costs.
              </p>
              <p className="text-muted-foreground">
                Donations support the project as a whole and help ensure its long-term sustainability.
              </p>
            </section>

            {/* Current operational costs */}
            <section className="space-y-6">
              <h2 className="font-display text-2xl font-semibold">Current operational costs</h2>
              <div className="grid gap-4">
                <div className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                  <Globe className="h-6 w-6 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">Domain & DNS</p>
                    <p className="text-sm text-muted-foreground">approx. AUD 25 / month</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                  <Cloud className="h-6 w-6 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">Hosting & infrastructure</p>
                    <p className="text-sm text-muted-foreground">approx. AUD 65–90 / month</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                  <Shield className="h-6 w-6 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">Security, backups & monitoring</p>
                    <p className="text-sm text-muted-foreground">approx. AUD 15 / month</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                  <Brain className="h-6 w-6 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">Development & maintenance</p>
                    <p className="text-sm text-muted-foreground">volunteer-based (unpaid)</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Foundation setup & compliance */}
            <section className="space-y-6">
              <h2 className="font-display text-2xl font-semibold">Foundation setup & compliance</h2>
              <div className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                <Building2 className="h-6 w-6 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Pride Lab Foundation registration & initial compliance</p>
                  <p className="text-sm text-muted-foreground">approx. AUD 1,100 (one-off)</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    (legal setup, registration fees, required compliance steps)
                  </p>
                </div>
              </div>
            </section>

            {/* Administrative & operational equipment */}
            <section className="space-y-6">
              <h2 className="font-display text-2xl font-semibold">Administrative & operational equipment</h2>
              <div className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                <Laptop className="h-6 w-6 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Laptop for administrative and operational use</p>
                  <p className="text-sm text-muted-foreground">approx. AUD 1,200 (one-off)</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    This equipment is required for day-to-day foundation administration, documentation, communications, and platform operations.
                  </p>
                </div>
              </div>
            </section>

            {/* Support PRIDE section */}
            <section className="space-y-6 p-8 rounded-2xl gradient-pride-soft border">
              <div className="text-center">
                <h2 className="font-display text-2xl font-semibold mb-2">Support PRIDE</h2>
                <p className="text-muted-foreground">
                  You can support PRIDE Social Network with a donation of any amount.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-medium text-center">Suggested contributions:</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {donationAmounts.map((item) => (
                    <Button
                      key={item.amount}
                      variant="outline"
                      size="lg"
                      className="h-auto py-4 flex flex-col items-center gap-1 hover:border-primary hover:bg-primary/5"
                      onClick={() => handleDonate(item.amount)}
                    >
                      <span className="font-bold text-lg">{item.label}</span>
                      <span className="text-xs text-muted-foreground text-center">{item.description}</span>
                    </Button>
                  ))}
                </div>

                <div className="text-center pt-4">
                  <p className="text-sm text-muted-foreground">
                    For custom amounts, please visit our{" "}
                    <a href="/support" className="text-primary hover:underline">Support page</a>.
                  </p>
                </div>
              </div>

              <div className="text-center space-y-2 pt-4">
                <p className="text-sm text-muted-foreground">
                  Every contribution helps keep PRIDE independent, inclusive, and community-owned.
                </p>
                <p className="text-sm text-muted-foreground">
                  Donations are used to support the ongoing operation and development of PRIDE Social Network.
                </p>
              </div>
            </section>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default TransparencyCostsPage;
