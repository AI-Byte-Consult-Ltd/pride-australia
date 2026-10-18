import { useState, useEffect } from 'react';
import PageSEO from '@/components/PageSEO';
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
import { Coins, Shield, Users, RefreshCw, Flag, Trash2, Check } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type AppRole = Database['public']['Enums']['app_role'];
type OpenReport = Database['public']['Functions']['get_open_reports']['Returns'][number];

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
  const [reports, setReports] = useState<OpenReport[]>([]);

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
      .select('id, user_id, display_name, pride_coins, created_at')
      .order('created_at', { ascending: false });

    if (profilesError) {
      console.error('Error fetching profiles:', profilesError);
    } else {
      setProfiles(profilesData || []);
    }

    const { data: reportsData } = await supabase.rpc('get_open_reports', { _limit: 200 });
    setReports(reportsData || []);

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
        description: "Please enter a valid number of Pride Coins to add.",
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
        description: error.message || "Failed to update Pride Coins.",
        variant: "destructive",
      });
    } else {
      const newTotal = profile.pride_coins + amount;
      toast({
        title: "Success",
        description: `Added ${amount} Pride Coins. New balance: ${newTotal.toLocaleString()}`,
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

  const resolveReport = async (report: OpenReport, removeContent: boolean) => {
    if (!user) return;
    if (removeContent && (report.target_type === 'post' || report.target_type === 'reply')) {
      const table = report.target_type === 'post' ? 'posts' : 'post_replies';
      const { error } = await supabase.from(table).delete().eq('id', report.target_id);
      if (error) {
        toast({ title: 'Error', description: 'Failed to remove content.', variant: 'destructive' });
        return;
      }
    }
    // Close every open report about the same target
    const { error } = await supabase
      .from('content_reports')
      .update({
        status: removeContent ? 'resolved' : 'dismissed',
        resolved_by: user.id,
        resolved_at: new Date().toISOString(),
      })
      .eq('target_type', report.target_type)
      .eq('target_id', report.target_id)
      .eq('status', 'open');
    if (error) {
      toast({ title: 'Error', description: 'Failed to update report.', variant: 'destructive' });
      return;
    }
    toast({ title: removeContent ? 'Content removed' : 'Report dismissed' });
    fetchData();
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
      <PageSEO
        title="Admin Dashboard | Pride Social Network"
        description="Admin dashboard for Pride Social Network."
        path="/admin"
        noIndex
      />
      
      <Layout>
        <div className="container py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary" />
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage users, roles, and Pride Coins
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
                  Total Pride Coins
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

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flag className="w-5 h-5 text-destructive" /> Reports ({reports.length})
              </CardTitle>
              <CardDescription>Content and users reported by the community</CardDescription>
            </CardHeader>
            <CardContent>
              {reports.length === 0 ? (
                <p className="text-sm text-muted-foreground">No open reports.</p>
              ) : (
                <div className="space-y-3">
                  {reports.map((report) => (
                    <div key={report.id} className="rounded-lg border p-3 space-y-2">
                      <div className="flex flex-wrap items-center gap-2 text-sm">
                        <span className="font-medium capitalize">{report.target_type}</span>
                        <span className="text-muted-foreground">
                          by {report.target_username || 'unknown'} · reported by {report.reporter_username || 'unknown'} ·{' '}
                          {new Date(report.created_at).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm"><span className="text-muted-foreground">Reason:</span> {report.reason}</p>
                      {report.target_preview && (
                        <p className="text-sm bg-muted/50 rounded p-2 whitespace-pre-wrap break-words">{report.target_preview}</p>
                      )}
                      {!report.target_preview && report.target_type !== 'user' && (
                        <p className="text-sm text-muted-foreground">Content was already deleted.</p>
                      )}
                      <div className="flex gap-2">
                        {report.target_type !== 'user' && report.target_preview && (
                          <Button size="sm" variant="destructive" onClick={() => resolveReport(report, true)}>
                            <Trash2 className="w-4 h-4 mr-1" /> Remove {report.target_type}
                          </Button>
                        )}
                        <Button size="sm" variant="outline" onClick={() => resolveReport(report, false)}>
                          <Check className="w-4 h-4 mr-1" /> Dismiss
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Add Pride Coins and manage user roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Pride Coins</TableHead>
                      <TableHead>Add Pride Coins</TableHead>
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
