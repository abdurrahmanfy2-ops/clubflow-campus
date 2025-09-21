import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { GraduationCap, Mail, Lock, User, Building2, Users } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    college: ""
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--campus-navy))] via-[hsl(220,26%,18%)] to-[hsl(var(--campus-navy))]" style={{
      backgroundImage: `
        radial-gradient(circle at 20% 50%, hsl(var(--campus-green))/0.15 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, hsl(var(--campus-green))/0.12 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, hsl(var(--campus-green))/0.08 0%, transparent 50%),
        radial-gradient(circle at 60% 30%, hsl(var(--campus-green))/0.06 0%, transparent 50%)
      `,
      backgroundSize: '800px 800px, 600px 600px, 900px 900px, 700px 700px',
      backgroundPosition: '0% 0%, 100% 0%, 50% 100%, 30% 70%',
      transform: 'perspective(1200px)',
      transformStyle: 'preserve-3d'
    }}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(76, 175, 80, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(76, 175, 80, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-[hsl(var(--campus-green))]/10 rounded-full blur-xl animate-breathe-dramatic"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-[hsl(var(--campus-green))]/15 rounded-full blur-lg animate-breathe-dramatic" style={{animationDelay: '0s'}}></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-[hsl(var(--campus-green))]/20 rounded-full blur-md animate-breathe-dramatic" style={{animationDelay: '0s'}}></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="flex items-center justify-center mb-4 group">
              <div className="bg-primary text-primary-foreground p-3 rounded-full group-hover:bg-primary/90 transition-colors">
                <Users className="h-8 w-8" />
              </div>
            </Link>
            <h1 className="text-3xl font-bold text-foreground">Join CampBuzz</h1>
            <p className="text-muted-foreground mt-2">Create your account to get started</p>
          </div>

        <Card className="shadow-elegant" style={{
          boxShadow: `
            0 25px 50px -12px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 8px 32px rgba(76, 175, 80, 0.1)
          `,
          transform: 'perspective(1000px) rotateX(2deg)',
          transformStyle: 'preserve-3d'
        }}>
          <CardHeader>
            <CardTitle className="text-white">Create Account</CardTitle>
            <CardDescription className="text-gray-300">Fill in your details to join the community</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-[hsl(var(--campus-green))] focus:ring-[hsl(var(--campus-green))]/20 transition-all duration-300 hover:bg-white/15 focus:bg-white/15"
                    style={{
                      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1)',
                      transform: 'perspective(1000px) rotateX(1deg)',
                      transformStyle: 'preserve-3d'
                    }}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@college.edu"
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-[hsl(var(--campus-green))] focus:ring-[hsl(var(--campus-green))]/20 transition-all duration-300 hover:bg-white/15 focus:bg-white/15"
                    style={{
                      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1)',
                      transform: 'perspective(1000px) rotateX(1deg)',
                      transformStyle: 'preserve-3d'
                    }}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="college">College</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="college"
                    placeholder="Your College Name"
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-[hsl(var(--campus-green))] focus:ring-[hsl(var(--campus-green))]/20 transition-all duration-300 hover:bg-white/15 focus:bg-white/15"
                    style={{
                      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1)',
                      transform: 'perspective(1000px) rotateX(1deg)',
                      transformStyle: 'preserve-3d'
                    }}
                    value={formData.college}
                    onChange={(e) => setFormData({...formData, college: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select onValueChange={(value) => setFormData({...formData, role: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="club_admin">Club Admin</SelectItem>
                    <SelectItem value="college_admin">College Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-[hsl(var(--campus-green))] focus:ring-[hsl(var(--campus-green))]/20 transition-all duration-300 hover:bg-white/15 focus:bg-white/15"
                    style={{
                      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1)',
                      transform: 'perspective(1000px) rotateX(1deg)',
                      transformStyle: 'preserve-3d'
                    }}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-[hsl(var(--campus-green))] focus:ring-[hsl(var(--campus-green))]/20 transition-all duration-300 hover:bg-white/15 focus:bg-white/15"
                    style={{
                      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1)',
                      transform: 'perspective(1000px) rotateX(1deg)',
                      transformStyle: 'preserve-3d'
                    }}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[hsl(var(--campus-green))] hover:bg-[hsl(var(--campus-green))]/90 text-[hsl(var(--campus-navy))] font-semibold py-3 text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  boxShadow: `
                    0 10px 25px -5px hsl(var(--campus-green)),
                    0 4px 12px -2px rgba(76, 175, 80, 0.3),
                    inset 0 1px 0 hsl(45, 100%, 70%),
                    0 0 0 1px rgba(255, 255, 255, 0.1)
                  `,
                  transform: 'perspective(1000px) rotateX(-2deg)',
                  transformStyle: 'preserve-3d'
                }}
              >
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link to="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </div>

            <div className="mt-4 text-center">
              <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors">
                Skip for now
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
