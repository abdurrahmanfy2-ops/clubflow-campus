import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Handshake,
  TrendingUp,
  Users,
  Eye,
  MessageSquare,
  Star,
  DollarSign,
  Target,
  BarChart3,
  Calendar,
  Award,
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Plus,
  Search,
  Filter,
  Download,
  ExternalLink,
  CheckCircle,
  Clock,
  AlertCircle,
  Heart,
  Share2,
  Megaphone,
  PieChart,
  Activity,
  Zap,
  Trophy,
  Gift
} from "lucide-react";

interface Sponsor {
  id: string;
  name: string;
  industry: string;
  logo: string;
  website: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  budget: number;
  interests: string[];
  active: boolean;
  joinedDate: string;
}

interface SponsorshipDeal {
  id: string;
  sponsorId: string;
  clubId: string;
  sponsorName: string;
  clubName: string;
  amount: number;
  type: 'monetary' | 'in-kind' | 'services';
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  description: string;
  deliverables: string[];
  roi: {
    impressions: number;
    engagement: number;
    conversions: number;
    revenue: number;
  };
}

interface ClubSponsorship {
  clubId: string;
  clubName: string;
  totalRaised: number;
  activeSponsors: number;
  pendingDeals: number;
  deals: SponsorshipDeal[];
}

