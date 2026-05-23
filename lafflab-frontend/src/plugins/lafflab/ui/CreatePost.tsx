import React from "react";
import { PostComposer } from "./PostComposer";

type Props = {
  onPostCreated?: () => void;
};

export const CreatePost: React.FC<Props> = ({ onPostCreated }) => {
  return (
    <div style={{ marginBottom: 16 }}>
      <PostComposer onPostCreated={onPostCreated} />
    </div>
  );
};
