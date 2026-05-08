import CreateForm from "@/components/forms/CreateForm";

export default function NewPostForm() {
  return (
    <div className="p-4 text-white">
      <h1 className="text-xl font-semibold mb-4">New Post</h1>
      <CreateForm />
    </div>
  );
}
