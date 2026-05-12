export const dynamic = "force-dynamic";

export default async function Component({ params }) {
  return (
    <div className="p-6 text-white">
      <div className="text-xl font-semibold mb-4">Posts</div>
      <div className="text-gray-300">Posts for this user will appear here.</div>
    </div>
  );
}
