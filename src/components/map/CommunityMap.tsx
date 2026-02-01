
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';

interface Business {
  id: string;
  name: string;
  category: string;
  description: string | null;
  city: string;
  state: string;
  latitude: number | null;
  longitude: number | null;
  website: string | null;
  contact_email: string | null;
  instagram: string | null;
}

interface CommunityMapProps {
  onAddBusiness?: () => void;
}

const mapContainerStyle = { width: '100%', height: '500px' };
const defaultCenter = { lat: 48.3794, lng: 31.1656 };

export default function CommunityMap({ onAddBusiness }: CommunityMapProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selected, setSelected] = useState<Business | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusinesses = async () => {
      const { data } = await supabase
        .from('businesses')
        .select('*')
        .eq('is_approved', true);

      if (data) setBusinesses(data as Business[]);
      setLoading(false);
    };

    fetchBusinesses();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="h-6 w-6 animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* TOP BAR */}
      <Card>
        <CardContent className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between py-4">
          <div className="text-sm text-muted-foreground">
            Already listed: <strong>{businesses.length}</strong>
          </div>

          <div className="flex gap-2">
            <Button
              variant={viewMode === 'map' ? 'pride' : 'outline'}
              size="sm"
              onClick={() => setViewMode('map')}
            >
              Map View
            </Button>
            <Button
              variant={viewMode === 'list' ? 'pride' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              List View
            </Button>

            {onAddBusiness && (
              <Button
                variant="pride"
                size="sm"
                className="gap-2"
                onClick={onAddBusiness}
              >
                <Plus className="h-4 w-4" />
                Add your business
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* MAP / LIST */}
      {viewMode === 'map' ? (
        <div className="relative">
          {!isLoaded ? (
            <p>Loading map…</p>
          ) : (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={defaultCenter}
              zoom={4}
            >
              {businesses
                .filter((b) => b.latitude && b.longitude)
                .map((biz) => (
                  <Marker
                    key={biz.id}
                    position={{ lat: biz.latitude!, lng: biz.longitude! }}
                    onClick={() => setSelected(biz)}
                  />
                ))}

              {selected && (
                <InfoWindow
                  position={{
                    lat: selected.latitude!,
                    lng: selected.longitude!,
                  }}
                  onCloseClick={() => setSelected(null)}
                >
                  <div className="max-w-xs">
                    <h3 className="font-semibold">{selected.name}</h3>
                    {selected.description && (
                      <p className="text-xs line-clamp-2">
                        {selected.description}
                      </p>
                    )}
                    <Link
                      to={`/business/${selected.id}`}
                      className="text-sm text-primary hover:underline block mt-1"
                    >
                      View profile
                    </Link>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          )}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {businesses.map((biz) => (
            <Card key={biz.id}>
              <CardContent className="space-y-2 py-4">
                <h3 className="font-semibold">{biz.name}</h3>
                <p className="text-sm line-clamp-2">
                  {biz.description || 'No description'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {biz.city}, {biz.state}
                </p>
                <Link
                  to={`/business/${biz.id}`}
                  className="text-sm text-primary hover:underline"
                >
                  View profile
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
