
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AtSign, Lock, User, Briefcase } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from '@/hooks/useTranslation';
import { supabase } from "@/integrations/supabase/client";

type UserRole = 'user' | 'lawyer';

interface AuthFormProps {
  isLogin?: boolean;
}

const AuthForm = ({ isLogin = true }: AuthFormProps) => {
  const { toast } = useToast();
  const [formMode, setFormMode] = useState<'login' | 'register'>(isLogin ? 'login' : 'register');
  const [role, setRole] = useState<UserRole>('user');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formMode === 'register' && password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      if (formMode === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (error) throw error;
        
        toast({
          title: t('common.welcomeBack'),
          description: "You have successfully logged in.",
        });
        
        navigate('/dashboard');
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
              role: role,
              specialization: role === 'lawyer' ? specialization : null
            }
          }
        });
        
        if (error) throw error;
        
        toast({
          title: "Account created!",
          description: "You have successfully registered. Please check your email for verification.",
        });
        
        // Auto-login after registration
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (!loginError) {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast({
        title: "Error",
        description: error.message || "Authentication failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-4">
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            <span className="gradient-text">
              {formMode === 'login' ? t('common.login') : t('common.createAccount')}
            </span>
          </CardTitle>
          <CardDescription className="text-center">
            {formMode === 'login' 
              ? t('common.welcomeBack')
              : t('common.createYourAccount')
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {formMode === 'register' && (
            <div className="space-y-2">
              <Tabs defaultValue="user" onValueChange={(value) => setRole(value as UserRole)}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="user" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{t('common.client')}</span>
                  </TabsTrigger>
                  <TabsTrigger value="lawyer" className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span>{t('common.lawyer')}</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {formMode === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="name">{t('common.fullName')}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('common.fullName')} 
                    className="pl-10" 
                    required 
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">{t('common.email')}</Label>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('common.email')} 
                  className="pl-10" 
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">{t('common.password')}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('common.password')} 
                  className="pl-10" 
                  required 
                />
              </div>
            </div>
            
            {formMode === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t('common.confirmPassword')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="confirmPassword" 
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t('common.confirmPassword')} 
                    className="pl-10" 
                    required 
                  />
                </div>
              </div>
            )}
            
            {formMode === 'register' && role === 'lawyer' && (
              <div className="space-y-2">
                <Label htmlFor="specialization">{t('common.specialization')}</Label>
                <Input 
                  id="specialization"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  placeholder={t('common.specialization')} 
                  required 
                />
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-legal-primary hover:bg-legal-secondary"
              disabled={loading}
            >
              {loading ? 'Processing...' : formMode === 'login' ? t('common.signIn') : t('common.createYourAccount')}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            {formMode === 'login' ? (
              <span>
                {t('common.dontHaveAccount')}{' '}
                <button 
                  onClick={() => {
                    setFormMode('register');
                    navigate('/register');
                  }} 
                  className="text-legal-primary hover:text-legal-secondary underline"
                >
                  {t('common.register')}
                </button>
              </span>
            ) : (
              <span>
                {t('common.alreadyHaveAccount')}{' '}
                <button 
                  onClick={() => {
                    setFormMode('login');
                    navigate('/login');
                  }} 
                  className="text-legal-primary hover:text-legal-secondary underline"
                >
                  {t('common.login')}
                </button>
              </span>
            )}
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">{t('common.orContinueWith')}</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" className="w-full">Google</Button>
            <Button variant="outline" className="w-full">Facebook</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthForm;
