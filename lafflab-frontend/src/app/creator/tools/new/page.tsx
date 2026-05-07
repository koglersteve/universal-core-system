import NewPostForm from "@components/creator/tools/NewPostForm";
import SectionHeader from "@components/SectionHeader";

export default function NewPostPage() {
  return (
    <div className="p-4 space-y-6">
      <SectionHeader title="New Post" />
      <NewPostForm />
    </div>
  );
}
