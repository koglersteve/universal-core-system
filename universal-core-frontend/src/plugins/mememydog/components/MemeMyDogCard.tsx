export default function MemeMyDogCard({ template }: any) {
  return (
    <div className="mememydog-template-card">
      <img
        src={template.preview || "/placeholder/dog.png"}
        className="mememydog-template-img"
        alt={template.name}
      />
      <div style={{ padding: "8px", color: "#fff" }}>{template.name}</div>
    </div>
  );
}
