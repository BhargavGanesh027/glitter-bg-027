import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";
import CommentFeed from "../../components/CommentFeed";
import Form from "../../components/Form";
import Header from "../../components/Header";
import PostItem from "../../components/PostItem";
import usePost from "../../hooks/usePost";

const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;
  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header label="Tweet" showBackArrow />
      <PostItem data={fetchedPost} />
      <Form postId={postId as string} placeholder="Tweet your reply" />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  );
};

export default PostView;
