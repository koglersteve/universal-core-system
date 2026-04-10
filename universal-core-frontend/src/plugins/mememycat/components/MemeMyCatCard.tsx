export default function MemeMyCatCard({ template }: any) {
  return (
    <div className="mememycat-template-card">
      <img
        src={template.preview || "/placeholder/cat.png"}
        className="mememycat-template-img"
        alt={template.name}
      />
      <div style={{ padding: "8px", color: "#fff" }}>{template.name}</div>
    </div>
  );
}
