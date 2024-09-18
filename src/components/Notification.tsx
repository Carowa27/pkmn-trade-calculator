import { IconButton, PrimaryButton } from "./Buttons";
import { PkmnCard } from "./PkmnCard";
import { IRemoveCard, ITraderCard } from "@/interfaces/interfaces";
import { windowSize } from "@/functions/windowSizes";
import { color } from "@/utils/color";
import { useContext, useEffect } from "react";
import { GlobalValueContext, useGlobalValue } from "./GlobalValueProvider";

interface INotificationProps {
  notificationMessage: string;
  notificationHeader?: string;
  notificationFooter?: string;
  closeNotification: () => void;
}
interface INotificationModalProps {
  notificationMessage: string;
  notificationHeader?: string;
  itemToRemove?: IRemoveCard;
  removeFn?: ({}: IRemoveCard) => void;
  clearFn?: () => void;
  closeNotification: () => void;
}

export const NotificationWindow = ({
  notificationHeader,
  notificationMessage,
  notificationFooter,
  closeNotification,
}: INotificationProps) => {
  useEffect(() => {
    setTimeout(() => {
      closeNotification();
    }, 1500);
  });
  return (
    <>
      <div
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          backgroundColor: "#00000080",
          display: "flex",
          alignItems: "end",
          justifyContent: "end",
          zIndex: "300",
        }}
        // onClick={changeShowModal}
      >
        <section
          style={{
            background: "lightgrey",
            color: color.black,
            borderRadius: "10px",
            margin: "1rem",
            border: "2px solid darkgrey",
          }}
        >
          <article className="notificationHead">{notificationHeader}</article>
          <article
            className="notificationBody"
            style={{ display: "flex", alignItems: "start" }}
          >
            <span
              style={{ padding: "1rem" }}
              dangerouslySetInnerHTML={{ __html: notificationMessage }}
            ></span>
            <div style={{ padding: "0.5rem 0.5rem 0 0" }}>
              <IconButton
                icon={"X-mini"}
                clickFn={closeNotification}
                colorIcon={color.black}
              />
            </div>
          </article>
          <article className="notificationFoot">{notificationFooter}</article>
        </section>
      </div>
    </>
  );
};

export const NotificationModalWindow = ({
  notificationHeader,
  notificationMessage,
  itemToRemove,
  closeNotification,
  removeFn,
  clearFn,
}: INotificationModalProps) => {
  const { globalValue } = useGlobalValue();
  return (
    <>
      <div
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          backgroundColor: "#000000E6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        // onClick={changeShowModal}
      >
        <section
          style={{
            minWidth: "20vw",
            background: "lightgrey",
            color: color.black,
            borderRadius: "10px",
            padding: "1rem",
            margin: "1rem",
            border: "2px solid darkgrey",
          }}
        >
          <article
            className="notificationHead"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <h3>{notificationHeader}</h3>
            <div style={{ paddingLeft: "1rem" }}>
              <IconButton
                icon={"X"}
                clickFn={closeNotification}
                colorIcon={color.black}
              />
            </div>
          </article>
          <article
            className="notificationBody"
            style={{ marginBottom: "1rem" }}
          >
            <p
              style={{ margin: "1rem 0" }}
              dangerouslySetInnerHTML={{ __html: notificationMessage }}
            ></p>
            {itemToRemove && (
              <PkmnCard
                card={itemToRemove.card}
                cardWidth={`${
                  globalValue?.breakpoint === "S" ? "6rem" : "8rem"
                }`}
              />
            )}
          </article>
          <article
            className="notificationFoot"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <PrimaryButton btnText={"Cancel"} clickFn={closeNotification} />
            <PrimaryButton
              btnText={"OK"}
              clickFn={() => {
                itemToRemove && removeFn
                  ? removeFn(itemToRemove)
                  : clearFn && clearFn();
              }}
            />
          </article>
        </section>
      </div>
    </>
  );
};
