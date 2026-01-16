import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Coins, Shield, Users, RefreshCw } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type AppRole = Database['public']['Enums']['app_role'];

interface UserProfile {
  id: string;
  user_id: string;
  display_name: string | null;
  pride_coins: number;
  created_at: string;
}

interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
}

const AdminDashboardPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [coinsToAdd, setCoinsToAdd] = useState<{ [key: string]: string }>({});
  const [roleToAssign, setRoleToAssign] = useState<{ [key: string]: AppRole }>({});

  useEffect(() => {
    if (user) {
      checkAdminStatus();
    }
  }, [user]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const checkAdminStatus = async () => {
    if (!user) return;

    const { data, error } = await supabase.rpc('has_role', {
      _user_id: user.id,
      _role: 'admin'
    });

    if (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    } else {
      setIsAdmin(data);
    }
    setLoading(false);
  };

  const fetchData = async () => {
    setLoading(true);
    
    // Fetch all profiles
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (profilesError) {
      console.error('Error fetching profiles:', profilesError);
    } else {
      setProfiles(profilesData || []);
    }

    // Fetch all user roles
    const { data: rolesData, error: rolesError } = await supabase
      .from('user_roles')
      .select('*');

    if (rolesError) {
      console.error('Error fetching roles:', rolesError);
    } else {
      setUserRoles(rolesData || []);
    }

    setLoading(false);
  };

  const handleAddCoins = async (userId: string) => {
    const amount = parseInt(coinsToAdd[userId] || '0', 10);
    if (isNaN(amount) || amount === 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid number of units to add.",
        variant: "destructive",
      });
      return;
    }

    const profile = profiles.find(p => p.user_id === userId);
    if (!profile) return;

    const { error } = await supabase.rpc('admin_add_pride_coins', {
      _target_user_id: userId,
      _amount: amount
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to update PRIDE Units.",
        variant: "destructive",
      });
    } else {
      const newTotal = profile.pride_coins + amount;
      toast({
        title: "Success",
        description: `Added ${amount} PRIDE Units. New balance: ${newTotal.toLocaleString()}`,
      });
      setCoinsToAdd({ ...coinsToAdd, [userId]: '' });
      fetchData();
    }
  };

  const handleAssignRole = async (userId: string) => {
    const role = roleToAssign[userId];
    if (!role) {
      toast({
        title: "Select a role",
        description: "Please select a role to assign.",
        variant: "destructive",
      });
      return;
    }

    // Check if user already has this role
    const existingRole = userRoles.find(r => r.user_id === userId && r.role === role);
    if (existingRole) {
      toast({
        title: "Role exists",
        description: "User already has this role.",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('user_roles')
      .insert({ user_id: userId, role });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to assign role.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `Assigned ${role} role to user.`,
      });
      setRoleToAssign({ ...roleToAssign, [userId]: undefined as unknown as AppRole });
      fetchData();
    }
  };

  const handleRemoveRole = async (roleId: string) => {
    const { error } = await supabase
      .from('user_roles')
      .delete()
      .eq('id', roleId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to remove role.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Role removed.",
      });
      fetchData();
    }
  };

  const getUserRoles = (userId: string) => {
    return userRoles.filter(r => r.user_id === userId);
  };

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="container py-12 flex items-center justify-center min-h-[60vh]">
          <RefreshCw className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin === false) {
    return (
      <Layout>
        <div className="container py-12">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Shield className="w-5 h-5" />
                Access Denied
              </CardTitle>
              <CardDescription>
                You don't have admin privileges to access this page.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Pride Social Network</title>
      </Helmet>
      
      <Layout>
        <div className="container py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary" />
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage users, roles, and PRIDE Units
              </p>
            </div>
            <Button onClick={fetchData} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  {profiles.length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total PRIDE Units
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-center gap-2">
                  <Coins className="w-5 h-5 text-pride-yellow" />
                  {profiles.reduce((sum, p) => sum + p.pride_coins, 0).toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Admins
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-center gap-2">
                  <Shield className="w-5 h-5 text-pride-red" />
                  {userRoles.filter(r => r.role === 'admin').length}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Add PRIDE coins and manage user roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>PRIDE Units</TableHead>
                      <TableHead>Add Units</TableHead>
                      <TableHead>Roles</TableHead>
                      <TableHead>Assign Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profiles.map((profile) => (
                      <TableRow key={profile.id}>
                        <TableCell className="font-medium">
                          {profile.display_name || 'Anonymous'}
                        </TableCell>
                        <TableCell>
                          <span className="flex items-center gap-1">
                            <Coins className="w-4 h-4 text-pride-yellow" />
                            {profile.pride_coins.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              placeholder="Amount"
                              className="w-24"
                              value={coinsToAdd[profile.user_id] || ''}
                              onChange={(e) => setCoinsToAdd({ 
                                ...coinsToAdd, 
                                [profile.user_id]: e.target.value 
                              })}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => handleAddCoins(profile.user_id)}
                            >
                              Add
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {getUserRoles(profile.user_id).map((role) => (
                              <span 
                                key={role.id}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
                                onClick={() => handleRemoveRole(role.id)}
                                title="Click to remove"
                              >
                                {role.role}
                                <span className="text-xs">×</span>
                              </span>
                            ))}
                            {getUserRoles(profile.user_id).length === 0 && (
                              <span className="text-muted-foreground text-xs">No roles</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Select
                              value={roleToAssign[profile.user_id] || ''}
                              onValueChange={(value) => setRoleToAssign({ 
                                ...roleToAssign, 
                                [profile.user_id]: value as AppRole 
                              })}
                            >
                              <SelectTrigger className="w-28">
                                <SelectValue placeholder="Role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="moderator">Moderator</SelectItem>
                                <SelectItem value="user">User</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleAssignRole(profile.user_id)}
                            >
                              Assign
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default AdminDashboardPage;
