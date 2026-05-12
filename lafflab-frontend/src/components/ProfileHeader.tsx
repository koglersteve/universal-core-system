import ProfileHeaderClient from "./ProfileHeaderClient";

export default function Component({ user, editable }) {
  return (
    <ProfileHeaderClient user={user} editable={editable} />
  );
}
