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
  const sumTraderOne = () => {
    let sum = 0;
    traderOne.map((card) => {
      const cardPrice = card.tcgplayer?.prices.normal?.market
        ? card.tcgplayer?.prices.normal?.market
        : card.cardmarket.prices.averageSellPrice
        ? card.cardmarket.prices.averageSellPrice
        : 0;
      sum = sum + cardPrice;
    });
    return sum;
  };
  const sumTraderTwo = () => {
    let sum = 0;
    traderTwo.map((card) => {
      const cardPrice = card.tcgplayer?.prices.normal?.market
        ? card.tcgplayer?.prices.normal?.market
        : card.cardmarket.prices.averageSellPrice
        ? card.cardmarket.prices.averageSellPrice
        : 0;
      sum = sum + cardPrice;
    });
    return sum;
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
              margin: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button
              style={{
                background: "grey",
                color: "white",
                fontWeight: "bold",
                height: "100%",
                margin: "",
                padding: "0.25rem 1rem",
                border: "lightgrey solid 1px",
                cursor: "pointer",
              }}
              onClick={() => (
                setShowModal(!showModal), setTraderToChange("one")
              )}
            >
              Search
            </button>
            <div
              style={{
                color: "white",
                paddingRight: "3rem",
              }}
            >
              <p>Sum: {sumTraderOne()}$</p>
            </div>
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
        <div>
          <div>arrows</div> <div>diff: {sumTraderOne() - sumTraderTwo()}$</div>
        </div>
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
              margin: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button
              style={{
                background: "grey",
                color: "white",
                fontWeight: "bold",
                height: "100%",
                margin: "",
                padding: "0.25rem 1rem",
                border: "lightgrey solid 1px",
                cursor: "pointer",
              }}
              onClick={() => (
                setShowModal(!showModal), setTraderToChange("two")
              )}
            >
              Search
            </button>
            <div
              style={{
                color: "white",
                paddingRight: "3rem",
              }}
            >
              <p>Sum: {sumTraderTwo()}$</p>
            </div>
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
