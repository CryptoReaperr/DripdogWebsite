import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus, Trash2 } from 'lucide-react';

interface CommunityEditorProps {
  token: string | null;
}

// Schema for a social platform
const socialSchema = z.object({
  name: z.string().min(1, { message: 'Platform name is required' }),
  url: z.string().url({ message: 'Must be a valid URL' }),
  description: z.string().min(1, { message: 'Description is required' }),
  icon: z.string().optional(),
});

// Schema for the community section content
const communitySchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  subtitle: z.string().min(1, { message: 'Subtitle is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  platforms: z.array(socialSchema).min(1, { message: 'At least one social platform is required' }),
});

type Social = z.infer<typeof socialSchema>;
type CommunityContent = z.infer<typeof communitySchema>;

const CommunityEditor: React.FC<CommunityEditorProps> = ({ token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Default values
  const defaultValues: CommunityContent = {
    title: 'Join Our Growing Community',
    subtitle: 'Connect with the DripDog pack across multiple platforms',
    description: "DripDog is more than just a token—it's a community of enthusiasts, creators, and believers. Join us and help shape the future of $DRIP.",
    platforms: [
      {
        name: 'Telegram',
        url: 'https://t.me/dripdogcoin',
        description: 'Join our active Telegram for real-time updates, community discussions, and direct contact with the team.',
        icon: 'telegram'
      },
      {
        name: 'Twitter',
        url: 'https://twitter.com/DripDogSolana',
        description: 'Follow us on Twitter for the latest announcements, memes, and community highlights.',
        icon: 'twitter'
      },
      {
        name: 'Discord',
        url: 'https://discord.gg/dripdog',
        description: 'Join our Discord server for in-depth technical discussions and community building.',
        icon: 'discord'
      },
      {
        name: 'Reddit',
        url: 'https://reddit.com/r/DripDogCoin',
        description: 'Subscribe to our subreddit for community-created content and discussions.',
        icon: 'reddit'
      }
    ]
  };

  // Initialize form with default or loaded values
  const form = useForm<CommunityContent>({
    resolver: zodResolver(communitySchema),
    defaultValues,
  });

  // Get the platforms array from the form
  const { fields, append, remove } = form.useFieldArray({
    name: 'platforms',
    control: form.control,
  });

  // Load content on component mount
  useEffect(() => {
    const loadContent = async () => {
      if (!token) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await axios.get('/api/admin/content/community');
        if (response.data && response.data.content) {
          // Reset form with loaded values
          form.reset(response.data.content);
        }
      } catch (err: any) {
        console.error('Error loading community content:', err);
        
        // Don't show error if the content doesn't exist yet (404)
        if (err.response?.status !== 404) {
          setError(err.response?.data?.error || 'Failed to load content');
          toast({
            title: 'Error loading content',
            description: err.response?.data?.error || 'Could not load community section content',
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
  const onSubmit = async (data: CommunityContent) => {
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
      const response = await axios.post('/api/admin/content/community', 
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
          description: 'Community section content has been updated',
          variant: 'default',
        });
      }
    } catch (err: any) {
      console.error('Error saving community content:', err);
      setError(err.response?.data?.error || 'Failed to save content');
      toast({
        title: 'Error saving content',
        description: err.response?.data?.error || 'Could not save community section content',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Add a new platform to the form
  const addPlatform = () => {
    append({
      name: '',
      url: '',
      description: '',
      icon: ''
    });
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
                      <FormLabel className="text-slate-200">Section Title</FormLabel>
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
                      <FormLabel className="text-slate-200">Section Subtitle</FormLabel>
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
                    <FormLabel className="text-slate-200">Section Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        rows={3}
                        className="bg-black/50 border-yellow-400/30 text-slate-100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-yellow-400">Social Platforms</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addPlatform}
                    className="border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Platform
                  </Button>
                </div>
                
                {fields.map((field, index) => (
                  <div key={field.id} className="p-4 border border-yellow-400/20 rounded-lg bg-black/30">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-md font-medium text-yellow-300">Platform {index + 1}</h4>
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => remove(index)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`platforms.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-200">Platform Name</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="Telegram, Twitter, etc."
                                className="bg-black/50 border-yellow-400/30 text-slate-100"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`platforms.${index}.icon`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-200">Icon Name</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="telegram, twitter, etc."
                                className="bg-black/50 border-yellow-400/30 text-slate-100"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="mt-4">
                      <FormField
                        control={form.control}
                        name={`platforms.${index}.url`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-200">URL</FormLabel>
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
                    
                    <div className="mt-4">
                      <FormField
                        control={form.control}
                        name={`platforms.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-200">Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                rows={2}
                                className="bg-black/50 border-yellow-400/30 text-slate-100"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
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

export default CommunityEditor;