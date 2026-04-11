"use client";

import Link from "next/link";
import React from "react";
import { HoaMemeTemplates } from "./HoaMemeTemplates";

function HoaMemeHome() {
  return (
    <div className="hoa-meme-home">
      <header className="hoa-meme-header">
        <h1 className="hoa-meme-title">HOA Meme</h1>
        <p className="hoa-meme-subtitle">
          Neighborhood drama, HOA chaos, and suburban memes — rendered as emotional artifacts.
        </p>
      </header>

      <section className="hoa-meme-actions">
        <Link href="/hoa-meme/editor" className="hoa-meme-primary-btn">
          Open HOA Meme Editor
        </Link>
      </section>

      <section className="hoa-meme-templates-section">
        <h2 className="hoa-meme-section-title">Starter Situations</h2>
        <HoaMemeTemplates />
      </section>
    </div>
  );
}

export default HoaMemeHome;
