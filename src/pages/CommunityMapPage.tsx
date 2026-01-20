import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import CommunityMap from '@/components/map/CommunityMap';
import AddBusinessForm from '@/components/map/AddBusinessForm';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Users, Heart, Shield } from 'lucide-react';

const CommunityMapPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <>
      <Helmet>
        <title>Community Map | LGBTQ+ Friendly Businesses in Australia</title>
        <meta
          name="description"
          content="Discover LGBTQ+-friendly businesses and projects across Australia. Find cafés, artists, health services, and more on the Pride Social Community Map."
        />
      </Helmet>

      <Layout>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-12 lg:py-16">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <span className="inline-block px-4 py-1.5 rounded-full bg-pride-purple/10 text-pride-purple text-sm font-medium mb-4">
                Community Directory
              </span>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Community Map
              </h1>
              <p className="text-lg text-muted-foreground">
                Discover LGBTQ+-friendly businesses, artists, and community projects across Australia. 
                Support local and find safe, welcoming spaces.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
              <Card className="text-center">
                <CardContent className="pt-4 pb-3">
                  <MapPin className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">Growing</p>
                  <p className="text-xs text-muted-foreground">Businesses</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-4 pb-3">
                  <Users className="h-6 w-6 text-pride-pink mx-auto mb-2" />
                  <p className="text-2xl font-bold">9+</p>
                  <p className="text-xs text-muted-foreground">Categories</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-4 pb-3">
                  <Heart className="h-6 w-6 text-pride-red mx-auto mb-2" />
                  <p className="text-2xl font-bold">100%</p>
                  <p className="text-xs text-muted-foreground">LGBTQ+ Friendly</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-4 pb-3">
                  <Shield className="h-6 w-6 text-pride-green mx-auto mb-2" />
                  <p className="text-2xl font-bold">Verified</p>
                  <p className="text-xs text-muted-foreground">& Reviewed</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-8">
          <div className="container">
            <div className="rounded-xl overflow-hidden border border-border shadow-lg">
              <CommunityMap onAddBusiness={() => setShowAddForm(true)} />
            </div>
            
            {/* Info */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                This map shows LGBTQ+-friendly businesses and community projects across Australia. 
                All listings are reviewed before appearing on the map to ensure a safe directory.
                Want to add your business? Click the "Add Your Business" button on the map.
              </p>
            </div>
          </div>
        </section>
      </Layout>

      {/* Add Business Form */}
      <AddBusinessForm
        open={showAddForm}
        onOpenChange={setShowAddForm}
      />
    </>
  );
};

export default CommunityMapPage;