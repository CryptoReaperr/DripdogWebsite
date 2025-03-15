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
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus, Trash2 } from 'lucide-react';

interface TeamEditorProps {
  token: string | null;
}

// Schema for a team member
const memberSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  role: z.string().min(1, { message: 'Role is required' }),
  bio: z.string().min(1, { message: 'Bio is required' }),
  avatar: z.string().optional(),
  socialLinks: z.object({
    twitter: z.string().optional(),
    github: z.string().optional(),
    linkedin: z.string().optional(),
  }).optional(),
});

// Schema for the team section content
const teamSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  subtitle: z.string().min(1, { message: 'Subtitle is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  members: z.array(memberSchema).min(1, { message: 'At least one team member is required' }),
});

type TeamMember = z.infer<typeof memberSchema>;
type TeamContent = z.infer<typeof teamSchema>;

const TeamEditor: React.FC<TeamEditorProps> = ({ token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Default values
  const defaultValues: TeamContent = {
    title: 'Meet the DripDog Team',
    subtitle: 'The pack behind the brand',
    description: "Our diverse team brings together expertise in blockchain, design, marketing, and community building. We're all united by our passion for creating a unique token with real street cred.",
    members: [
      {
        name: 'Alpha Dog',
        role: 'Founder & Lead Developer',
        bio: 'Blockchain developer with 6+ years experience building on Solana. Previously worked at several top DeFi projects.',
        avatar: '/team/alpha-dog.jpg',
        socialLinks: {
          twitter: 'https://twitter.com/alphadog',
          github: 'https://github.com/alphadog',
        }
      },
      {
        name: 'Street Walker',
        role: 'Brand & Design Lead',
        bio: "Former street artist turned digital designer. Brings authentic urban culture aesthetic to DripDog's visual identity.",
        avatar: '/team/street-walker.jpg',
        socialLinks: {
          twitter: 'https://twitter.com/streetwalker',
        }
      },
      {
        name: 'Token Chaser',
        role: 'Marketing & Community',
        bio: 'Crypto marketing specialist with expertise in building engaged communities. Previously grew 3 token communities to 50k+ members.',
        avatar: '/team/token-chaser.jpg',
        socialLinks: {
          twitter: 'https://twitter.com/tokenchaser',
          linkedin: 'https://linkedin.com/in/tokenchaser',
        }
      },
      {
        name: 'Paw Patrol',
        role: 'Operations & Partnerships',
        bio: 'Business development expert focused on strategic partnerships. Connecting DripDog with the best projects in the Solana ecosystem.',
        avatar: '/team/paw-patrol.jpg',
        socialLinks: {
          twitter: 'https://twitter.com/pawpatrol',
          linkedin: 'https://linkedin.com/in/pawpatrol',
        }
      }
    ]
  };

  // Initialize form with default or loaded values
  const form = useForm<TeamContent>({
    resolver: zodResolver(teamSchema),
    defaultValues,
  });

  // Get the members array from the form
  const { fields, append, remove } = useFieldArray({
    name: 'members',
    control: form.control,
  });

  // Load content on component mount
  useEffect(() => {
    const loadContent = async () => {
      if (!token) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await axios.get('/api/admin/content/team');
        if (response.data && response.data.content) {
          // Reset form with loaded values
          form.reset(response.data.content);
        }
      } catch (err: any) {
        console.error('Error loading team content:', err);
        
        // Don't show error if the content doesn't exist yet (404)
        if (err.response?.status !== 404) {
          setError(err.response?.data?.error || 'Failed to load content');
          toast({
            title: 'Error loading content',
            description: err.response?.data?.error || 'Could not load team section content',
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
  const onSubmit = async (data: TeamContent) => {
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
      const response = await axios.post('/api/admin/content/team', 
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
          description: 'Team section content has been updated',
          variant: 'default',
        });
      }
    } catch (err: any) {
      console.error('Error saving team content:', err);
      setError(err.response?.data?.error || 'Failed to save content');
      toast({
        title: 'Error saving content',
        description: err.response?.data?.error || 'Could not save team section content',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Add a new team member to the form
  const addMember = () => {
    append({
      name: '',
      role: '',
      bio: '',
      avatar: '',
      socialLinks: {
        twitter: '',
        github: '',
        linkedin: '',
      }
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
                  <h3 className="text-lg font-medium text-yellow-400">Team Members</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addMember}
                    className="border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Member
                  </Button>
                </div>
                
                {fields.map((field, index) => (
                  <div key={field.id} className="p-4 border border-yellow-400/20 rounded-lg bg-black/30">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-md font-medium text-yellow-300">Team Member {index + 1}</h4>
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
                        name={`members.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-200">Name</FormLabel>
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
                        name={`members.${index}.role`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-200">Role</FormLabel>
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
                    
                    <div className="mt-4">
                      <FormField
                        control={form.control}
                        name={`members.${index}.bio`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-200">Bio</FormLabel>
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
                    
                    <div className="mt-4">
                      <FormField
                        control={form.control}
                        name={`members.${index}.avatar`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-200">Avatar URL</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="/team/avatar.jpg"
                                className="bg-black/50 border-yellow-400/30 text-slate-100"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="mt-4 p-3 border border-yellow-400/10 rounded bg-black/20">
                      <h5 className="text-sm font-medium text-yellow-200 mb-3">Social Links (Optional)</h5>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name={`members.${index}.socialLinks.twitter`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-200">Twitter</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="https://twitter.com/..."
                                  className="bg-black/50 border-yellow-400/30 text-slate-100"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name={`members.${index}.socialLinks.github`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-200">GitHub</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="https://github.com/..."
                                  className="bg-black/50 border-yellow-400/30 text-slate-100"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name={`members.${index}.socialLinks.linkedin`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-200">LinkedIn</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="https://linkedin.com/in/..."
                                  className="bg-black/50 border-yellow-400/30 text-slate-100"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
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

export default TeamEditor;