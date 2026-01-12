import AuthForm from "@/components/AuthForm";
import { signIn } from "@/lib/actions/auth-action";

export default function SignInPage() {
  return <AuthForm mode="sign-in" onSubmit={signIn} />;
}
