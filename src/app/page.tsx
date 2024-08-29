"use client";

import styles from "./page.module.css";
import { IPkmnCard } from "./dataFromApi";
import { useEffect, useState } from "react";
import { SearchModal } from "../components/searchModal";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
} from "react-bootstrap-icons";
import { NotificationWindow } from "@/components/Notification";
import { windowSize } from "@/functions/windowSizes";
import { Header, TradersMat } from "@/components/Containers";
import { PrimaryButton } from "@/components/Buttons";

export const Home = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] =
    useState<string>("lorem");
  const [traderOne, setTraderOne] = useState<IPkmnCard[]>([]);
  const [traderTwo, setTraderTwo] = useState<IPkmnCard[]>([]);
  const [diffSum, setDiffSum] = useState<string>("");
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
    setDiffSum("0");
  };
  const closeNotification = () => {
    setShowNotification(false);
  };
  const changeNotificationMessage = (message: string) => {
    setNotificationMessage(message);
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
  useEffect(() => {
    const diff = (Math.round((sumTraderOne() - sumTraderTwo()) * 100) / 100)
      .toFixed(2)
      .replaceAll("-", "");
    setDiffSum(diff);
  }, [showModal, traderOne, traderTwo]);
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
      }}
    >
      <Header clearAllCards={clearTraderCards} />
      {showNotification && (
        <NotificationWindow
          closeNotification={closeNotification}
          notificationMessage={notificationMessage}
        />
      )}
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
      <div
        style={{
          height: `${windowSize() === "S" ? "90%" : "95vh"}`,
          display: "flex",
          flexDirection: `${windowSize() === "S" ? "column" : "row"}`,
          gap: "1rem",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "2rem",
        }}
      >
        <TradersMat
          trader="one"
          sumTraderOne={sumTraderOne}
          sumTraderTwo={sumTraderTwo}
          windowSize={windowSize}
          btnFn={() => {
            setShowModal(!showModal), setTraderToChange("one");
          }}
          cards={traderOne}
          clearCards={() => {
            setTraderOne([]),
              setDiffSum(
                Math.round(sumTraderTwo()).toFixed(2).replaceAll("-", "")
              );
          }}
        />
        <section
          style={{
            height: `${windowSize() === "S" ? "min-content" : "100%"}`,
            display: "flex",
            flexDirection: "column", //`${windowSize() === "S" ? "row" : "column"}`,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* {windowSize() !== "S" && <div>circle</div>} */}
          <div
            style={{
              width: "70%",
              display: "flex",
              flexDirection: `${windowSize() === "S" ? "row" : "column"}`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                color: `${
                  sumTraderOne() === sumTraderTwo()
                    ? "darkgreen"
                    : sumTraderOne() > sumTraderTwo()
                    ? "darkorange"
                    : "darkred"
                }`,
              }}
            >
              {windowSize() === "S" ? (
                <ArrowUp size={40} />
              ) : (
                <ArrowLeft size={40} />
              )}
            </div>
            <p style={{ textAlign: "center", margin: "0" }}>diff: {diffSum}$</p>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                color: `${
                  sumTraderOne() === sumTraderTwo()
                    ? "darkgreen"
                    : sumTraderOne() < sumTraderTwo()
                    ? "darkorange"
                    : "darkred"
                }`,
              }}
            >
              {windowSize() === "S" ? (
                <ArrowDown size={40} />
              ) : (
                <ArrowRight size={40} />
              )}
            </div>
          </div>
        </section>
        <TradersMat
          trader="two"
          sumTraderOne={sumTraderOne}
          sumTraderTwo={sumTraderTwo}
          windowSize={windowSize}
          btnFn={() => {
            setShowModal(!showModal), setTraderToChange("two");
          }}
          cards={traderTwo}
          clearCards={() => {
            setTraderTwo([]),
              setDiffSum(
                Math.round(sumTraderOne()).toFixed(2).replaceAll("-", "")
              );
          }}
        />
        {windowSize() === "S" && (
          <PrimaryButton
            btnText="Clear all cards"
            clickFn={() => clearTraderCards()}
          />
        )}
      </div>
    </main>
  );
};
export default Home;
