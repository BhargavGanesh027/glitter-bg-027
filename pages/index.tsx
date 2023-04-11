import Form from "../components/Form";
import Header from "../components/Header";
import PostFeed from "../components/PostFeed";

export default function Home() {
  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's happening ?" />
      <PostFeed />
    </>
  );
}