const SponsorshipManager = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("sponsors");
  const [selectedClub, setSelectedClub] = useState("cs-club");
  const [showNewSponsor, setShowNewSponsor] = useState(false);
  const [showNewDeal, setShowNewDeal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data - Fresh start for new platform
  const [sponsors, setSponsors] = useState<Sponsor[]>([
    // No existing sponsors - empty array for fresh start
  ]);

  const [clubSponsorships, setClubSponsorships] = useState<ClubSponsorship[]>([
    {
      clubId: "cs-club",
      clubName: "Computer Science Club",
      totalRaised: 0,
      activeSponsors: 0,
      pendingDeals: 0,
      deals: []
    },
    {
      clubId: "art-club",
      clubName: "Digital Arts Club",
      totalRaised: 0,
      activeSponsors: 0,
      pendingDeals: 0,
      deals: []
    }
  ]);

  const [newSponsor, setNewSponsor] = useState({
    name: "",
    industry: "",
    website: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    budget: 0,
    interests: [] as string[]
  });

  const [newDeal, setNewDeal] = useState({
    sponsorId: "",
    amount: 0,
    type: "monetary" as "monetary" | "in-kind" | "services",
    description: "",
    deliverables: [] as string[]
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const currentClub = clubSponsorships.find(club => club.clubId === selectedClub);
  const filteredDeals = currentClub?.deals.filter(deal => {
    const matchesSearch = deal.sponsorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         deal.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || deal.status === filterStatus;
    return matchesSearch && matchesStatus;
  }) || [];

  const handleAddSponsor = () => {
    if (!newSponsor.name || !newSponsor.contactEmail) return;

    const sponsor: Sponsor = {
      id: Date.now().toString(),
      name: newSponsor.name,
      industry: newSponsor.industry,
      logo: newSponsor.name.substring(0, 2).toUpperCase(),
      website: newSponsor.website,
      contact: {
        name: newSponsor.contactName,
        email: newSponsor.contactEmail,
        phone: newSponsor.contactPhone
      },
      budget: newSponsor.budget,
      interests: newSponsor.interests,
      active: true,
      joinedDate: new Date().toISOString().split('T')[0]
    };

    setSponsors(prev => [...prev, sponsor]);
    setNewSponsor({
      name: "",
      industry: "",
      website: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      budget: 0,
      interests: []
    });
    setShowNewSponsor(false);
  };

  const handleAddDeal = () => {
    if (!currentClub || !newDeal.sponsorId || !newDeal.amount) return;

    const sponsor = sponsors.find(s => s.id === newDeal.sponsorId);
    if (!sponsor) return;

    const deal: SponsorshipDeal = {
      id: Date.now().toString(),
      sponsorId: newDeal.sponsorId,
      clubId: selectedClub,
      sponsorName: sponsor.name,
      clubName: currentClub.clubName,
      amount: newDeal.amount,
      type: newDeal.type,
      status: "pending",
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: newDeal.description,
      deliverables: newDeal.deliverables,
      roi: {
        impressions: 0,
        engagement: 0,
        conversions: 0,
        revenue: 0
      }
    };

    setClubSponsorships(prev => prev.map(club =>
      club.clubId === selectedClub
        ? {
            ...club,
            deals: [...club.deals, deal],
            totalRaised: club.totalRaised + deal.amount,
            pendingDeals: club.pendingDeals + 1
          }
        : club
    ));

    setNewDeal({
      sponsorId: "",
      amount: 0,
      type: "monetary",
      description: "",
      deliverables: []
    });
    setShowNewDeal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'monetary': return DollarSign;
      case 'in-kind': return Gift;
      case 'services': return Users;
      default: return Handshake;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-16 w-full" />
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <Skeleton className="h-64 w-full" />
        </Card>
      </div>
    );
  }

  if (!currentClub) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Handshake className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Sponsorship Manager</h2>
            <p className="text-muted-foreground">Connect with sponsors and manage partnerships</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Select value={selectedClub} onValueChange={setSelectedClub}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {clubSponsorships.map(club => (
                <SelectItem key={club.clubId} value={club.clubId}>
                  {club.clubName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog open={showNewSponsor} onOpenChange={setShowNewSponsor}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Sponsor
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Sponsor</DialogTitle>
                <DialogDescription>
                  Add a new sponsor to the platform
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="sponsorName">Company Name</Label>
                  <Input
                    id="sponsorName"
                    value={newSponsor.name}
                    onChange={(e) => setNewSponsor(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Company name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Select value={newSponsor.industry} onValueChange={(value) =>
                      setNewSponsor(prev => ({ ...prev, industry: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Energy">Energy</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="budget">Annual Budget ($)</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={newSponsor.budget}
                      onChange={(e) => setNewSponsor(prev => ({ ...prev, budget: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="contactName">Contact Person</Label>
                  <Input
                    id="contactName"
                    value={newSponsor.contactName}
                    onChange={(e) => setNewSponsor(prev => ({ ...prev, contactName: e.target.value }))}
                    placeholder="Contact person name"
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={newSponsor.contactEmail}
                    onChange={(e) => setNewSponsor(prev => ({ ...prev, contactEmail: e.target.value }))}
                    placeholder="contact@company.com"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowNewSponsor(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleAddSponsor} className="flex-1">
                    Add Sponsor
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Raised</p>
              <p className="text-2xl font-bold">${currentClub.totalRaised.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Sponsors</p>
              <p className="text-2xl font-bold">{currentClub.activeSponsors}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending Deals</p>
              <p className="text-2xl font-bold">{currentClub.pendingDeals}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Target className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <p className="text-2xl font-bold">85%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
          <TabsTrigger value="deals">Deals</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="matching">Matching</TabsTrigger>
        </TabsList>

        <TabsContent value="sponsors" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sponsors.map((sponsor) => (
              <Card key={sponsor.id} className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold">
                    {sponsor.logo}
                  </div>
                  <div>
                    <h3 className="font-semibold">{sponsor.name}</h3>
                    <p className="text-sm text-muted-foreground">{sponsor.industry}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{sponsor.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{sponsor.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{sponsor.website}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Budget</span>
                    <span className="text-sm font-bold">${sponsor.budget.toLocaleString()}</span>
                  </div>
                  <Progress value={(sponsor.budget / 100000) * 100} className="h-2" />
                </div>

                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Contact
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Visit
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="deals" className="space-y-6">
          {/* Filters */}
          <Card className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search deals..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Deals</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Dialog open={showNewDeal} onOpenChange={setShowNewDeal}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Deal
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Deal</DialogTitle>
                    <DialogDescription>
                      Set up a sponsorship deal with a sponsor
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="sponsor">Sponsor</Label>
                      <Select value={newDeal.sponsorId} onValueChange={(value) =>
                        setNewDeal(prev => ({ ...prev, sponsorId: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select sponsor" />
                        </SelectTrigger>
                        <SelectContent>
                          {sponsors.filter(s => s.active).map(sponsor => (
                            <SelectItem key={sponsor.id} value={sponsor.id}>
                              {sponsor.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="dealType">Type</Label>
                        <Select value={newDeal.type} onValueChange={(value: "monetary" | "in-kind" | "services") =>
                          setNewDeal(prev => ({ ...prev, type: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="monetary">Monetary</SelectItem>
                            <SelectItem value="in-kind">In-Kind</SelectItem>
                            <SelectItem value="services">Services</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="dealAmount">Amount ($)</Label>
                        <Input
                          id="dealAmount"
                          type="number"
                          value={newDeal.amount}
                          onChange={(e) => setNewDeal(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="dealDescription">Description</Label>
                      <Textarea
                        id="dealDescription"
                        value={newDeal.description}
                        onChange={(e) => setNewDeal(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Deal description and terms"
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button variant="outline" onClick={() => setShowNewDeal(false)} className="flex-1">
                        Cancel
                      </Button>
                      <Button onClick={handleAddDeal} className="flex-1">
                        Create Deal
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </Card>

          {/* Deals List */}
          <div className="space-y-4">
            {filteredDeals.map((deal) => {
              const TypeIcon = getTypeIcon(deal.type);
              return (
                <Card key={deal.id} className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <TypeIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{deal.sponsorName}</h3>
                        <p className="text-sm text-muted-foreground">{deal.description}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(deal.status)}>
                      {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="font-semibold">${deal.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <p className="font-semibold capitalize">{deal.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-semibold">
                        {new Date(deal.startDate).toLocaleDateString()} - {new Date(deal.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-semibold capitalize">{deal.status}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">ROI Generated</p>
                      <p className="font-bold text-green-600">
                        ${deal.roi.revenue.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle>Sponsorship Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentClub.deals.map((deal) => (
                    <div key={deal.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{deal.sponsorName}</span>
                        <span className="text-sm text-muted-foreground">
                          ${deal.amount.toLocaleString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{deal.roi.impressions.toLocaleString()} views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          <span>{deal.roi.engagement} engagements</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle>ROI Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Total Revenue Generated</span>
                    <span className="text-green-600 font-bold">
                      ${currentClub.deals.reduce((sum, deal) => sum + deal.roi.revenue, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Total Impressions</span>
                    <span className="text-blue-600 font-bold">
                      {currentClub.deals.reduce((sum, deal) => sum + deal.roi.impressions, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium">Average ROI</span>
                    <span className="text-purple-600 font-bold">
                      {currentClub.deals.length > 0
                        ? Math.round(currentClub.deals.reduce((sum, deal) => sum + (deal.roi.revenue / deal.amount), 0) / currentClub.deals.length * 100)
                        : 0}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="matching" className="space-y-6">
          <Card className="p-6">
            <CardHeader className="pb-4">
              <CardTitle>Sponsor Matching</CardTitle>
              <CardDescription>
                AI-powered matching of sponsors with your club based on interests and goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sponsors.filter(s => s.active).map((sponsor) => {
                  const matchScore = Math.floor(Math.random() * 40) + 60; // Mock match score
                  const matchingInterests = sponsor.interests.filter(interest =>
                    ['Technology', 'AI', 'Education', 'Innovation'].includes(interest)
                  );

                  return (
                    <div key={sponsor.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold">
                          {sponsor.logo}
                        </div>
                        <div>
                          <h4 className="font-semibold">{sponsor.name}</h4>
                          <p className="text-sm text-muted-foreground">{sponsor.industry}</p>
                          <div className="flex gap-1 mt-1">
                            {matchingInterests.slice(0, 2).map((interest, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-bold text-green-600">{matchScore}% match</p>
                          <p className="text-sm text-muted-foreground">
                            ${sponsor.budget.toLocaleString()} budget
                          </p>
                        </div>
                        <Button size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SponsorshipManager;
