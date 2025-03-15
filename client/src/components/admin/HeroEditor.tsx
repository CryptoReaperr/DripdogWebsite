import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

interface HeroEditorProps {
  token: string | null;
}

// Schema for the hero section content
const heroSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  subtitle: z.string().min(1, { message: 'Subtitle is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  ctaButtonText: z.string().min(1, { message: 'CTA button text is required' }),
  ctaButtonLink: z.string().url({ message: 'Must be a valid URL' }).optional().or(z.literal('')),
  secondaryButtonText: z.string().optional(),
  secondaryButtonLink: z.string().url({ message: 'Must be a valid URL' }).optional().or(z.literal('')),
  tokenAddress: z.string(),
});

type HeroContent = z.infer<typeof heroSchema>;

const HeroEditor: React.FC<HeroEditorProps> = ({ token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Default values
  const defaultValues: HeroContent = {
    title: 'DripDog',
    subtitle: 'The Solana Meme Coin With Street Cred',
    description: 'Forget basic meme coins. DripDog brings style, swagger, and a touch of street culture to Solana. Join the pack and get your $DRIP.',
    ctaButtonText: 'Buy $DRIP',
    ctaButtonLink: 'https://jup.ag/swap/SOL-DRIP',
    secondaryButtonText: 'Join Telegram',
    secondaryButtonLink: 'https://t.me/dripdogcoin',
    tokenAddress: 'rXKYBdFqtFuTbieQh2DBxuy6tCi8yDRY3h1kfwSpump',
  };

  // Initialize form with default or loaded values
  const form = useForm<HeroContent>({
    resolver: zodResolver(heroSchema),
    defaultValues,
  });

  // Load content on component mount
  useEffect(() => {
    const loadContent = async () => {
      if (!token) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await axios.get('/api/admin/content/hero');
        if (response.data && response.data.content) {
          // Reset form with loaded values
          form.reset(response.data.content);
        }
      } catch (err: any) {
        console.error('Error loading hero content:', err);
        
        // Don't show error if the content doesn't exist yet (404)
        if (err.response?.status !== 404) {
          setError(err.response?.data?.error || 'Failed to load content');
          toast({
            title: 'Error loading content',
            description: err.response?.data?.error || 'Could not load hero section content',
            variant: 'destructive',
          });
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    loadContent();
  }, [token, form, toast]);

  // Submit handler
  const onSubmit = async (data: HeroContent) => {
    if (!token) {
      toast({
        title: 'Authorization Error',
        description: 'You must be logged in to save changes',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSaving(true);
    setError(null);
    
    try {
      const response = await axios.post('/api/admin/content/hero', 
        { content: data },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      
      if (response.data.success) {
        toast({
          title: 'Saved successfully',
          description: 'Hero section content has been updated',
          variant: 'default',
        });
      }
    } catch (err: any) {
      console.error('Error saving hero content:', err);
      setError(err.response?.data?.error || 'Failed to save content');
      toast({
        title: 'Error saving content',
        description: err.response?.data?.error || 'Could not save hero section content',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-400" />
      </div>
    );
  }

  return (
    <div>
      <Card className="bg-black/40 border-yellow-500/20">
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200">Main Title</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="bg-black/50 border-yellow-400/30 text-slate-100"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subtitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200">Subtitle</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="bg-black/50 border-yellow-400/30 text-slate-100"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200">Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        rows={4}
                        className="bg-black/50 border-yellow-400/30 text-slate-100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="ctaButtonText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200">CTA Button Text</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="bg-black/50 border-yellow-400/30 text-slate-100"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="ctaButtonLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200">CTA Button Link</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="https://example.com"
                          className="bg-black/50 border-yellow-400/30 text-slate-100"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="secondaryButtonText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200">Secondary Button Text</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="bg-black/50 border-yellow-400/30 text-slate-100"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="secondaryButtonLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200">Secondary Button Link</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="https://example.com"
                          className="bg-black/50 border-yellow-400/30 text-slate-100"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="tokenAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200">Token Address</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        className="bg-black/50 border-yellow-400/30 text-slate-100 font-mono"
                      />
                    </FormControl>
                    <FormDescription className="text-slate-400">
                      The Solana token address used throughout the site
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {error && (
                <Alert variant="destructive" className="bg-red-900/50 border-red-500/50">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <Button 
                type="submit" 
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : 'Save Changes'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeroEditor;