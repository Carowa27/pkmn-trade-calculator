"use client";

import Image from "next/image";
import styles from "./page.module.css";
import axios from "axios";
import { ICardResponse, IPkmnCard, IPkmnResponse } from "./dataFromApi";
import { get } from "./pkmnTcgApiServices";
import { useState } from "react";
import { SearchModal } from "../components/searchModal";

export const Home = () => {
  const [showSetModal, setShowSetModal] = useState<boolean>(false);
  return (
    <main className={styles.main}>
      {showSetModal && <SearchModal />}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <div
          style={{
            border: "2px solid darkgreen",
            width: "45vw",
            height: "80vh",
          }}
        >
          <div
            style={{
              width: "",
              height: "2rem",
              margin: "1rem 1rem 0 1rem",
            }}
          >
            <button
              style={{
                background: "white",
                color: "black",
                height: "80px",
                width: "80px",
                margin: "",
                padding: "0.25rem 1rem",
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={() => setShowSetModal(!showSetModal)}
            >
              Search
            </button>
          </div>
          {/* imgs */}
        </div>
        <div>arrows</div>
        <div
          style={{
            border: "2px solid darkgreen",
            width: "45vw",
            height: "80vh",
          }}
        >
          {/* imgs */}
        </div>
      </div>
    </main>
  );
};
export default Home;
