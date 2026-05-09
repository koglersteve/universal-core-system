let settings = {
  darkMode: true,
  pushNotifications: false,
  emailAlerts: true,
  creatorMode: false
};

export async function GET() {
  return Response.json(settings);
}

export async function PATCH(req: Request) {
  const body = await req.json();
  settings = { ...settings, ...body };
  return Response.json(settings);
}
