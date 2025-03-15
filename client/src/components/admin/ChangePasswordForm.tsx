import React, { useState } from 'react';
import axios from 'axios';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Form validation schema
const changePasswordSchema = z.object({
  newPassword: z.string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(100, { message: 'Password is too long' }),
  confirmPassword: z.string()
    .min(8, { message: 'Password must be at least 8 characters long' })
})
.refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

interface ChangePasswordFormProps {
  token: string | null;
}

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
      newPassword: '',
      confirmPassword: '',
    },
  });

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
          title: 'Password Updated',
          description: 'Your admin password has been changed successfully',
          variant: 'default',
        });
      }
    } catch (err: any) {
      console.error('Error changing password:', err);
      setError(err.response?.data?.error || 'Failed to change password');
      toast({
        title: 'Error',
        description: err.response?.data?.error || 'Could not change password',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-200">New Password</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="Enter your new password" 
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
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-200">Confirm Password</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="Confirm your new password" 
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
          
          {success && (
            <Alert className="bg-green-900/50 border-green-500/50">
              <AlertDescription>Password changed successfully!</AlertDescription>
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
    </div>
  );
};

export default ChangePasswordForm;