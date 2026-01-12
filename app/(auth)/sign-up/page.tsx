import AuthForm from "@/components/AuthForm";
import { signUp } from "@/lib/actions/auth-action";

export default function SignUpPage() {
  return <AuthForm mode="sign-up" onSubmit={signUp} />;
}
