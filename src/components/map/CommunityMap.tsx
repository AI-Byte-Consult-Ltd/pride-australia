import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from '@react-google-maps/api';

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

const mapContainerStyle = {
  width: '100%',
  height: '520px',
};

const defaultCenter = {
  lat: 48.3794,
  lng: 31.1656,
};

export default function CommunityMapPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selected, setSelected] = useState<Business | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [loading, setLoading] = useState(true);

  // future: modal for adding business
  const [isAddOpen, setIsAddOpen] = useState(false);

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
      {/* Header controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={viewMode === 'map' ? 'pride' : 'outline'}
            onClick={() => setViewMode('map')}
          >
            Map view
          </Button>
          <Button
            size="sm"
            variant={viewMode === 'list' ? 'pride' : 'outline'}
            onClick={() => setViewMode('list')}
          >
            List view
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Already listed: <strong>{businesses.length}</strong>
          </span>

          <Button
            size="sm"
            variant="pride"
            className="gap-2"
            onClick={() => setIsAddOpen(true)}
          >
            <Plus className="h-4 w-4" />
            List your business
          </Button>
        </div>
      </div>

      {/* MAP VIEW */}
      {viewMode === 'map' ? (
        <div className="relative rounded-lg overflow-hidden border">
          {!isLoaded ? (
            <div className="p-6 text-center">Loading map…</div>
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
                    position={{
                      lat: biz.latitude!,
                      lng: biz.longitude!,
                    }}
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
                  <div className="max-w-xs space-y-1">
                    <h3 className="font-semibold text-sm">
                      {selected.name}
                    </h3>
                    {selected.description && (
                      <p className="text-xs line-clamp-3">
                        {selected.description}
                      </p>
                    )}
                    <Link
                      to={`/business/${selected.id}`}
                      className="text-xs text-primary hover:underline block"
                    >
                      View business profile
                    </Link>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          )}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {businesses.map((biz) => (
            <Card key={biz.id}>
              <CardHeader>
                <CardTitle>{biz.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm line-clamp-3">
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

      {/* NOTE:
         isAddOpen -> сюда подключается модалка добавления бизнеса
         (логика у тебя уже есть и работает)
      */}
    </div>
  );
}
