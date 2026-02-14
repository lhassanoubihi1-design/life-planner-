
import React, { useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  User,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../services/firebase';

const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationMode, setVerificationMode] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendStatus, setResendStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Temporary state to hold the user object for resending the verification email
  const [tempUser, setTempUser] = useState<User | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    setResendStatus('idle');

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        
        // Temporarily store user object before signing out
        setTempUser(userCredential.user);
        setVerificationEmail(email);
        setVerificationMode(true);
        await signOut(auth);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (!userCredential.user.emailVerified) {
          // Temporarily store user object before signing out to block access
          setTempUser(userCredential.user);
          setVerificationEmail(email);
          setVerificationMode(true);
          await signOut(auth);
        }
      }
    } catch (err: any) {
      if (isSignUp && err.code === 'auth/email-already-in-use') {
        setError("User already exists. Please sign in");
      } else if (!isSignUp && (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-email')) {
        setError("Email or password is incorrect");
      } else {
        setError(err.message || "An authentication error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setIsLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, provider);
      // onAuthStateChanged will handle the rest
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(err.message || "Could not sign in with Google.");
      }
    } finally {
      setIsLoading(false);
    }
  };


  const handleResendEmail = async () => {
    if (!tempUser) {
      setError("Could not find user details. Please try logging in again.");
      setResendStatus('error');
      return;
    }

    setResendLoading(true);
    setResendStatus('idle');

    try {
      await sendEmailVerification(tempUser);
      setResendStatus('success');
    } catch (error) {
      console.error("Resend verification error:", error);
      setError("Failed to resend email. Please try logging in again.");
      setResendStatus('error');
    } finally {
      setResendLoading(false);
    }
  };

  if (verificationMode) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-slate-100">
        <div className="w-full max-w-[440px] bg-white rounded-[32px] shadow-2xl overflow-hidden relative border border-slate-200 text-center animate-in fade-in zoom-in-95 duration-300">
          <button 
            onClick={() => {
              setVerificationMode(false);
              setTempUser(null);
            }}
            className="absolute top-6 right-6 text-slate-300 hover:text-slate-500 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="px-10 pt-12 pb-10">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-[#e6fcf5] rounded-full flex items-center justify-center text-emerald-600">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            <h1 className="text-[26px] font-bold text-slate-900 mb-3 tracking-tight font-outfit">Verify your email</h1>
            
            <div className="text-slate-500 text-[15px] leading-relaxed mb-6 px-4">
              <p>We have sent a verification email to</p>
              <p className="font-bold text-slate-700 break-all my-0.5">{verificationEmail}.</p>
              <p>Please verify it and log in.</p>
            </div>

            {resendStatus === 'success' && (
              <div className="mb-6 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-700 text-xs font-bold animate-in fade-in duration-300">
                Verification email resent successfully!
              </div>
            )}

            <div className="space-y-3">
              <button 
                onClick={() => {
                  setVerificationMode(false);
                  setIsSignUp(false);
                  setError(null);
                  setTempUser(null);
                }}
                className="w-full py-4 bg-[#121826] text-white rounded-[18px] font-bold text-base hover:bg-slate-800 active:scale-[0.98] transition-all shadow-lg"
              >
                Log In
              </button>

              <button 
                disabled={resendLoading}
                onClick={handleResendEmail}
                className="w-full py-3 text-emerald-600 font-bold text-sm hover:text-emerald-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {resendLoading ? (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : 'Resend verification email'}
              </button>
            </div>
          </div>
          
          <div className="bg-slate-50 border-t border-slate-100 px-8 py-5 text-center">
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
              Didn't see the email? Please check your spam folder or try resending.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-100">
      <div className="w-full max-w-[440px] bg-white rounded-[32px] shadow-2xl overflow-hidden relative border border-slate-200">
        <div className="px-8 pt-10 pb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2 font-outfit">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-slate-500 text-sm">
              Enter your credentials to access your planner.
            </p>
          </div>

          <div className="flex border-b border-slate-100 mb-8">
            <button 
              onClick={() => { setIsSignUp(false); setError(null); }}
              className={`flex-1 pb-3 text-sm font-semibold transition-all relative ${!isSignUp ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Sign In
              {!isSignUp && <div className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-emerald-600 rounded-full"></div>}
            </button>
            <button 
              onClick={() => { setIsSignUp(true); setError(null); }}
              className={`flex-1 pb-3 text-sm font-semibold transition-all relative ${isSignUp ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Sign Up
              {isSignUp && <div className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-emerald-600 rounded-full"></div>}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="email">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input 
                  required
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="password">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input 
                  required
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-medium text-center">
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold text-base hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (isSignUp ? 'Sign Up' : 'Sign In')}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-4 text-xs font-semibold text-slate-400 uppercase">OR</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <button 
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full py-3.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-base hover:bg-slate-50 active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-3 disabled:opacity-70"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
              <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.223 0-9.657-3.657-11.303-8H6.306C9.656 39.663 16.318 44 24 44z"></path>
              {/* Fix: Removed invalid sentinel text that was breaking JSX parsing. */}
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C43.021 36.697 44 34 44 31c0-5.202-2.583-9.74-6.389-12.833L37.611 20z"></path>
            </svg>
            Continue with Google
          </button>
        </div>

        <div className="bg-slate-50 border-t border-slate-100 px-8 py-6 text-center">
          <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
            By continuing, you agree to our <a href="#" className="text-emerald-600 hover:underline font-semibold">Terms of Service</a> and <a href="#" className="text-emerald-600 hover:underline font-semibold">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;