import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

// Content editor components
import HeroEditor from '@/components/admin/HeroEditor';
import HowToBuyEditor from '@/components/admin/HowToBuyEditor';
import CommunityEditor from '@/components/admin/CommunityEditor';
import TeamEditor from '@/components/admin/TeamEditor';
import ChangePasswordForm from '@/components/admin/ChangePasswordForm';

// Login form schema
const loginSchema = z.object({
  password: z.string().min(1, { message: 'Password is required' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('hero');
  const [sections, setSections] = useState<string[]>(['hero', 'howToBuy', 'community', 'team']);
  const [error, setError] = useState<string | null>(null);
  
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Check if user is already logged in
  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
    }
  }, []);

  // Setup login form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('/api/admin/login', {
        password: data.password
      });
      
      if (response.data.success) {
        const newToken = response.data.token;
        localStorage.setItem('adminToken', newToken);
        setToken(newToken);
        setIsLoggedIn(true);
        toast({
          title: 'Login successful',
          description: 'Welcome to the admin panel',
          variant: 'default',
        });
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Login failed. Please try again.');
      toast({
        title: 'Login failed',
        description: err.response?.data?.error || 'Invalid credentials',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      if (token) {
        await axios.post('/api/admin/logout', {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('adminToken');
      setToken(null);
      setIsLoggedIn(false);
      toast({
        title: 'Logged out',
        description: 'You have been logged out successfully',
      });
    }
  };

  const renderLoginForm = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-drip-dark p-4">
      <Card className="w-full max-w-md border-yellow-400/20 bg-black/60 backdrop-blur-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center text-yellow-400">Admin Login</CardTitle>
          <CardDescription className="text-center text-slate-300">
            Enter your password to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200">Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Enter your password" 
                        {...field} 
                        className="bg-black/50 border-yellow-400/30 text-slate-100"
                      />
                    </FormControl>
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
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </Form>
          
          <div className="mt-4 text-center">
            <Button 
              variant="link" 
              onClick={() => setLocation('/')}
              className="text-slate-400 hover:text-yellow-400"
            >
              Back to Website
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAdminPanel = () => (
    <div className="min-h-screen bg-drip-dark text-slate-200">
      <header className="sticky top-0 z-50 w-full border-b border-yellow-400/20 bg-black/60 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-yellow-400">DripDog Admin Panel</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => setLocation('/')}
              className="text-slate-300 hover:text-yellow-400 hover:bg-black/20"
            >
              View Website
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleLogout}
              className="bg-red-800 hover:bg-red-700"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-5 bg-black/50 border border-yellow-500/20">
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="howToBuy">How To Buy</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="hero" className="bg-black/50 p-6 rounded-lg border border-yellow-500/20">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Edit Hero Section</h2>
            <HeroEditor token={token} />
          </TabsContent>
          
          <TabsContent value="howToBuy" className="bg-black/50 p-6 rounded-lg border border-yellow-500/20">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Edit How To Buy Section</h2>
            <HowToBuyEditor token={token} />
          </TabsContent>
          
          <TabsContent value="community" className="bg-black/50 p-6 rounded-lg border border-yellow-500/20">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Edit Community Section</h2>
            <CommunityEditor token={token} />
          </TabsContent>
          
          <TabsContent value="team" className="bg-black/50 p-6 rounded-lg border border-yellow-500/20">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Edit Team Section</h2>
            <TeamEditor token={token} />
          </TabsContent>
          
          <TabsContent value="settings" className="bg-black/50 p-6 rounded-lg border border-yellow-500/20">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Admin Settings</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="change-password" className="border-yellow-500/20">
                <AccordionTrigger className="text-yellow-300">Change Admin Password</AccordionTrigger>
                <AccordionContent>
                  <ChangePasswordForm token={token} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );

  return isLoggedIn ? renderAdminPanel() : renderLoginForm();
};

export default AdminPage;