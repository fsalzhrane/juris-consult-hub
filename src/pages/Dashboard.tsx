
import * as React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Layout>
      <div className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">{t('dashboard.welcomeBack')}, {user?.user_metadata?.full_name || user?.email}</h1>
            <Button variant="outline" onClick={handleSignOut} className="flex items-center gap-2">
              <LogOut size={16} />
              {t('common.logout')}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.myAppointments')}</CardTitle>
                <CardDescription>View and manage your scheduled appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No upcoming appointments</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.upcomingConsultations')}</CardTitle>
                <CardDescription>Your next legal consultations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No upcoming consultations</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.recentActivities')}</CardTitle>
                <CardDescription>Recent actions and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No recent activities</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
