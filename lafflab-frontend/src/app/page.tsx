"use client";

import { useEffect, useState } from "react";
import Feed from "@/components/feed/Feed";

export default function RootPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/feed`)
      .then((res) => res.json())
      .then(setItems);
  }, []);

  return <Feed items={items} />;
}

