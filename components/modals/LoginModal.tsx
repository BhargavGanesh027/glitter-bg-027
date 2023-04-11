import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";
import Input from "../Input";
import Modal from "../Modal";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);

      await signIn("credentials", {
        email,
        password,
      });

      toast.success("Logged In");

      loginModal.onClose();
    } catch (error) {
      console.log("error", error);
      toast.success("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  }, [loginModal, email, password]);

  const onToggle = useCallback(() => {
    if (loading) {
      return;
    }
    loginModal.onClose();
    registerModal.onOpen();
  }, [loading, registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={loading}
      />
      <Input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={loading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Don&apos;t have an account?
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToggle}
        >
          {" Register"}
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      body={bodyContent}
      disabled={loading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign In"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      footer={footerContent}
    />
  );
};

export default LoginModal;
