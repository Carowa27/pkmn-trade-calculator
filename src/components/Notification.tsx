import { IconButton } from "./Buttons";

interface INotificationProps {
  notificationMessage: string;
  notificationHeader?: string;
  notificationFooter?: string;
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
            <IconButton icon={"X"} clickFn={closeNotification} />
          </article>
          <article className="notificationFoot">{notificationFooter}</article>
        </section>
      </div>
    </>
  );
};
