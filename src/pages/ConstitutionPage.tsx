import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const ConstitutionPage = () => {
  return (
    <>
      <Helmet>
        <title>Constitution | PRIDE Lab Foundation</title>
        <meta
          name="description"
          content="Constitution of PRIDE Lab Foundation Ltd (Company Limited by Guarantee) — governance, objects, and operating principles."
        />
      </Helmet>

      <Layout>
        {/* Hero */}
        <section className="py-20 lg:py-28 gradient-hero">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="gradient-pride-text">Constitution</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                PRIDE Lab Foundation Ltd — Company Limited by Guarantee (registration in progress)
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <div className="p-6 sm:p-8 rounded-2xl bg-card border shadow-card">
                <div className="prose prose-sm sm:prose-base max-w-none">
                  <h2 className="font-display">CONSTITUTION</h2>
                  <p>
                    <strong>PRIDE Lab Foundation Ltd</strong>
                    <br />
                    Company Limited by Guarantee
                    <br />
                    Not-for-Profit Charity
                  </p>

                  <h3>1. Name</h3>
                  <p>The name of the company is PRIDE Lab Foundation Ltd.</p>

                  <h3>2. Type of Company</h3>
                  <p>
                    The company is a company limited by guarantee and is established as a not-for-profit organisation.
                  </p>

                  <h3>3. Objects</h3>
                  <p>The objects of the company are exclusively charitable and for the public benefit, including:</p>
                  <p>a) advancing education, inclusion, equality, and human rights;</p>
                  <p>b) supporting community development, mental health, and social wellbeing;</p>
                  <p>c) promoting research, innovation, and technology for social good;</p>
                  <p>d) supporting charitable, educational, and cultural initiatives;</p>
                  <p>e) undertaking activities incidental or conducive to achieving these objects.</p>

                  <h3>4. Not-for-Profit</h3>
                  <p>
                    The income and property of the company must be applied solely towards the promotion of its objects.
                    No income or property may be distributed to members, directors, or officers, except for reasonable
                    remuneration for services rendered or reimbursement of expenses.
                  </p>

                  <h3>5. Members</h3>
                  <p>The company must have at least one member.</p>
                  <p>
                    The initial and sole member of the company is AI Byte Consult Ltd, a company incorporated in
                    Bulgaria, European Union.
                  </p>
                  <p>Additional members may be admitted in accordance with this Constitution.</p>

                  <h3>6. Guarantee</h3>
                  <p>
                    Each member undertakes to contribute an amount not exceeding AUD 10 if the company is wound up while
                    the member is a member or within one year after ceasing to be a member.
                  </p>

                  <h3>7. Directors</h3>
                  <p>The company must have at least one director.</p>
                  <p>The business and affairs of the company are managed by the directors.</p>
                  <p>The initial directors are:</p>
                  <p>Alexander Lunin</p>
                  <p>Aleksandr Tochilov</p>
                  <p>Directors are not required to be residents of Australia.</p>

                  <h3>8. Responsible Persons</h3>
                  <p>All directors are responsible persons for the purposes of governance and regulatory compliance.</p>

                  <h3>9. Public Officer</h3>
                  <p>
                    The Public Officer of the company is Alexander Lunin unless otherwise resolved by the directors.
                  </p>

                  <h3>10. Meetings</h3>
                  <p>Meetings of directors may be held in person or electronically.</p>
                  <p>A quorum is a majority of directors.</p>
                  <p>Decisions are made by majority vote.</p>

                  <h3>11. Records</h3>
                  <p>The company must keep proper financial and other records in accordance with Australian law.</p>

                  <h3>12. Amendments</h3>
                  <p>
                    This Constitution may be amended by special resolution of the member, provided amendments remain
                    consistent with charitable status.
                  </p>

                  <h3>13. Winding Up</h3>
                  <p>
                    If the company is wound up, any surplus assets must be transferred to another charitable
                    organisation with similar purposes and not distributed to members.
                  </p>

                  <h3>14. Governing Law</h3>
                  <p>This Constitution is governed by the laws of Australia.</p>

                  <p>
                    <strong>END OF CONSTITUTION</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ConstitutionPage;
