import { LaffLabApi } from "@/lib/LaffLabApi";
import SimpleHeader from "@/components/ui/lafflab/SimpleHeader";

type ProfilePageProps = {
  params: { username: string };
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = params;
  const profile = await LaffLabApi.getProfile(username);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "12px 12px 32px",
        background: "#05060A",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 600 }}>
        <SimpleHeader title={`@${username}`} />
        <div style={{ marginTop: 20, color: "#FFFFFF" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, #4A1F6A, #FF2F7A)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 20,
              }}
            >
              {username.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 16 }}>
                {profile?.displayName ?? username}
              </div>
              {profile?.bio && (
                <div
                  style={{
                    fontSize: 13,
                    opacity: 0.8,
                    marginTop: 4,
                  }}
                >
                  {profile.bio}
                </div>
              )}
            </div>
          </div>
          {/* Placeholder for user posts or stats later */}
        </div>
      </div>
    </div>
  );
}
