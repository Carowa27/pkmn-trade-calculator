import { IPkmnCard } from "@/app/dataFromApi";
import { IconButton, PrimaryButton } from "./Buttons";
import { PkmnCard, PkmnCardTrader } from "./pkmnCard";
import { IRemoveCard, ITraderCard } from "@/interfaces/interfaces";
import { windowSize } from "@/functions/windowSizes";

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
          alignItems: "end",
          justifyContent: "end",
        }}
        // onClick={changeShowModal}
      >
        <section
          style={{
            background: "lightgrey",
            color: "black",
            borderRadius: "10px",
            padding: "1rem",
            margin: "1rem",
            border: "2px solid darkgrey",
          }}
        >
          <article className="notificationHead">{notificationHeader}</article>
          <article
            className="notificationBody"
            style={{ display: "flex", alignItems: "start" }}
          >
            {notificationMessage}
            <div style={{ paddingLeft: "1rem" }}>
              <IconButton
                icon={"X"}
                clickFn={closeNotification}
                size={20}
                color="black"
                filled
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
            color: "black",
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
                size={25}
                color="black"
                filled={false}
              />
            </div>
          </article>
          <article
            className="notificationBody"
            style={{ marginBottom: "1rem" }}
          >
            <p style={{ margin: "1rem 0" }}>
              {/* "1rem 0.5rem 1.5rem 0.2rem" }}> */}
              {notificationMessage}
            </p>
            {itemToRemove && (
              <PkmnCard
                card={itemToRemove.card}
                cardWidth={`${windowSize() === "S" ? "6rem" : "8rem"}`}
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
              clickFn={() =>
                // console.log(itemToRemove)
                {
                  itemToRemove && removeFn
                    ? removeFn(itemToRemove)
                    : clearFn && clearFn();
                }
              }
            />
          </article>
        </section>
      </div>
    </>
  );
};
