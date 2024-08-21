"use client";

import styles from "./page.module.css";
import { IPkmnCard } from "./dataFromApi";
import { useEffect, useState } from "react";
import { SearchModal } from "../components/searchModal";
import { PkmnCard } from "@/components/pkmnCard";
import { ArrowLeftRight } from "react-bootstrap-icons";

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
    sessionStorage.setItem("tr1", JSON.stringify(traderOne));
  };
  const changeTraderTwosCards = (cardToAdd: IPkmnCard) => {
    let newList: IPkmnCard[] = traderTwo;
    newList.push(cardToAdd);
    setTraderTwo(newList);
    sessionStorage.setItem("tr2", JSON.stringify(traderTwo));
  };
  const clearTraderCards = () => {
    sessionStorage.clear;
    setTraderOne([]);
    setTraderTwo([]);
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
  useEffect(() => {
    if (sessionStorage.getItem("tr1") !== null) {
      setTraderOne(JSON.parse(sessionStorage.getItem("tr1")!));
    }
    if (sessionStorage.getItem("tr2") !== null) {
      setTraderTwo(JSON.parse(sessionStorage.getItem("tr2")!));
    }
  }, []);
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
            border: `2px solid ${
              sumTraderOne() === sumTraderTwo()
                ? "darkgreen"
                : sumTraderOne() > sumTraderTwo()
                ? "darkorange"
                : "darkred"
            }`,
            borderRadius: "10px",
            width: "45vw",
            height: "80vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
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
                fontSize: "large",
                height: "100%",
                margin: "",
                marginLeft: "1rem",
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
              <p>Sum: {(Math.round(sumTraderOne() * 100) / 100).toFixed(2)}$</p>
            </div>
          </div>
          <div
            style={{
              width: "95%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              gap: "1rem",
              overflow: "hidden visible",
              height: "90%",
              paddingRight: "0.5rem",
            }}
          >
            {traderOne?.map((card, i) => {
              return (
                <PkmnCard
                  card={card}
                  cardWidth={"8rem"}
                  key={card.id + "-" + i}
                />
              );
            })}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <ArrowLeftRight size={40} />
          </div>
          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            diff:{" "}
            {(Math.round(sumTraderOne() - sumTraderTwo() * 100) / 100).toFixed(
              2
            )}
            $
          </p>
        </div>
        <div
          style={{
            border: `2px solid ${
              sumTraderOne() === sumTraderTwo()
                ? "darkgreen"
                : sumTraderOne() < sumTraderTwo()
                ? "darkorange"
                : "darkred"
            }`,
            borderRadius: "10px",
            width: "45vw",
            height: "80vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
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
                fontSize: "large",
                height: "100%",
                margin: "",
                marginLeft: "1rem",
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
              <p>Sum: {(Math.round(sumTraderTwo() * 100) / 100).toFixed(2)}$</p>
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
            {traderTwo?.map((card, i) => {
              return (
                <PkmnCard
                  card={card}
                  cardWidth={"8rem"}
                  key={card.id + "-" + i}
                />
              );
            })}
          </div>
        </div>
      </div>
      <button
        style={{
          background: "grey",
          color: "white",
          fontWeight: "bold",
          fontSize: "large",
          height: "100%",
          margin: "1rem 2rem",
          padding: "0.25rem 1rem",
          border: "lightgrey solid 1px",
          cursor: "pointer",
        }}
        onClick={() => clearTraderCards()}
      >
        Clear all cards
      </button>
    </main>
  );
};
export default Home;
