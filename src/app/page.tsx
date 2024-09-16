"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { SearchModal } from "../components/SearchModal";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
} from "react-bootstrap-icons";
import {
  NotificationModalWindow,
  NotificationWindow,
} from "@/components/Notification";
import { windowSize } from "@/functions/windowSizes";
import { Header, TradersMat } from "@/components/Containers";
import { PrimaryButton } from "@/components/Buttons";
import { ITraderCard, IRemoveCard, ISavedCard } from "@/interfaces/interfaces";
import { cardSum } from "@/functions/sumFunctions";
import { color } from "@/utils/color";

const Home = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [showDeleteNotification, setShowDeleteNotification] =
    useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] =
    useState<string>("lorem");
  const [traderOne, setTraderOne] = useState<ISavedCard[]>([]);
  const [traderTwo, setTraderTwo] = useState<ISavedCard[]>([]);
  const [diffSum, setDiffSum] = useState<string>("");
  const [traderToChange, setTraderToChange] = useState<"one" | "two">("one");
  const [cardToRemove, setCardToRemove] = useState<IRemoveCard>();
  const [cardsToClear, setCardsToClear] = useState<
    "trader one" | "trader two" | "all cards"
  >("trader one");
  const [showClearNotification, setShowClearNotification] =
    useState<boolean>(false);

  const changeShowModal = () => {
    setShowModal(false);
  };
  const changeTraderOnesCards = (cardToAdd: ISavedCard) => {
    let newList: ISavedCard[] = traderOne;
    newList.push(cardToAdd);
    setTraderOne(newList);
    sessionStorage.setItem("tr1", JSON.stringify(traderOne));
  };
  const changeTraderTwosCards = (cardToAdd: ISavedCard) => {
    let newList: ISavedCard[] = traderTwo;
    newList.push(cardToAdd);
    setTraderTwo(newList);
    sessionStorage.setItem("tr2", JSON.stringify(traderTwo));
  };
  const clearAllCards = () => {
    // sessionStorage.clear;
    sessionStorage.setItem("tr1", JSON.stringify([]));
    sessionStorage.setItem("tr2", JSON.stringify([]));
    setTraderOne([]);
    setTraderTwo([]);
    setDiffSum("0");
    setShowClearNotification(false);
  };
  const closeNotification = () => {
    setShowNotification(false);
  };
  const findCardToRemove = ({ id, trader }: ITraderCard) => {
    const card = trader === "one" ? traderOne[id].card : traderTwo[id].card;
    setCardToRemove({ card, trader });
    openRemoveCard();
  };
  const openRemoveCard = () => {
    setShowDeleteNotification(true);
  };
  const removeCard = ({ card, trader }: IRemoveCard) => {
    const newArray =
      trader === "one"
        ? traderOne.filter((item) => item.card !== card)
        : traderTwo.filter((item) => item.card !== card);
    if (trader === "one") {
      setTraderOne(newArray);
    } else {
      setTraderTwo(newArray);
    }
    setShowDeleteNotification(false);
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
    const diff = (
      Math.round(
        (cardSum({
          trader: "one",
          traderOne: traderOne,
        }) -
          cardSum({
            trader: "two",
            traderTwo: traderTwo,
          })) *
          100
      ) / 100
    )
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
        background: color.black,
      }}
    >
      <Header
        clearAllCards={() => (
          setCardsToClear("all cards"), setShowClearNotification(true)
        )}
      />
      {showNotification && (
        <NotificationWindow
          closeNotification={closeNotification}
          notificationMessage={notificationMessage}
        />
      )}
      {showDeleteNotification && (
        <NotificationModalWindow
          closeNotification={() => setShowDeleteNotification(false)}
          notificationHeader={"Are You Sure"}
          notificationMessage={`Are you sure you want to remove ${
            cardToRemove !== undefined && cardToRemove.card.name
          }`}
          removeFn={removeCard}
          itemToRemove={cardToRemove!}
        />
      )}
      {showClearNotification && (
        <NotificationModalWindow
          closeNotification={() => setShowClearNotification(false)}
          notificationHeader={"Are You Sure"}
          notificationMessage={`Are you sure you want to clear ${cardsToClear}?`}
          clearFn={() => {
            cardsToClear === "trader one"
              ? (setTraderOne([]),
                sessionStorage.setItem("tr1", JSON.stringify([])),
                setDiffSum(
                  Math.round(
                    cardSum({
                      trader: "two",
                      traderTwo: traderTwo,
                    })
                  )
                    .toFixed(2)
                    .replaceAll("-", "")
                ),
                setShowClearNotification(false))
              : cardsToClear === "trader two"
              ? (setTraderTwo([]),
                sessionStorage.setItem("tr2", JSON.stringify([])),
                setDiffSum(
                  Math.round(
                    cardSum({
                      trader: "two",
                      traderTwo: traderTwo,
                    })
                  )
                    .toFixed(2)
                    .replaceAll("-", "")
                ),
                setShowClearNotification(false))
              : clearAllCards();
          }}
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
          height: `${
            windowSize() === "S" || windowSize() === "XS" ? "97vh" : "95vh"
          }`,
          display: "flex",
          flexDirection: `${
            windowSize() === "S" || windowSize() === "XS" ? "column" : "row"
          }`,
          gap: `${
            windowSize() === "S" || windowSize() === "XS" ? "0.5rem" : ""
          }`,
          alignItems: "center",
          justifyContent: `${
            windowSize() === "S" || windowSize() === "XS"
              ? "start"
              : "space-between"
          }`,
          margin: "0 2rem 0.5rem 2rem",
        }}
      >
        <TradersMat
          trader="one"
          sumTraderOne={cardSum({
            trader: "one",
            traderOne: traderOne,
          })}
          sumTraderTwo={cardSum({
            trader: "two",
            traderTwo: traderTwo,
          })}
          windowSize={windowSize}
          removeCard={findCardToRemove}
          btnFn={() => {
            setShowModal(!showModal), setTraderToChange("one");
          }}
          cards={traderOne}
          clearCards={() => {
            setCardsToClear("trader one"), setShowClearNotification(true);
          }}
        />
        <section
          style={{
            height: `${
              windowSize() === "S" || windowSize() === "XS"
                ? "min-content"
                : "100%"
            }`,
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
              flexDirection: `${
                windowSize() === "S" || windowSize() === "XS" ? "row" : "column"
              }`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                color: `${
                  cardSum({
                    trader: "one",
                    traderOne: traderOne,
                  }) ===
                  cardSum({
                    trader: "two",
                    traderTwo: traderTwo,
                  })
                    ? color.green
                    : cardSum({
                        trader: "one",
                        traderOne: traderOne,
                      }) >
                      cardSum({
                        trader: "one",
                        traderTwo: traderTwo,
                      })
                    ? color.orange
                    : color.red
                }`,
              }}
            >
              {windowSize() === "S" || windowSize() === "XS" ? (
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
                  cardSum({
                    trader: "one",
                    traderOne: traderOne,
                  }) ===
                  cardSum({
                    trader: "two",
                    traderTwo: traderTwo,
                  })
                    ? color.green
                    : cardSum({
                        trader: "one",
                        traderOne: traderOne,
                      }) <
                      cardSum({
                        trader: "two",
                        traderTwo: traderTwo,
                      })
                    ? color.orange
                    : color.red
                }`,
              }}
            >
              {windowSize() === "S" || windowSize() === "XS" ? (
                <ArrowDown size={40} />
              ) : (
                <ArrowRight size={40} />
              )}
            </div>
          </div>
        </section>
        <TradersMat
          trader="two"
          sumTraderOne={cardSum({
            trader: "one",
            traderOne: traderOne,
          })}
          sumTraderTwo={cardSum({
            trader: "two",
            traderTwo: traderTwo,
          })}
          windowSize={windowSize}
          removeCard={findCardToRemove}
          btnFn={() => {
            setShowModal(!showModal), setTraderToChange("two");
          }}
          cards={traderTwo}
          clearCards={() => (
            setCardsToClear("trader two"), setShowClearNotification(true)
          )}
        />
        {windowSize() === "S" ||
          (windowSize() === "XS" && (
            <PrimaryButton
              btnText="Clear all cards"
              clickFn={() => (
                setCardsToClear("all cards"), setShowClearNotification(true)
              )}
            />
          ))}
      </div>
    </main>
  );
};
export default Home;
