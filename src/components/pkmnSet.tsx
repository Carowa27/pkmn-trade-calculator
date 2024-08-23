import { IPkmnSet } from "@/app/dataFromApi";
import { windowSize } from "@/functions/windowSizes";

interface pkmnSetProps {
  set: IPkmnSet;
  saveSet: (set: IPkmnSet) => void;
}

export const PkmnSet = ({ set, saveSet }: pkmnSetProps) => {
  return (
    <>
      <div>
        <div
          className="two"
          style={{
            border: "2px white solid",
            height: "100%",
            borderRadius: "10px",
          }}
        >
          <div
            className="three"
            style={{
              border: "2px black solid",
              borderRadius: "10px",
              height: "100%",
            }}
          >
            <div
              className="four"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "2px white solid",
                borderRadius: "10px",
                height: "100%",
                padding: "1rem 1rem 0.5rem 1rem",
              }}
              onClick={() => saveSet(set)}
            >
              <div
                className="five"
                style={{
                  height: `${windowSize() === "S" ? "2rem" : "5rem"}`,
                  alignContent: "center",
                }}
              >
                <div
                  className="six"
                  style={{
                    maxWidth: `${windowSize() === "S" ? "5rem" : "12.5rem"}`,
                    maxHeight: `${windowSize() === "S" ? "2rem" : "5rem"}`,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    style={{
                      maxWidth: "100%",
                      maxHeight: `${windowSize() === "S" ? "2rem" : "5rem"}`,
                    }}
                    src={set.images.symbol}
                    alt={set.name}
                  />
                </div>
              </div>
              <h4
                style={{
                  maxWidth: `${windowSize() === "S" ? "5rem" : "9rem"}`,
                  textWrap: "wrap",
                  justifyContent: "end",
                  justifySelf: "end",
                  paddingTop: "0.5rem",
                }}
              >
                {set.name}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
