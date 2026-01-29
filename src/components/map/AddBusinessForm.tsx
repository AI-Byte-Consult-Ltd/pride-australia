import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, MapPin, CheckCircle2 } from 'lucide-react';

// ✅ EU countries (as "Region" field)
// We keep the DB column name "state" to avoid migrations right now.
const euCountries = [
  'Austria',
  'Belgium',
  'Bulgaria',
  'Croatia',
  'Cyprus',
  'Czechia',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Hungary',
  'Ireland',
  'Italy',
  'Latvia',
  'Lithuania',
  'Luxembourg',
  'Malta',
  'Netherlands',
  'Poland',
  'Portugal',
  'Romania',
  'Slovakia',
  'Slovenia',
  'Spain',
  'Sweden',
];

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

// ✅ EU city coordinates for approximate placement (add more anytime)
const cityCoordinates: Record<string, { lat: number; lng: number }> = {
  // Italy
  Rome: { lat: 41.9028, lng: 12.4964 },
  Milan: { lat: 45.4642, lng: 9.19 },
  Florence: { lat: 43.7696, lng: 11.2558 },
  Venice: { lat: 45.4408, lng: 12.3155 },
  Naples: { lat: 40.8518, lng: 14.2681 },

  // France
  Paris: { lat: 48.8566, lng: 2.3522 },
  Lyon: { lat: 45.764, lng: 4.8357 },
  Marseille: { lat: 43.2965, lng: 5.3698 },

  // Germany
  Berlin: { lat: 52.52, lng: 13.405 },
  Munich: { lat: 48.1351, lng: 11.582 },
  Hamburg: { lat: 53.5511, lng: 9.9937 },
  Cologne: { lat: 50.9375, lng: 6.9603 },

  // Spain
  Madrid: { lat: 40.4168, lng: -3.7038 },
  Barcelona: { lat: 41.3851, lng: 2.1734 },
  Valencia: { lat: 39.4699, lng: -0.3763 },
  Sitges: { lat: 41.237, lng: 1.805 },

  // Netherlands / Belgium
  Amsterdam: { lat: 52.3676, lng: 4.9041 },
  Rotterdam: { lat: 51.9244, lng: 4.4777 },
  Brussels: { lat: 50.8503, lng: 4.3517 },
  Antwerp: { lat: 51.2194, lng: 4.4025 },

  // Nordics
  Stockholm: { lat: 59.3293, lng: 18.0686 },
  Copenhagen: { lat: 55.6761, lng: 12.5683 },
  Helsinki: { lat: 60.1699, lng: 24.9384 },

  // Central/Eastern
  Vienna: { lat: 48.2082, lng: 16.3738 },
  Prague: { lat: 50.0755, lng: 14.4378 },
  Warsaw: { lat: 52.2297, lng: 21.0122 },
  Budapest: { lat: 47.4979, lng: 19.0402 },
  Bucharest: { lat: 44.4268, lng: 26.1025 },
  Sofia: { lat: 42.6977, lng: 23.3219 },
  Athens: { lat: 37.9838, lng: 23.7275 },
  Lisbon: { lat: 38.7223, lng: -9.1393 },
  Dublin: { lat: 53.3498, lng: -6.2603 },
};

const formSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  category: z.string().min(1, 'Please select a category'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  city: z
    .string()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City must be less than 100 characters'),

  // ✅ Keep field name "state" to match existing DB column, but treat it as EU Country/Region in UI.
  state: z.string().min(1, 'Please select a country/region'),

  address: z.string().max(200, 'Address must be less than 200 characters').optional(),
  contact_email: z.string().email('Please enter a valid email').or(z.literal('')).optional(),
  website: z.string().max(200, 'Website must be less than 200 characters').optional(),
  instagram: z.string().max(50, 'Instagram handle must be less than 50 characters').optional(),
});

type FormData = z.infer<typeof formSchema>;

