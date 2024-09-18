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
import { TradersMat } from "@/components/Containers";
import { ITraderCard, IRemoveCard, ISavedCard } from "@/interfaces/interfaces";
import { cardSum } from "@/functions/sumFunctions";
import { color } from "@/utils/color";
import { useGlobalValue } from "@/components/GlobalValueProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const Home = () => {
  const { globalValue } = useGlobalValue();
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
  //PLACEHOLDER
  const currency = "SEK";

  const changeShowModal = () => {
    setShowModal(false);
  };
  const changeTraderOnesCards = (cardToAdd: ISavedCard) => {
    let newList: ISavedCard[] = traderOne;
    newList.push(cardToAdd);
    setTraderOne(newList);
    sessionStorage.setItem("tr1", JSON.stringify(traderOne));
    setNotificationMessage(
      `<b>${cardToAdd.card.name}</b> has been added to <i>trader one</i>`
    );
    setShowNotification(true);
  };
  const changeTraderTwosCards = (cardToAdd: ISavedCard) => {
    let newList: ISavedCard[] = traderTwo;
    newList.push(cardToAdd);
    setTraderTwo(newList);
    sessionStorage.setItem("tr2", JSON.stringify(traderTwo));
    setNotificationMessage(
      `<b>${cardToAdd.card.name}</b> has been added to <i>trader two</i>`
    );
    setShowNotification(true);
  };
  const clearAllCards = () => {
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
    setCardToRemove({ trader, card, id });
    openRemoveCard();
  };
  const openRemoveCard = () => {
    setShowDeleteNotification(true);
  };
  const removeCard = ({ trader, id, card }: IRemoveCard) => {
    const newArray = trader === "one" ? traderOne : traderTwo;
    newArray.splice(id, 1);
    if (trader === "one") {
      setTraderOne(newArray);
      sessionStorage.setItem("tr1", JSON.stringify(newArray));
    } else {
      setTraderTwo(newArray);
      sessionStorage.setItem("tr2", JSON.stringify(newArray));
    }
    setNotificationMessage(
      `<b>${card.name}</b> has been removed from <i>trader ${trader}</i>`
    );
    setShowDeleteNotification(false);
    setShowNotification(true);
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
  }, [showModal, traderOne, traderTwo, showDeleteNotification]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        gap: "0.5rem",
        height: `${globalValue?.screen.height + "px"}`,
        background: color.black,
      }}
    >
      <Header
        clearAllCards={() => (
          setCardsToClear("all cards"), setShowClearNotification(true)
        )}
        changeCurrency={() => console.log("clicked")}
        currency={currency}
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
          notificationMessage={`Are you sure you want to remove <br/><b>${
            cardToRemove !== undefined && cardToRemove.card.name
          }</b> - ${cardToRemove !== undefined && cardToRemove.card.set.name}`}
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
                      trader: "one",
                      traderTwo: traderOne,
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
      <main
        style={{
          height: `${
            globalValue?.screen.breakpoint === "S" ||
            globalValue?.screen.breakpoint === "XS"
              ? "97vh"
              : "auto"
          }`,
          display: "flex",
          flexDirection: `${
            globalValue?.screen.breakpoint === "S" ||
            globalValue?.screen.breakpoint === "XS"
              ? "column"
              : "row"
          }`,
          gap: `${
            globalValue?.screen.breakpoint === "S" ||
            globalValue?.screen.breakpoint === "XS"
              ? "0.5rem"
              : ""
          }`,
          alignItems: "center",
          justifyContent: `${
            globalValue?.screen.breakpoint === "S" ||
            globalValue?.screen.breakpoint === "XS"
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
              globalValue?.screen.breakpoint === "S" ||
              globalValue?.screen.breakpoint === "XS"
                ? "min-content"
                : "100%"
            }`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "70%",
              display: "flex",
              flexDirection: `${
                globalValue?.screen.breakpoint === "S" ||
                globalValue?.screen.breakpoint === "XS"
                  ? "row"
                  : "column"
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
              {globalValue?.screen.breakpoint === "S" ||
              globalValue?.screen.breakpoint === "XS" ? (
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
              {globalValue?.screen.breakpoint === "S" ||
              globalValue?.screen.breakpoint === "XS" ? (
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
          removeCard={findCardToRemove}
          btnFn={() => {
            setShowModal(!showModal), setTraderToChange("two");
          }}
          cards={traderTwo}
          clearCards={() => (
            setCardsToClear("trader two"), setShowClearNotification(true)
          )}
        />
      </main>
      <Footer />
    </div>
  );
};
export default Home;
