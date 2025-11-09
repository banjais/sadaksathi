import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { X, Mail, Smartphone, Shield, User, Crown } from "lucide-react";
import { getTranslation, type LanguageCode } from "../utils/translations";

interface LoginDialogProps {
  currentLanguage: LanguageCode;
  onClose: () => void;
  onLogin: (email: string, otp?: string) => Promise<boolean>;
  isLoading: boolean;
}

export function LoginDialog({ currentLanguage, onClose, onLogin, isLoading }: LoginDialogProps) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [error, setError] = useState("");

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError(getTranslation('emailRequired', currentLanguage) || 'Email is required');
      return;
    }

    // Simulate OTP sending
    setStep("otp");
    setError("");
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setError(getTranslation('otpRequired', currentLanguage) || 'OTP is required');
      return;
    }

    const success = await onLogin(email, otp);
    if (success) {
      onClose();
    } else {
      setError(getTranslation('invalidOtp', currentLanguage) || 'Invalid OTP');
    }
  };

  const demoAccounts = [
    {
      email: 'admin@sadaksathi.np',
      role: 'superadmin',
      name: 'Super Admin',
      icon: Crown,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      email: 'moderator@sadaksathi.np',
      role: 'admin',
      name: 'Admin User',
      icon: Shield,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      email: 'user@example.com',
      role: 'user',
      name: 'Regular User',
      icon: User,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
          <CardHeader className="text-center relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 w-8 h-8 p-0"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
            
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🛣️</span>
            </div>
            
            <CardTitle className="text-xl">
              {getTranslation('login', currentLanguage)}
            </CardTitle>
            <CardDescription>
              {step === "email" 
                ? (getTranslation('enterEmailToLogin', currentLanguage) || 'Enter your email to get started')
                : (getTranslation('enterOtpSent', currentLanguage) || 'Enter the OTP sent to your email')
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {step === "email" ? (
              <>
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {getTranslation('email', currentLanguage) || 'Email'}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="mt-1"
                      disabled={isLoading}
                    />
                  </div>

                  {error && (
                    <div className="text-red-600 text-sm">{error}</div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      getTranslation('sendOtp', currentLanguage) || 'Send OTP'
                    )}
                  </Button>
                </form>

                {/* Demo Accounts */}
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 text-center">
                    {getTranslation('demoAccounts', currentLanguage) || 'Demo Accounts'}
                  </p>
                  <div className="space-y-2">
                    {demoAccounts.map((account) => {
                      const IconComponent = account.icon;
                      return (
                        <motion.button
                          key={account.email}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setEmail(account.email)}
                          className={`w-full p-3 rounded-lg border text-left transition-colors ${account.bgColor} border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 ${account.color}`}>
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-sm">{account.name}</span>
                                <Badge variant="outline" className="text-xs">
                                  {account.role}
                                </Badge>
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">
                                {account.email}
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="otp" className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    {getTranslation('otp', currentLanguage) || 'OTP'}
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="123456"
                    className="mt-1 text-center text-lg tracking-widest"
                    maxLength={6}
                    disabled={isLoading}
                  />
                  <p className="text-xs text-slate-500 mt-1 text-center">
                    {getTranslation('otpSentTo', currentLanguage) || 'OTP sent to'} {email}
                  </p>
                </div>

                {error && (
                  <div className="text-red-600 text-sm text-center">{error}</div>
                )}

                <div className="space-y-2">
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      getTranslation('verifyOtp', currentLanguage) || 'Verify OTP'
                    )}
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="w-full" 
                    onClick={() => {
                      setStep("email");
                      setError("");
                      setOtp("");
                    }}
                    disabled={isLoading}
                  >
                    {getTranslation('backToEmail', currentLanguage) || 'Back to Email'}
                  </Button>
                </div>

                <div className="text-center text-xs text-slate-500 dark:text-slate-400 mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  {getTranslation('demoOtpNote', currentLanguage) || 'For demo: Use any 6-digit OTP (e.g., 123456)'}
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}