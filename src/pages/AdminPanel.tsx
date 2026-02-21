import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Users, Shield, CreditCard, Eye, CheckCircle, XCircle, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Profile {
  id: string;
  username: string | null;
  display_name: string | null;
  user_type: string | null;
  avatar_url: string | null;
  created_at: string | null;
  visibility_status: string;
  gender: string | null;
}

interface VerificationRequest {
  id: string;
  user_id: string;
  verification_status: string | null;
  verification_type: string;
  verification_media_url: string | null;
  verification_requested_at: string | null;
  created_at: string;
  notes: string | null;
}

interface Transaction {
  id: string;
  transaction_id: string;
  customer_email: string;
  customer_name: string | null;
  amount_cents: number;
  payment_status: string;
  plan_type: string | null;
  created_at: string | null;
  paid_at: string | null;
}

const AdminPanel = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [verifications, setVerifications] = useState<VerificationRequest[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({ totalUsers: 0, totalModels: 0, pendingVerifications: 0, totalRevenue: 0 });

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/login');
      return;
    }
    checkAdminAndLoad();
  }, [user, authLoading]);

  const checkAdminAndLoad = async () => {
    if (!user) return;
    const { data: adminCheck } = await supabase.rpc('is_admin', { _user_id: user.id });
    if (!adminCheck) {
      toast.error('Acesso negado. Você não é administrador.');
      navigate('/home');
      return;
    }
    setIsAdmin(true);
    await Promise.all([loadProfiles(), loadVerifications(), loadTransactions()]);
    setLoading(false);
  };

  const loadProfiles = async () => {
    const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    if (data) {
      setProfiles(data);
      setStats(prev => ({
        ...prev,
        totalUsers: data.length,
        totalModels: data.filter(p => p.user_type === 'model').length,
      }));
    }
  };

  const loadVerifications = async () => {
    const { data } = await supabase.from('verified_models').select('*').order('created_at', { ascending: false });
    if (data) {
      setVerifications(data);
      setStats(prev => ({
        ...prev,
        pendingVerifications: data.filter(v => v.verification_status === 'pending').length,
      }));
    }
  };

  const loadTransactions = async () => {
    const { data } = await supabase.from('cakto_transactions').select('*').order('created_at', { ascending: false }).limit(100);
    if (data) {
      setTransactions(data);
      setStats(prev => ({
        ...prev,
        totalRevenue: data.filter(t => t.payment_status === 'approved').reduce((sum, t) => sum + t.amount_cents, 0),
      }));
    }
  };

  const handleVerification = async (id: string, status: 'approved' | 'rejected') => {
    const { error } = await supabase
      .from('verified_models')
      .update({
        verification_status: status,
        verification_reviewed_at: new Date().toISOString(),
        verified_by: user?.id,
      })
      .eq('id', id);

    if (error) {
      toast.error('Erro ao atualizar verificação');
    } else {
      toast.success(`Verificação ${status === 'approved' ? 'aprovada' : 'rejeitada'}`);
      loadVerifications();
    }
  };

  const toggleUserType = async (profileId: string, currentType: string | null) => {
    const newType = currentType === 'model' ? 'user' : 'model';
    const { error } = await supabase.from('profiles').update({ user_type: newType }).eq('id', profileId);
    if (error) {
      toast.error('Erro ao alterar tipo de usuário');
    } else {
      toast.success(`Usuário alterado para ${newType}`);
      loadProfiles();
    }
  };

  const filteredProfiles = profiles.filter(p =>
    (p.username?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (p.display_name?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background p-4 pb-20">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/home')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Painel Admin</h1>
            <p className="text-sm text-muted-foreground">Gerencie usuários, verificações e pagamentos</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
                <p className="text-xs text-muted-foreground">Usuários</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.totalModels}</p>
                <p className="text-xs text-muted-foreground">Modelos</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Eye className="h-8 w-8 text-amber-500" />
              <div>
                <p className="text-2xl font-bold">{stats.pendingVerifications}</p>
                <p className="text-xs text-muted-foreground">Verificações</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <CreditCard className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">R$ {(stats.totalRevenue / 100).toFixed(0)}</p>
                <p className="text-xs text-muted-foreground">Receita</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="users">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="verifications">Verificações</TabsTrigger>
            <TabsTrigger value="payments">Pagamentos</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por username ou nome..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="space-y-2">
              {filteredProfiles.map(profile => (
                <Card key={profile.id}>
                  <CardContent className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                        {profile.avatar_url ? (
                          <img src={profile.avatar_url} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <Users className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{profile.display_name || profile.username || 'Sem nome'}</p>
                        <p className="text-xs text-muted-foreground">@{profile.username || 'sem-username'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={profile.user_type === 'model' ? 'default' : 'secondary'}>
                        {profile.user_type || 'user'}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleUserType(profile.id, profile.user_type)}
                      >
                        Alternar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Verifications Tab */}
          <TabsContent value="verifications" className="space-y-2">
            {verifications.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Nenhuma verificação encontrada</p>
            ) : (
              verifications.map(v => (
                <Card key={v.id}>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">User: {v.user_id.slice(0, 8)}...</p>
                        <p className="text-xs text-muted-foreground">
                          Status: <Badge variant={v.verification_status === 'approved' ? 'default' : v.verification_status === 'pending' ? 'secondary' : 'destructive'}>
                            {v.verification_status || 'pending'}
                          </Badge>
                        </p>
                        {v.verification_media_url && (
                          <a href={v.verification_media_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                            Ver mídia
                          </a>
                        )}
                      </div>
                      {v.verification_status === 'pending' && (
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleVerification(v.id, 'approved')}>
                            <CheckCircle className="h-4 w-4 mr-1" /> Aprovar
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleVerification(v.id, 'rejected')}>
                            <XCircle className="h-4 w-4 mr-1" /> Rejeitar
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-2">
            {transactions.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Nenhuma transação encontrada</p>
            ) : (
              transactions.map(t => (
                <Card key={t.id}>
                  <CardContent className="p-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{t.customer_name || t.customer_email}</p>
                      <p className="text-xs text-muted-foreground">{t.plan_type} • {new Date(t.created_at || '').toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">R$ {(t.amount_cents / 100).toFixed(2)}</p>
                      <Badge variant={t.payment_status === 'approved' ? 'default' : 'secondary'}>
                        {t.payment_status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
