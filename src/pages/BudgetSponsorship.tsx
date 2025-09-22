import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BudgetManager from "@/components/BudgetManager";
import SponsorshipManager from "@/components/SponsorshipManager";
import {
  Wallet,
  Handshake,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  BarChart3,
  Calendar,
  Building2,
  Award,
  PieChart,
  Activity,
  Settings,
  Download,
  Plus
} from "lucide-react";

const BudgetSponsorship = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg">
                <Wallet className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Budget & Sponsorship Manager</h1>
                <p className="text-muted-foreground">
                  Comprehensive financial management and sponsorship platform for Campbuzz
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Reports
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Quick Actions
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview Dashboard
            </TabsTrigger>
            <TabsTrigger value="management" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Management Tools
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Summary Cards - Fresh start values */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Budget</p>
                    <p className="text-2xl font-bold">$0</p>
                    <p className="text-xs text-muted-foreground">Ready to set up</p>
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
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-xs text-muted-foreground">Start connecting</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Funds Raised</p>
                    <p className="text-2xl font-bold">$0</p>
                    <p className="text-xs text-muted-foreground">Getting started</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Target className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <p className="text-2xl font-bold">0%</p>
                    <p className="text-xs text-muted-foreground">Fresh platform</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Charts and Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Budget Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Events", amount: 12000, percentage: 32, color: "bg-blue-500" },
                      { name: "Equipment", amount: 8000, percentage: 22, color: "bg-green-500" },
                      { name: "Workshops", amount: 6000, percentage: 16, color: "bg-purple-500" },
                      { name: "Marketing", amount: 4000, percentage: 11, color: "bg-orange-500" },
                      { name: "Operations", amount: 7000, percentage: 19, color: "bg-gray-500" }
                    ].map((item) => (
                      <div key={item.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">${item.amount.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">{item.percentage}%</p>
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${item.color}`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Sponsorship Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { sponsor: "TechCorp Solutions", amount: 10000, roi: 25000, status: "active" },
                      { sponsor: "Green Energy Inc", amount: 5000, roi: 12000, status: "pending" },
                      { sponsor: "Creative Design Studio", amount: 3000, roi: 8000, status: "active" },
                      { sponsor: "EduSoft Systems", amount: 7000, roi: 15000, status: "active" }
                    ].map((item) => (
                      <div key={item.sponsor} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{item.sponsor}</p>
                          <p className="text-sm text-muted-foreground">
                            ${item.amount.toLocaleString()} investment
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">
                            ${item.roi.toLocaleString()}
                          </p>
                          <Badge
                            variant={item.status === 'active' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {item.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      type: "income",
                      description: "New sponsorship deal with TechCorp Solutions",
                      amount: 10000,
                      date: "2024-12-20",
                      club: "Computer Science Club"
                    },
                    {
                      type: "expense",
                      description: "Equipment purchase for workshops",
                      amount: 1800,
                      date: "2024-12-18",
                      club: "Computer Science Club"
                    },
                    {
                      type: "income",
                      description: "Grant received from University Foundation",
                      amount: 3000,
                      date: "2024-12-15",
                      club: "Digital Arts Club"
                    },
                    {
                      type: "expense",
                      description: "Event catering for Tech Talk 2024",
                      amount: 450,
                      date: "2024-12-12",
                      club: "Computer Science Club"
                    }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          activity.type === 'income'
                            ? 'bg-green-100'
                            : 'bg-red-100'
                        }`}>
                          {activity.type === 'income' ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{activity.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.club} • {activity.date}
                          </p>
                        </div>
                      </div>
                      <div className={`font-bold ${
                        activity.type === 'income'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}>
                        {activity.type === 'income' ? '+' : '-'}${activity.amount.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="management" className="space-y-6">
            <Tabs defaultValue="budget" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="budget" className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  Budget Management
                </TabsTrigger>
                <TabsTrigger value="sponsorship" className="flex items-center gap-2">
                  <Handshake className="h-4 w-4" />
                  Sponsorship Management
                </TabsTrigger>
              </TabsList>

              <TabsContent value="budget" className="mt-6">
                <BudgetManager />
              </TabsContent>

              <TabsContent value="sponsorship" className="mt-6">
                <SponsorshipManager />
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BudgetSponsorship;
