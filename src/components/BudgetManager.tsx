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
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  Minus,
  Target,
  PieChart,
  Calendar,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Receipt,
  CreditCard,
  Banknote,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  BarChart3,
  Settings,
  Download,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2,
  Palette
} from "lucide-react";

interface BudgetItem {
  id: string;
  type: 'income' | 'expense';
  category: string;
  description: string;
  amount: number;
  date: string;
  club: string;
  approved: boolean;
  receipt?: string;
  tags: string[];
}

interface BudgetCategory {
  id: string;
  name: string;
  budgeted: number;
  spent: number;
  color: string;
  icon: string;
}

interface ClubBudget {
  clubId: string;
  clubName: string;
  totalBudget: number;
  spent: number;
  remaining: number;
  monthlyLimit: number;
  categories: BudgetCategory[];
  transactions: BudgetItem[];
}

const BudgetManager = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedClub, setSelectedClub] = useState("cs-club");
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Mock data for demonstration - Fresh start for new platform
  const [clubBudgets, setClubBudgets] = useState<ClubBudget[]>([
    {
      clubId: "cs-club",
      clubName: "Computer Science Club",
      totalBudget: 0,
      spent: 0,
      remaining: 0,
      monthlyLimit: 500,
      categories: [
        { id: "1", name: "Events", budgeted: 0, spent: 0, color: "bg-blue-500", icon: "Calendar" },
        { id: "2", name: "Equipment", budgeted: 0, spent: 0, color: "bg-green-500", icon: "Settings" },
        { id: "3", name: "Workshops", budgeted: 0, spent: 0, color: "bg-purple-500", icon: "Users" },
        { id: "4", name: "Marketing", budgeted: 0, spent: 0, color: "bg-orange-500", icon: "BarChart3" },
        { id: "5", name: "Miscellaneous", budgeted: 0, spent: 0, color: "bg-gray-500", icon: "FileText" }
      ],
      transactions: []
    },
    {
      clubId: "art-club",
      clubName: "Digital Arts Club",
      totalBudget: 0,
      spent: 0,
      remaining: 0,
      monthlyLimit: 300,
      categories: [
        { id: "6", name: "Art Supplies", budgeted: 0, spent: 0, color: "bg-pink-500", icon: "Palette" },
        { id: "7", name: "Exhibitions", budgeted: 0, spent: 0, color: "bg-indigo-500", icon: "Eye" },
        { id: "8", name: "Software", budgeted: 0, spent: 0, color: "bg-cyan-500", icon: "Settings" },
        { id: "9", name: "Marketing", budgeted: 0, spent: 0, color: "bg-orange-500", icon: "BarChart3" }
      ],
      transactions: []
    }
  ]);

  const [newTransaction, setNewTransaction] = useState({
    type: 'expense' as 'income' | 'expense',
    category: '',
    description: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    receipt: '',
    tags: [] as string[]
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const currentBudget = clubBudgets.find(budget => budget.clubId === selectedClub);
  const filteredTransactions = currentBudget?.transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || transaction.type === filterType;
    return matchesSearch && matchesType;
  }) || [];

  const handleAddTransaction = () => {
    if (!currentBudget || !newTransaction.description || !newTransaction.amount) return;

    const transaction: BudgetItem = {
      id: Date.now().toString(),
      ...newTransaction,
      club: currentBudget.clubName,
      approved: false
    };

    setClubBudgets(prev => prev.map(budget =>
      budget.clubId === selectedClub
        ? {
            ...budget,
            transactions: [...budget.transactions, transaction],
            spent: budget.spent + (transaction.type === 'expense' ? transaction.amount : 0),
            remaining: budget.remaining - (transaction.type === 'expense' ? transaction.amount : 0)
          }
        : budget
    ));

    setNewTransaction({
      type: 'expense',
      category: '',
      description: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      receipt: '',
      tags: []
    });
    setShowAddTransaction(false);
  };

  const getBudgetStatus = (budget: ClubBudget) => {
    const percentage = (budget.spent / budget.totalBudget) * 100;
    if (percentage < 50) return { status: 'Good', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (percentage < 80) return { status: 'Warning', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { status: 'Critical', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const getCategoryIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Calendar, Settings, Users, BarChart3, Palette, Eye, FileText
    };
    return icons[iconName] || FileText;
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

  if (!currentBudget) return null;

  const budgetStatus = getBudgetStatus(currentBudget);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Wallet className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Budget Manager</h2>
            <p className="text-muted-foreground">Manage club finances and track expenses</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Select value={selectedClub} onValueChange={setSelectedClub}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {clubBudgets.map(budget => (
                <SelectItem key={budget.clubId} value={budget.clubId}>
                  {budget.clubName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog open={showAddTransaction} onOpenChange={setShowAddTransaction}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Transaction</DialogTitle>
                <DialogDescription>
                  Record income or expense for {currentBudget.clubName}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select value={newTransaction.type} onValueChange={(value: 'income' | 'expense') =>
                      setNewTransaction(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="amount">Amount (₹)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={newTransaction.category} onValueChange={(value) =>
                    setNewTransaction(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentBudget.categories.map(category => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Transaction description"
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newTransaction.date}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowAddTransaction(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleAddTransaction} className="flex-1">
                    Add Transaction
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Budget Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Budget</p>
              <p className="text-2xl font-bold">${currentBudget.totalBudget.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <ArrowDownRight className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <p className="text-2xl font-bold">${currentBudget.spent.toLocaleString()}</p>
              <p className="text-xs text-red-600">
                {((currentBudget.spent / currentBudget.totalBudget) * 100).toFixed(1)}% of budget
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <ArrowUpRight className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Remaining</p>
              <p className="text-2xl font-bold">${currentBudget.remaining.toLocaleString()}</p>
              <p className="text-xs text-green-600">
                {((currentBudget.remaining / currentBudget.totalBudget) * 100).toFixed(1)}% available
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${budgetStatus.bgColor}`}>
              <Target className={`h-5 w-5 ${budgetStatus.color}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Budget Status</p>
              <p className={`text-lg font-bold ${budgetStatus.color}`}>
                {budgetStatus.status}
              </p>
              <Progress
                value={(currentBudget.spent / currentBudget.totalBudget) * 100}
                className="h-2 mt-1"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Budget by Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentBudget.categories.map((category) => {
                    const IconComponent = getCategoryIcon(category.icon);
                    const percentage = (category.spent / category.budgeted) * 100;
                    const remaining = category.budgeted - category.spent;

                    return (
                      <div key={category.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                            <IconComponent className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{category.name}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              ${category.spent.toLocaleString()} / ${category.budgeted.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              ${remaining.toLocaleString()} remaining
                            </p>
                          </div>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Monthly Spending Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Monthly Spending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { month: 'Dec 2024', spent: 1200, budget: 2000 },
                    { month: 'Nov 2024', spent: 1800, budget: 2000 },
                    { month: 'Oct 2024', spent: 950, budget: 2000 },
                    { month: 'Sep 2024', spent: 1600, budget: 2000 }
                  ].map((item) => {
                    const percentage = (item.spent / item.budget) * 100;
                    return (
                      <div key={item.month} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item.month}</span>
                          <span className="text-sm text-muted-foreground">
                            ${item.spent} / ${item.budget}
                          </span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentBudget.categories.map((category) => {
              const IconComponent = getCategoryIcon(category.icon);
              const percentage = (category.spent / category.budgeted) * 100;
              const remaining = category.budgeted - category.spent;

              return (
                <Card key={category.id} className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${category.color} bg-opacity-10`}>
                      <IconComponent className={`h-5 w-5 ${category.color.replace('bg-', 'text-')}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${category.spent.toLocaleString()} / ${category.budgeted.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Progress value={percentage} className="mb-2" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {percentage.toFixed(1)}% used
                    </span>
                    <span className="font-medium">
                      ${remaining.toLocaleString()} left
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          {/* Filters */}
          <Card className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Transactions</SelectItem>
                  <SelectItem value="income">Income Only</SelectItem>
                  <SelectItem value="expense">Expenses Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Transactions List */}
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <Card key={transaction.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      transaction.type === 'income'
                        ? 'bg-green-100'
                        : 'bg-red-100'
                    }`}>
                      {transaction.type === 'income' ? (
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{transaction.category}</span>
                        <span>•</span>
                        <span>{transaction.date}</span>
                        <span>•</span>
                        <Badge variant={transaction.approved ? "default" : "secondary"} className="text-xs">
                          {transaction.approved ? "Approved" : "Pending"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`font-bold ${
                      transaction.type === 'income'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </span>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle>Budget vs Actual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentBudget.categories.map((category) => (
                    <div key={category.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{category.name}</span>
                        <span className="text-sm text-muted-foreground">
                          ${category.spent} / ${category.budgeted}
                        </span>
                      </div>
                      <Progress
                        value={(category.spent / category.budgeted) * 100}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle>Spending Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Largest Expense</span>
                    <span className="text-blue-600 font-bold">
                      ${Math.max(...currentBudget.transactions
                        .filter(t => t.type === 'expense')
                        .map(t => t.amount)
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Total Income</span>
                    <span className="text-green-600 font-bold">
                      ${currentBudget.transactions
                        .filter(t => t.type === 'income')
                        .reduce((sum, t) => sum + t.amount, 0)
                        .toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <span className="font-medium">Pending Approvals</span>
                    <span className="text-orange-600 font-bold">
                      {currentBudget.transactions.filter(t => !t.approved).length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BudgetManager;
