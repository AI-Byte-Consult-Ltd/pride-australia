import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
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

const mapContainerStyle = { width: '100%', height: '500px' };
const defaultCenter = { lat: 48.3794, lng: 31.1656 }; // центр Европы

export default function CommunityMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selected, setSelected] = useState<Business | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusinesses = async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('is_approved', true);

      if (!error && data) setBusinesses(data as Business[]);
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
      {/* Переключатель вида */}
      <div className="flex items-center gap-2">
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
      </div>

      {viewMode === 'map' ? (
        // Карта с маркерами
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
        // Список бизнесов
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {businesses.map((biz) => (
            <Card key={biz.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {biz.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
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
