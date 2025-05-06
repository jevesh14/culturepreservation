
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, ArrowRight, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator 
} from "@/components/ui/input-otp";
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatWithAI from '../components/ChatWithAI';

const MobileAuth = () => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // This would be replaced with an actual API call in production
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      toast({
        title: "OTP Sent",
        description: `A verification code has been sent to ${phoneNumber}`,
      });
    }, 1000);
  };
  
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit code",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // This would be replaced with an actual API call in production
    setTimeout(() => {
      setIsLoading(false);
      // Simulate successful verification
      toast({
        title: "Verification Successful",
        description: "You have successfully logged in",
      });
      navigate('/');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-12 bg-gray-50">
        <div className="w-full max-w-md p-6 md:p-8 bg-white rounded-2xl shadow-lg border border-cultural-saffron/10">
          {step === 'phone' ? (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-cultural-saffron/10 rounded-full mb-4">
                  <Phone className="h-8 w-8 text-cultural-saffron" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Sign in with Phone</h1>
                <p className="text-gray-600">Enter your phone number to receive a verification code</p>
              </div>
              
              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Input 
                      id="phone"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter your mobile number"
                      className="pl-4 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-cultural-saffron focus:border-cultural-saffron"
                      maxLength={10}
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-cultural-saffron hover:bg-cultural-saffron/90 text-white py-2 rounded-lg flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending OTP...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Send OTP
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-cultural-saffron/10 rounded-full mb-4">
                  <CheckCircle className="h-8 w-8 text-cultural-saffron" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Enter Verification Code</h1>
                <p className="text-gray-600">We've sent a 6-digit code to {phoneNumber}</p>
              </div>
              
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="flex justify-center mb-4">
                  <InputOTP maxLength={6} value={otp} onChange={setOtp} containerClassName="gap-2">
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="border-cultural-saffron/30 focus:border-cultural-saffron" />
                      <InputOTPSlot index={1} className="border-cultural-saffron/30 focus:border-cultural-saffron" />
                      <InputOTPSlot index={2} className="border-cultural-saffron/30 focus:border-cultural-saffron" />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} className="border-cultural-saffron/30 focus:border-cultural-saffron" />
                      <InputOTPSlot index={4} className="border-cultural-saffron/30 focus:border-cultural-saffron" />
                      <InputOTPSlot index={5} className="border-cultural-saffron/30 focus:border-cultural-saffron" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-cultural-saffron hover:bg-cultural-saffron/90 text-white py-2 rounded-lg flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Verify & Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
                
                <div className="text-center">
                  <button 
                    type="button" 
                    onClick={() => setStep('phone')}
                    className="text-cultural-saffron hover:underline text-sm"
                  >
                    Change phone number
                  </button>
                </div>
              </form>
            </>
          )}
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-center text-gray-600">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
      <ChatWithAI />
    </div>
  );
};

export default MobileAuth;
