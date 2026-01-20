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

const australianStates = [
  'Australian Capital Territory',
  'New South Wales',
  'Northern Territory',
  'Queensland',
  'South Australia',
  'Tasmania',
  'Victoria',
  'Western Australia',
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

// City coordinates for approximate placement
const cityCoordinates: Record<string, { lat: number; lng: number }> = {
  'Sydney': { lat: -33.8688, lng: 151.2093 },
  'Melbourne': { lat: -37.8136, lng: 144.9631 },
  'Brisbane': { lat: -27.4698, lng: 153.0251 },
  'Perth': { lat: -31.9505, lng: 115.8605 },
  'Adelaide': { lat: -34.9285, lng: 138.6007 },
  'Gold Coast': { lat: -28.0167, lng: 153.4000 },
  'Canberra': { lat: -35.2809, lng: 149.1300 },
  'Newcastle': { lat: -32.9283, lng: 151.7817 },
  'Hobart': { lat: -42.8821, lng: 147.3272 },
  'Darwin': { lat: -12.4634, lng: 130.8456 },
  'Cairns': { lat: -16.9186, lng: 145.7781 },
  'Townsville': { lat: -19.2590, lng: 146.8169 },
  'Geelong': { lat: -38.1499, lng: 144.3617 },
  'Wollongong': { lat: -34.4278, lng: 150.8931 },
};

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  category: z.string().min(1, 'Please select a category'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  city: z.string().min(2, 'City must be at least 2 characters').max(100, 'City must be less than 100 characters'),
  state: z.string().min(1, 'Please select a state'),
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
    watch,
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
    // Try exact match first
    if (cityCoordinates[city]) {
      return cityCoordinates[city];
    }
    
    // Try case-insensitive match
    const normalizedCity = city.toLowerCase().trim();
    for (const [key, coords] of Object.entries(cityCoordinates)) {
      if (key.toLowerCase() === normalizedCity) {
        return coords;
      }
    }
    
    // Return Sydney as default for unknown cities
    return { lat: -33.8688, lng: 151.2093 };
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const coords = getApproximateCoordinates(data.city);
      
      // Add small random offset for privacy and to prevent overlapping pins
      const latOffset = (Math.random() - 0.5) * 0.02;
      const lngOffset = (Math.random() - 0.5) * 0.02;

      const { error } = await supabase.from('businesses').insert({
        name: data.name.trim(),
        category: data.category,
        description: data.description?.trim() || null,
        city: data.city.trim(),
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
              Your business has been submitted for review. We'll notify you once it's approved and visible on the map.
            </p>
            <Button onClick={handleClose}>Close</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Add Your Business to the Map
              </DialogTitle>
              <DialogDescription>
                Register your LGBTQ+-friendly business or project. After submission, it will be reviewed before appearing on the map.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
              {/* Business Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Business / Project Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Rainbow Café"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
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
                {errors.category && (
                  <p className="text-sm text-destructive">{errors.category.message}</p>
                )}
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
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description.message}</p>
                )}
              </div>

              {/* Location */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="e.g., Sydney"
                    {...register('city')}
                  />
                  {errors.city && (
                    <p className="text-sm text-destructive">{errors.city.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Select onValueChange={(value) => setValue('state', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {australianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.state && (
                    <p className="text-sm text-destructive">{errors.state.message}</p>
                  )}
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
                {errors.address && (
                  <p className="text-sm text-destructive">{errors.address.message}</p>
                )}
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
                <Input
                  id="website"
                  placeholder="https://yourbusiness.com"
                  {...register('website')}
                />
                {errors.website && (
                  <p className="text-sm text-destructive">{errors.website.message}</p>
                )}
              </div>

              {/* Instagram */}
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram Handle (optional)</Label>
                <Input
                  id="instagram"
                  placeholder="@yourbusiness"
                  {...register('instagram')}
                />
                {errors.instagram && (
                  <p className="text-sm text-destructive">{errors.instagram.message}</p>
                )}
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