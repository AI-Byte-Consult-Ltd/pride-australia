import { Link } from 'react-router-dom';
import { ShoppingBag, Tag, CreditCard, Percent, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const MarketplaceSection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <span className="inline-block px-4 py-1.5 rounded-full bg-pride-orange/10 text-pride-orange text-sm font-medium mb-4">
            Community Commerce
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Pride Marketplace
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Buy and sell within our community. Support Pride creators and small businesses 
            while keeping the community thriving.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card variant="elevated" className="animate-fade-in">
            <CardHeader className="pb-2">
              <div className="h-12 w-12 rounded-xl bg-pride-green/10 text-pride-green flex items-center justify-center mb-4">
                <Tag className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">List Your Products</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Easily list digital or physical products. Set your prices and reach our engaged community.
              </p>
            </CardContent>
          </Card>

          <Card variant="elevated" className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="pb-2">
              <div className="h-12 w-12 rounded-xl bg-pride-blue/10 text-pride-blue flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">Secure Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Accept payments via <strong>Stripe</strong> or <strong>Revolut</strong>. Safe, secure transactions guaranteed.
              </p>
            </CardContent>
          </Card>

          <Card variant="elevated" className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="pb-2">
              <div className="h-12 w-12 rounded-xl bg-pride-purple/10 text-pride-purple flex items-center justify-center mb-4">
                <Percent className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">Low Commission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Only <strong>2.5% platform fee</strong> on sales. Keep more of your earnings while supporting the community.
              </p>
            </CardContent>
          </Card>

          <Card variant="elevated" className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader className="pb-2">
              <div className="h-12 w-12 rounded-xl bg-pride-pink/10 text-pride-pink flex items-center justify-center mb-4">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">Support Creators</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Every purchase supports Pride creators and helps fund our non-profit mission.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button variant="pride" size="lg" asChild>
              <Link to="/marketplace" className="gap-2">
                <ShoppingBag className="h-5 w-5" />
                Browse Marketplace
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/signup" className="gap-2">
                Start Selling
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Payment processing by Stripe & Revolut • Only 2.5% commission
          </p>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceSection;
