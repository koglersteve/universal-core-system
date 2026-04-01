const meme = await prisma.meme.create({
  data: {
    app,
    mood: mood || null,
    title: title || null,
    layers
  }
});

await prisma.memeEvent.create({
  data: {
    memeId: meme.id,
    app,
    mood: mood || null,
    type: "created"
  }
});
