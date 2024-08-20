"use client";

import Image from "next/image";
import styles from "./page.module.css";
import axios from "axios";
import { ICardResponse, IPkmnCard, IPkmnResponse } from "./dataFromApi";
import { get } from "./pkmnTcgApiServices";
import { useState } from "react";
import { SearchModal } from "../components/searchModal";
import { PkmnCard } from "@/components/pkmnCard";

export const Home = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [traderOne, setTraderOne] = useState<IPkmnCard[]>([]);
  const [traderTwo, setTraderTwo] = useState<IPkmnCard[]>([]);
  const [traderToChange, setTraderToChange] = useState<"one" | "two">("one");
  const changeShowModal = () => {
    setShowModal(false);
  };
  const changeTraderOnesCards = (cardToAdd: IPkmnCard) => {
    let newList: IPkmnCard[] = traderOne;
    newList.push(cardToAdd);
    setTraderOne(newList);
  };
  const changeTraderTwosCards = (cardToAdd: IPkmnCard) => {
    let newList: IPkmnCard[] = traderTwo;
    newList.push(cardToAdd);
    setTraderTwo(newList);
  };
  return (
    <main className={styles.main}>
      {showModal && (
        <SearchModal
          searchFor="set"
          changeShowModal={changeShowModal}
          changeTradersCards={
            traderToChange === "one"
              ? changeTraderOnesCards
              : changeTraderTwosCards
          }
        />
      )}
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
              onClick={() => (
                setShowModal(!showModal), setTraderToChange("one")
              )}
            >
              Search
            </button>
          </div>
          <div
            style={{
              width: "90%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              gap: "1rem",
              overflow: "hidden visible",
              height: "90%",
              paddingRight: "0.5rem",
            }}
          >
            {traderOne?.map((card) => {
              return <PkmnCard card={card} cardWidth={"8rem"} />;
            })}
          </div>
        </div>
        <div>arrows</div>
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
              onClick={() => (
                setShowModal(!showModal), setTraderToChange("two")
              )}
            >
              Search
            </button>
          </div>
          <div
            style={{
              width: "90%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              gap: "1rem",
              overflow: "hidden visible",
              height: "90%",
              paddingRight: "0.5rem",
            }}
          >
            {traderTwo?.map((card) => {
              return <PkmnCard card={card} cardWidth={"8rem"} />;
            })}
          </div>
        </div>
      </div>
    </main>
  );
};
export default Home;
