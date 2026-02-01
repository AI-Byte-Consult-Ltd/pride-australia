import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Link as LinkIcon, Instagram } from 'lucide-react';
import { Loader2 } from 'lucide-react';

interface Business {
  id: string;
  name: string;
  category: string;
  description: string | null;
  city: string;
  state: string;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  contact_email: string | null;
  website: string | null;
  instagram: string | null;
}

const BusinessProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusiness = async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (!error && data) {
        setBusiness(data as Business);
      }
      setLoading(false);
    };
    fetchBusiness();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!business) {
    return (
      <Layout hideFooter>
        <div className="container py-6">
          <p className="text-muted-foreground">Business not found.</p>
          <Link to="/community-map" className="text-primary hover:underline mt-4 block">
            ← Back to Community Map
          </Link>
        </div>
      </Layout>
    );
  }

  const {
    name,
    category,
    description,
    city,
    state,
    address,
    latitude,
    longitude,
    contact_email,
    website,
    instagram,
  } = business;

  const categoryColors: Record<string, string> = {
    Cafe: 'bg-rose-100 text-rose-700',
    Bar: 'bg-sky-100 text-sky-700',
    Hotel: 'bg-amber-100 text-amber-700',
    NGO: 'bg-emerald-100 text-emerald-700',
    Other: 'bg-violet-100 text-violet-700',
  };

  return (
    <Layout hideFooter>
      <div className="min-h-[calc(100vh-4rem)] bg-muted/30">
        <div className="container py-6 max-w-2xl mx-auto">
          <Link to="/community-map" className="text-primary hover:underline mb-4 block">
            ← Back to Community Map
          </Link>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                {name}
                <span className={`text-xs px-2 py-1 rounded ${categoryColors[category] ?? 'bg-muted text-foreground'}`}>
                  {category}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {description && (
                <p className="text-sm whitespace-pre-wrap">{description}</p>
              )}
              <div className="text-sm text-muted-foreground">
                {city}, {state}
              </div>
              {address && (
                <div className="text-sm text-muted-foreground">{address}</div>
              )}

              {/* Контакты */}
              <div className="space-y-2">
                {contact_email && (
                  <a
                    href={`mailto:${contact_email}`}
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </a>
                )}
                {website && (
                  <a
                    href={website.startsWith('http') ? website : `https://${website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <LinkIcon className="h-4 w-4" />
                    Website
                  </a>
                )}
                {instagram && (
                  <a
                    href={`https://instagram.com/${instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Instagram className="h-4 w-4" />
                    Instagram
                  </a>
                )}
              </div>

              {/* Карта */}
              {latitude && longitude ? (
                <iframe
                  src={`https://www.google.com/maps?q=${latitude},${longitude}&z=14&output=embed`}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="business-map"
                ></iframe>
              ) : (
                <p className="text-sm text-muted-foreground">Location unknown</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default BusinessProfilePage;
