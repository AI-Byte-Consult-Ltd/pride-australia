import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Mail, Instagram, MapPin, List } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Business {
  id: string;
  name: string;
  category: string;
  description: string | null;
  city: string;

  // NOTE: DB column is still called "state" — we now store EU Country/Region here (no migration).
  state: string;

  latitude: number | null;
  longitude: number | null;
  contact_email: string | null;
  website: string | null;
  instagram: string | null;
}

interface CommunityMapProps {
  onAddBusiness?: () => void;
  className?: string;
  compact?: boolean;
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    'Café & Restaurant': 'bg-pride-orange',
    'Artist & Creative': 'bg-pride-pink',
    'Health & Wellness': 'bg-pride-green',
    'NGO & Community': 'bg-pride-blue',
    'Tech & Freelancer': 'bg-pride-purple',
    'Retail & Shopping': 'bg-pride-yellow',
    'Entertainment': 'bg-pride-red',
    'Professional Services': 'bg-muted',
    'Other': 'bg-muted',
  };
  return colors[category] || 'bg-muted';
};

const CommunityMap = ({ onAddBusiness, className = '', compact = false }: CommunityMapProps) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  const categories = [
    'Café & Restaurant',
    'Artist & Creative',
    'Health & Wellness',
    'NGO & Community',
    'Tech & Freelancer',
    'Retail & Shopping',
    'Entertainment',
    'Professional Services',
    'Other',
  ];

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('is_approved', true);

      if (error) throw error;
      setBusinesses((data as Business[]) || []);
    } catch (error) {
      console.error('Error fetching businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBusinesses = selectedCategory
    ? businesses.filter((b) => b.category === selectedCategory)
    : businesses;

  // ✅ EU-wide map embed (Europe viewport)
  // Center: Central Europe | Zoom tuned for EU coverage.
  const mapEmbedUrl =
    'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d9400000!2d10.0!3d50.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seu!4v1234567890';

  return (
    <div className={`relative ${className}`}>
      {/* Header with filters */}
      {!compact && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap gap-2 flex-1">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All ({businesses.length})
            </Button>

            {categories.map((cat) => {
              const count = businesses.filter((b) => b.category === cat).length;
              if (count === 0) return null;

              return (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat} ({count})
                </Button>
              );
            })}
          </div>

          <div className="flex gap-1">
            <Button
              variant={viewMode === 'map' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('map')}
              aria-label="Map view"
            >
              <MapPin className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Map View */}
      {viewMode === 'map' && (
        <div
          className={`relative rounded-lg overflow-hidden border border-border ${
            compact ? 'h-[300px]' : 'h-[500px] lg:h-[600px]'
          }`}
        >
          <iframe
            src={mapEmbedUrl}
            className="w-full h-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Community Map (European Union)"
          />

          {/* Overlay with business count */}
          <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
            <p className="text-sm font-medium">
              <span className="text-primary">{filteredBusinesses.length}</span> listings on the map
            </p>
            {!compact && (
              <p className="text-xs text-muted-foreground mt-1">
                Made in EU 🇪🇺, for the World 🗺️
              </p>
            )}
          </div>

          {/* Add Business Button */}
          {onAddBusiness && (
            <Button
              variant="pride"
              size={compact ? 'sm' : 'default'}
              onClick={onAddBusiness}
              className={`absolute ${compact ? 'top-2 right-2' : 'bottom-6 right-6'} shadow-lg`}
            >
              <MapPin className="h-4 w-4 mr-2" />
              List Your Business
            </Button>
          )}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
          {loading ? (
            <div className="col-span-full flex items-center justify-center py-12">
              <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredBusinesses.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">
                No listings on the map yet. Be the first to add yours!
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Made in EU 🇪🇺, for the World 🗺️
              </p>
              {onAddBusiness && (
                <Button variant="pride" onClick={onAddBusiness}>
                  List Your Business
                </Button>
              )}
            </div>
          ) : (
            filteredBusinesses.map((business) => (
              <Card key={business.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-lg">{business.name}</h3>
                    <Badge className={`${getCategoryColor(business.category)} text-white shrink-0`}>
                      {business.category}
                    </Badge>
                  </div>

                  {business.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {business.description}
                    </p>
                  )}

                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4" />
                    {business.city}, {business.state}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {business.website && (
                      <a
                        href={
                          business.website.startsWith('http')
                            ? business.website
                            : `https://${business.website}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="sm" className="gap-1">
                          <ExternalLink className="h-3 w-3" />
                          Website
                        </Button>
                      </a>
                    )}

                    {business.contact_email && (
                      <a href={`mailto:${business.contact_email}`}>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Mail className="h-3 w-3" />
                          Email
                        </Button>
                      </a>
                    )}

                    {business.instagram && (
                      <a
                        href={`https://instagram.com/${business.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="sm" className="gap-1">
                          <Instagram className="h-3 w-3" />
                          Instagram
                        </Button>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Map view empty state (non-compact) */}
      {viewMode === 'map' && !loading && filteredBusinesses.length === 0 && !compact && (
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            No listings on the map yet. Be the first to add yours!
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Made in EU 🇪🇺 for the World 🗺️
          </p>
        </div>
      )}
    </div>
  );
};

export default CommunityMap;
