import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useCurrentUser from "../../hooks/useCurrentUser";
import useEditModal from "../../hooks/useEditModal";
import useUser from "../../hooks/useUser";
import ImageUpload from "../ImageUpload";
import Input from "../Input";
import Modal from "../Modal";

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const editModal = useEditModal();
  const [profileImage, setProfileImage] = useState<string>();
  const [coverImage, setCoverImage] = useState<string>();
  const [name, setName] = useState<string>();
  const [username, setUserName] = useState<string>();
  const [bio, setBio] = useState<string>();

  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUserName(currentUser?.username);
    setBio(currentUser?.bio);
  }, [
    currentUser?.profileImage,
    currentUser?.coverImage,
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.patch("/api/edit", {
        name,
        username,
        profileImage,
        coverImage,
        bio,
      });
      mutateFetchedUser();
      toast.success("Updated");
      setIsLoading(false);
      editModal.onClose();
    } catch (error) {
      toast.error("Something Went Wrong");
      setIsLoading(false);
    }
  }, [
    bio,
    name,
    username,
    profileImage,
    coverImage,
    editModal,
    mutateFetchedUser,
  ]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => {
          setProfileImage(image);
        }}
        label={"Upload Profile Image"}
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => {
          setCoverImage(image);
        }}
        label={"Upload Cover Image"}
      />
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        type="text"
        disabled={isLoading}
      />
      <Input
        value={username}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="User name"
        type="text"
        disabled={isLoading}
      />
      <Input
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Bio"
        type="text"
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      actionLabel="Save"
      title="Edit Your Profile"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;
