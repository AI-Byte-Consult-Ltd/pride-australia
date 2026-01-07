import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingBag, 
  Plus, 
  Tag, 
  TrendingUp, 
  CreditCard, 
  Percent,
  Package,
  DollarSign,
  ImagePlus,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const MarketplacePage = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showListingForm, setShowListingForm] = useState(false);
  const [listingForm, setListingForm] = useState({
    title: '',
    description: '',
    price: '',
    category: 'digital',
  });

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to list products on the marketplace.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    toast({
      title: "Coming Soon",
      description: "Product listing will be available soon! Your listing details have been saved.",
    });
    setShowListingForm(false);
    setListingForm({ title: '', description: '', price: '', category: 'digital' });
  };

  // Calculate fees display
  const calculateFees = (price: number) => {
    const platformFee = price * 0.025;
    const youReceive = price - platformFee;
    return { platformFee, youReceive };
  };

  const priceValue = parseFloat(listingForm.price) || 0;
  const fees = calculateFees(priceValue);

  return (
    <>
      <Helmet>
        <title>Marketplace | Pride Social Network</title>
        <meta name="description" content="Buy and sell within the Pride community. Support Pride creators and small businesses on our community marketplace." />
      </Helmet>

      <Layout>
        {/* Hero */}
        <section className="py-16 lg:py-24 gradient-hero">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-pride-orange/10 text-pride-orange mb-6">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
                Community Marketplace
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Buy and sell within our community. Support Pride creators 
                and small businesses with every purchase.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="pride" size="lg" onClick={() => {
                  if (!user) {
                    navigate('/login');
                  } else {
                    setShowListingForm(true);
                  }
                }}>
                  <Plus className="h-5 w-5 mr-2" />
                  List a Product
                </Button>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CreditCard className="h-4 w-4" />
                  <span>Stripe & Revolut accepted</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* List Product Form Modal */}
        {showListingForm && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg animate-fade-in">
              <CardHeader className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-4 top-4"
                  onClick={() => setShowListingForm(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  List a New Product
                </CardTitle>
              </CardHeader>
              <form onSubmit={handleCreateListing}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Product Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Pride Rainbow Art Print"
                      value={listingForm.title}
                      onChange={(e) => setListingForm({ ...listingForm, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your product..."
                      value={listingForm.description}
                      onChange={(e) => setListingForm({ ...listingForm, description: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      value={listingForm.category}
                      onChange={(e) => setListingForm({ ...listingForm, category: e.target.value })}
                    >
                      <option value="digital">Digital Product</option>
                      <option value="physical">Physical Product</option>
                      <option value="art">Art & Design</option>
                      <option value="clothing">Clothing & Accessories</option>
                      <option value="services">Services</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price (USD)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="price"
                        type="number"
                        min="1"
                        step="0.01"
                        placeholder="0.00"
                        className="pl-10"
                        value={listingForm.price}
                        onChange={(e) => setListingForm({ ...listingForm, price: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {priceValue > 0 && (
                    <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Platform fee (2.5%)</span>
                        <span className="text-muted-foreground">-${fees.platformFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>You receive</span>
                        <span className="text-pride-green">${fees.youReceive.toFixed(2)}</span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Product Images</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <ImagePlus className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Image upload coming soon
                      </p>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex gap-3">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setShowListingForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="pride" className="flex-1">
                    Create Listing
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        )}

        {/* Info Cards */}
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card variant="elevated" className="animate-fade-in">
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-pride-green/10 text-pride-green flex items-center justify-center mb-4">
                    <Tag className="h-6 w-6" />
                  </div>
                  <CardTitle>List Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Easily list your digital or physical products. Set your own prices 
                    and reach our engaged community.
                  </p>
                </CardContent>
              </Card>

              <Card variant="elevated" className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-pride-blue/10 text-pride-blue flex items-center justify-center mb-4">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <CardTitle>Secure Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Accept payments via <strong>Stripe</strong> or <strong>Revolut</strong>. 
                    Safe, secure transactions with buyer and seller protection.
                  </p>
                </CardContent>
              </Card>

              <Card variant="elevated" className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-pride-purple/10 text-pride-purple flex items-center justify-center mb-4">
                    <Percent className="h-6 w-6" />
                  </div>
                  <CardTitle>Low 2.5% Fee</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We only charge <strong>2.5% commission</strong> on sales. 
                    Keep more of your earnings while supporting the community.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Marketplace Tabs */}
            <div className="mt-16">
              <Tabs defaultValue="browse" className="max-w-5xl mx-auto">
                <TabsList className="w-full justify-start bg-card border-b rounded-none h-auto p-0 mb-8">
                  <TabsTrigger 
                    value="browse" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-6"
                  >
                    Browse Products
                  </TabsTrigger>
                  {user && (
                    <TabsTrigger 
                      value="my-listings"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-6"
                    >
                      My Listings
                    </TabsTrigger>
                  )}
                </TabsList>

                <TabsContent value="browse">
                  <div className="text-center py-12">
                    <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-display text-xl font-semibold mb-2">
                      Marketplace Coming Soon
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Be among the first sellers! List your products now and they'll be 
                      live when we launch.
                    </p>
                    <Button variant="pride" onClick={() => {
                      if (!user) {
                        navigate('/login');
                      } else {
                        setShowListingForm(true);
                      }
                    }}>
                      <Plus className="h-4 w-4 mr-2" />
                      List Your First Product
                    </Button>
                  </div>
                </TabsContent>

                {user && (
                  <TabsContent value="my-listings">
                    <div className="text-center py-12">
                      <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-display text-xl font-semibold mb-2">
                        No Listings Yet
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        You haven't listed any products yet. Start selling today!
                      </p>
                      <Button variant="pride" onClick={() => setShowListingForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Listing
                      </Button>
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default MarketplacePage;