interface AddBusinessFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const AddBusinessForm = ({ open, onOpenChange, onSuccess }: AddBusinessFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      category: '',
      description: '',
      city: '',
      state: '',
      address: '',
      contact_email: '',
      website: '',
      instagram: '',
    },
  });

  const getApproximateCoordinates = (city: string): { lat: number; lng: number } | null => {
    // Exact match first
    if (cityCoordinates[city]) return cityCoordinates[city];

    // Case-insensitive match
    const normalizedCity = city.toLowerCase().trim();
    for (const [key, coords] of Object.entries(cityCoordinates)) {
      if (key.toLowerCase() === normalizedCity) return coords;
    }

    // ✅ Default to EU centre (approx) to avoid AU bias if city is unknown
    return { lat: 50.1109, lng: 8.6821 }; // Frankfurt (EU-ish centre)
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const coords = getApproximateCoordinates(data.city);

      // Small random offset for privacy and to prevent overlapping pins
      const latOffset = (Math.random() - 0.5) * 0.02;
      const lngOffset = (Math.random() - 0.5) * 0.02;

      const { error } = await supabase.from('businesses').insert({
        name: data.name.trim(),
        category: data.category,
        description: data.description?.trim() || null,
        city: data.city.trim(),

        // DB column is "state" — we store EU country/region here for now (no DB migration).
        state: data.state,

        address: data.address?.trim() || null,
        latitude: coords ? coords.lat + latOffset : null,
        longitude: coords ? coords.lng + lngOffset : null,
        contact_email: data.contact_email?.trim() || null,
        website: data.website?.trim() || null,
        instagram: data.instagram?.trim().replace('@', '') || null,
        user_id: user?.id || null,
        is_approved: false, // Requires admin approval
      });

      if (error) throw error;

      setShowSuccess(true);
      reset();
      onSuccess?.();

      // Auto-close after showing success
      setTimeout(() => {
        setShowSuccess(false);
        onOpenChange(false);
      }, 3000);
    } catch (error: any) {
      console.error('Error submitting business:', error);
      toast({
        title: 'Submission Failed',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    setShowSuccess(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        {showSuccess ? (
          <div className="py-12 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Thank You!</h3>
            <p className="text-muted-foreground mb-4">
              Your listing has been submitted for review. We&apos;ll notify you once it&apos;s approved and visible on the map.
              <br />
              <span className="font-medium text-foreground">Made in EU 🇪🇺, for the World 🗺️</span>
            </p>
            <Button onClick={handleClose}>Close</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                List Your Business on the Map
              </DialogTitle>
              <DialogDescription>
                Submit your LGBTQ+-friendly business or project for the Pride Social Network community map.
                After submission, it will be reviewed before appearing publicly.
                <br />
                <span className="font-medium text-foreground">Made in EU 🇪🇺, for the World 🗺️</span>
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
              {/* Business Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Business / Project Name *</Label>
                <Input id="name" placeholder="e.g., Rainbow Café" {...register('name')} />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select onValueChange={(value) => setValue('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell us what you do..."
                  rows={3}
                  {...register('description')}
                />
                {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
              </div>

              {/* Location */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" placeholder="e.g., Berlin" {...register('city')} />
                  {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">Country / Region (EU) *</Label>
                  <Select onValueChange={(value) => setValue('state', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {euCountries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.state && <p className="text-sm text-destructive">{errors.state.message}</p>}
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">Address (optional)</Label>
                <Input
                  id="address"
                  placeholder="Street address for more accurate pin placement"
                  {...register('address')}
                />
                {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <Label htmlFor="contact_email">Contact Email (optional)</Label>
                <Input
                  id="contact_email"
                  type="email"
                  placeholder="hello@yourbusiness.com"
                  {...register('contact_email')}
                />
                {errors.contact_email && (
                  <p className="text-sm text-destructive">{errors.contact_email.message}</p>
                )}
              </div>

              {/* Website */}
              <div className="space-y-2">
                <Label htmlFor="website">Website (optional)</Label>
                <Input id="website" placeholder="https://yourbusiness.com" {...register('website')} />
                {errors.website && <p className="text-sm text-destructive">{errors.website.message}</p>}
              </div>

              {/* Instagram */}
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram Handle (optional)</Label>
                <Input id="instagram" placeholder="@yourbusiness" {...register('instagram')} />
                {errors.instagram && <p className="text-sm text-destructive">{errors.instagram.message}</p>}
              </div>

              {/* Submit */}
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="pride" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    'Submit for Review'
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddBusinessForm;
