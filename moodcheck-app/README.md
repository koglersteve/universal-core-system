# MoodCheck App

MoodCheck is a dual-purpose app:

- User-facing: lets the user select a mood and generates a meme/message.
- OS-facing: writes a mood state packet (with timestamp) into the Universal Core so other apps can react.

It supports Hybrid Mode:

- Consumer Mode: OS behavior is invisible, no timestamps shown.
- Demo Mode: shows timestamp and OS packet details for investor/demo clarity.
