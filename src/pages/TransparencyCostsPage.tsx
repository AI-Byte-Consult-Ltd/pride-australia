import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";

const TransparencyCostsPage = () => {
  const siteUrl = "https://pridesocial.org";
  const title = "Transparency & Costs | PRIDE Lab Foundation Australia";
  const description =
    "Transparency and cost breakdown for PRIDE Lab Foundation Australia: registration, compliance, operations, and how early supporter contributions are used.";

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
        <main className="mx-auto w-full max-w-4xl px-4 py-10">
          <h1 className="text-3xl font-bold">Transparency & Costs</h1>
          <p className="mt-3 text-muted-foreground">
            We believe trust is built through clarity. This page explains the registration process,
            expected costs, and how early supporter contributions help us establish PRIDE Lab Foundation
            in Australia and launch the PRIDE Social Network.
          </p>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">What your contribution supports</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Official registration and compliance steps (Australia)</li>
              <li>Legal documentation, governance setup, and policy preparation</li>
              <li>Operational setup (banking, accounting, administration)</li>
              <li>Core platform infrastructure and security</li>
              <li>Early community programs, events, and moderation tooling</li>
            </ul>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">Costs and estimates</h2>
            <p className="text-muted-foreground">
              Registration and setup costs can vary depending on requirements and service providers.
              We publish updates as we receive invoices and complete each milestone.
            </p>

            <div className="mt-4 rounded-lg border p-4">
              <p className="font-medium">We track these categories:</p>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Government / registration fees</li>
                <li>Legal and compliance support</li>
                <li>Banking and operational setup</li>
                <li>Hosting, security, and infrastructure</li>
                <li>Community and moderation operations</li>
              </ul>
            </div>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">How we report</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>We post milestone updates when registration steps are completed.</li>
              <li>We can share summary receipts/invoices upon request where appropriate.</li>
              <li>We keep supporter packages as one-time contributions (no subscriptions by default).</li>
            </ul>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">Questions</h2>
            <p className="text-muted-foreground">
              If you have questions about costs, timelines, or how funds are used, contact us and we’ll
              reply with details.
            </p>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default TransparencyCostsPage;
