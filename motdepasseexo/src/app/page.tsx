"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [secret, setSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const handleReveal = async () => {
    if (revealed) {
      setRevealed(false);
      setSecret(null);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/secret");
      const data = await res.json();
      setSecret(data.secret);
      setRevealed(true);
    } catch {
      setSecret("Erreur lors du chargement.");
      setRevealed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.heroSection}>
          <div className={styles.lockIcon}>{revealed ? "🔓" : "🔒"}</div>
          <h1 className={styles.title}>Code Secret</h1>
          <p className={styles.subtitle}>
            {revealed
              ? "Ton code a été révélé avec succès !"
              : "Appuie sur le bouton pour révéler ton code secret"}
          </p>

          <button
            className={`${styles.revealBtn} ${revealed ? styles.revealBtnActive : ""}`}
            onClick={handleReveal}
            disabled={loading}
          >
            {loading ? (
              <span className={styles.spinner}></span>
            ) : revealed ? (
              "🙈 Cacher le code"
            ) : (
              "✨ Révéler mon code"
            )}
          </button>

          {secret && (
            <div className={`${styles.secretBox} ${revealed ? styles.secretBoxVisible : ""}`}>
              <p className={styles.secretLabel}>Mon code secret :</p>
              <p className={styles.secretValue}>{secret}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
