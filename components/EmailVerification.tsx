import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { Mail, CheckCircle, Loader2, ArrowLeft } from 'lucide-react';

interface Props {
  email: string;
  onBackToLogin: () => void;
}

const EmailVerification: React.FC<Props> = ({ email, onBackToLogin }) => {
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  const handleResendEmail = async () => {
    setResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) throw error;
      setResent(true);
      setTimeout(() => setResent(false), 3000);
    } catch (err) {
      console.error('Erro ao reenviar email:', err);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="glass-panel rounded-3xl p-8 shadow-2xl border border-white/60">
          <div className="flex flex-col items-center text-center">
            <div className="h-20 w-20 rounded-3xl bg-brand-teal/15 flex items-center justify-center mb-6">
              <Mail className="w-10 h-10 text-brand-teal" />
            </div>

            <h1 className="text-3xl font-semibold text-brand-navy font-display mb-3">
              Verifique seu email
            </h1>

            <p className="text-brand-navy/70 mb-2">
              Enviamos um link de confirmação para:
            </p>

            <p className="text-brand-navy font-semibold text-lg mb-6">
              {email}
            </p>

            <div className="bg-brand-teal/10 border border-brand-teal/30 rounded-2xl p-4 mb-6 w-full">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                <div className="text-left text-sm text-brand-navy/80">
                  <p className="font-medium mb-1">O que fazer agora:</p>
                  <ol className="list-decimal list-inside space-y-1 text-brand-navy/70">
                    <li>Abra seu email</li>
                    <li>Clique no link de confirmação</li>
                    <li>Você será redirecionado automaticamente para o app</li>
                  </ol>
                </div>
              </div>
            </div>

            <p className="text-sm text-brand-navy/60 mb-6">
              Não recebeu o email? Verifique sua caixa de spam ou lixo eletrônico.
            </p>

            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={handleResendEmail}
                disabled={resending || resent}
                className="w-full bg-brand-teal/10 text-brand-teal font-medium py-3 rounded-xl border border-brand-teal/30 transition duration-200 flex items-center justify-center gap-2 hover:bg-brand-teal/20 disabled:opacity-50"
              >
                {resending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : resent ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Email reenviado!
                  </>
                ) : (
                  'Reenviar email de confirmação'
                )}
              </button>

              <button
                onClick={onBackToLogin}
                className="w-full text-brand-navy/60 font-medium py-3 rounded-xl transition duration-200 flex items-center justify-center gap-2 hover:text-brand-navy hover:bg-brand-navy/5"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar para login
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-brand-navy/50">
            Problemas com o email? Entre em contato com o suporte.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
