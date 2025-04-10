
import { useState } from 'react';
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

type UserRole = 'user' | 'lawyer';

const AuthForm = () => {
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<UserRole>('user');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock auth response for now - will connect to Supabase later
    toast({
      title: isLogin ? "Welcome back!" : "Account created!",
      description: `You have successfully ${isLogin ? 'logged in' : 'registered'} as a ${role}.`,
    });
  };
  
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-4">
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            <span className="gradient-text">
              {isLogin ? 'Login to JurisConsult' : 'Create an Account'}
            </span>
          </CardTitle>
          <CardDescription className="text-center">
            {isLogin 
              ? 'Enter your credentials to access your account' 
              : 'Fill in your details to create a new account'
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Tabs defaultValue="user" onValueChange={(value) => setRole(value as UserRole)}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="user" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Client</span>
                  </TabsTrigger>
                  <TabsTrigger value="lawyer" className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span>Lawyer</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="name" placeholder="Enter your full name" className="pl-10" required />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="Enter your email" className="pl-10" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" placeholder={isLogin ? "Enter your password" : "Create a password"} className="pl-10" required />
              </div>
            </div>
            
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="confirmPassword" type="password" placeholder="Confirm your password" className="pl-10" required />
                </div>
              </div>
            )}
            
            {!isLogin && role === 'lawyer' && (
              <div className="space-y-2">
                <Label htmlFor="specialization">Legal Specialization</Label>
                <Input id="specialization" placeholder="e.g. Family Law, Criminal Law" required />
              </div>
            )}
            
            <Button type="submit" className="w-full bg-legal-primary hover:bg-legal-secondary">
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            {isLogin ? (
              <span>
                Don't have an account?{' '}
                <button 
                  onClick={() => setIsLogin(false)} 
                  className="text-legal-primary hover:text-legal-secondary underline"
                >
                  Register
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button 
                  onClick={() => setIsLogin(true)} 
                  className="text-legal-primary hover:text-legal-secondary underline"
                >
                  Login
                </button>
              </span>
            )}
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
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
