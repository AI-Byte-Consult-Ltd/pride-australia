import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, ArrowRight, Heart, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import CommunityMap from '@/components/map/CommunityMap';
import AddBusinessForm from '@/components/map/AddBusinessForm';

const CommunityMapSection = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <span className="inline-block px-4 py-1.5 rounded-full bg-pride-purple/10 text-pride-purple text-sm font-medium mb-4">
            Community Directory
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Community Map
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover LGBTQ+-friendly businesses, artists, and community projects across Australia. 
            Find safe spaces and support local.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card variant="elevated" className="animate-fade-in">
            <CardHeader className="pb-2">
              <div className="h-12 w-12 rounded-xl bg-pride-purple/10 text-pride-purple flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">Find Local Businesses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Discover cafés, artists, health services, and more that welcome our community.
              </p>
            </CardContent>
          </Card>

          <Card variant="elevated" className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="pb-2">
              <div className="h-12 w-12 rounded-xl bg-pride-pink/10 text-pride-pink flex items-center justify-center mb-4">
                <Users className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">Connect with Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Support LGBTQ+-owned businesses and community projects near you.
              </p>
            </CardContent>
          </Card>

          <Card variant="elevated" className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="pb-2">
              <div className="h-12 w-12 rounded-xl bg-pride-green/10 text-pride-green flex items-center justify-center mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">Verified & Safe</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                All listings are reviewed to ensure a safe, welcoming directory.
              </p>
            </CardContent>
          </Card>

          <Card variant="elevated" className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader className="pb-2">
              <div className="h-12 w-12 rounded-xl bg-pride-orange/10 text-pride-orange flex items-center justify-center mb-4">
                <Heart className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">Add Your Business</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Register your LGBTQ+-friendly business or project to appear on the map.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Map Preview */}
        <div className="rounded-xl overflow-hidden border border-border shadow-lg mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <CommunityMap compact onAddBusiness={() => setShowAddForm(true)} />
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button variant="pride" size="lg" asChild>
              <Link to="/community-map" className="gap-2">
                <MapPin className="h-5 w-5" />
                Explore Full Map
              </Link>
            </Button>
            <Button variant="outline" size="lg" onClick={() => setShowAddForm(true)} className="gap-2">
              Add Your Business
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Add Business Form */}
      <AddBusinessForm
        open={showAddForm}
        onOpenChange={setShowAddForm}
      />
    </section>
  );
};

export default CommunityMapSection;