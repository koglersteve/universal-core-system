cat > src/app/api/notifications/route.ts << 'EOF'
// src/app/api/notifications/route.ts

import { NextResponse } from "next/server";
import { getNotifications } from "@/core/notifications/engine";

export async function GET() {
  const items = getNotifications();
  return NextResponse.json({ items });
}
EOF
