import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

interface ChangePasswordFormProps {
  token: string | null;
}

// Schema for changing the password
const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, { message: 'Current password is required' }),
  newPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string().min(1, { message: 'Please confirm your password' }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  // Initialize form
  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  // Submit handler
  const onSubmit = async (data: ChangePasswordFormValues) => {
    if (!token) {
      toast({
        title: 'Authorization Error',
        description: 'You must be logged in to change the password',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      // First verify the current password
      const verifyResponse = await axios.post('/api/admin/login', {
        password: data.currentPassword
      });
      
      // If the current password is correct, proceed to change the password
      if (verifyResponse.data.success) {
        const response = await axios.post('/api/admin/change-password', 
          { newPassword: data.newPassword },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        
        if (response.data.success) {
          setSuccess(true);
          form.reset();
          toast({
            title: 'Password changed',
            description: 'Your password has been successfully updated',
            variant: 'default',
          });
        }
      } else {
        setError('Current password is incorrect');
        toast({
          title: 'Password change failed',
          description: 'Current password is incorrect',
          variant: 'destructive',
        });
      }
    } catch (err: any) {
      console.error('Error changing password:', err);
      
      // Determine if the error is due to invalid current password
      if (err.response?.status === 401) {
        setError('Current password is incorrect');
        toast({
          title: 'Password change failed',
          description: 'Current password is incorrect',
          variant: 'destructive',
        });
      } else {
        setError(err.response?.data?.error || 'Failed to change password');
        toast({
          title: 'Password change failed',
          description: err.response?.data?.error || 'An error occurred while changing the password',
          variant: 'destructive',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Card className="bg-black/40 border-yellow-500/20">
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200">Current Password</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="password"
                        className="bg-black/50 border-yellow-400/30 text-slate-100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200">New Password</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="password"
                        className="bg-black/50 border-yellow-400/30 text-slate-100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200">Confirm New Password</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="password"
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
              
              {success && (
                <Alert className="bg-green-900/50 border-green-500/50">
                  <AlertDescription className="text-green-300">
                    Password changed successfully
                  </AlertDescription>
                </Alert>
              )}
              
              <Button 
                type="submit" 
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : 'Change Password'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePasswordForm;