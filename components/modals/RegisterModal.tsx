import axios from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";
import Input from "../Input";
import Modal from "../Modal";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [name, setName] = useState<string>();
  const [userName, setUserName] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);

      await axios.post("/api/register", {
        email,
        password,
        userName,
        name,
      });

      toast.success("Account Created");

      signIn("credentials", {
        email,
        password,
      });

      registerModal.onClose();
    } catch (error) {
      console.log("error", error);
      toast.error("Something Went Wrong.");
    } finally {
      setLoading(false);
    }
  }, [registerModal, email, password, userName, name]);

  const onToggle = useCallback(() => {
    if (loading) {
      return;
    }
    registerModal.onClose();
    loginModal.onOpen();
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
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={loading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
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
        Already have an account?
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToggle}
        >
          {" "}
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      body={bodyContent}
      disabled={loading}
      isOpen={registerModal.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
