import { IPkmnSet } from "@/interfaces/dataFromApi";
import { windowSize } from "@/functions/windowSizes";
import { useContext } from "react";
import { GlobalValueContext, useGlobalValue } from "./GlobalValueProvider";

interface pkmnSetProps {
  set: IPkmnSet;
  saveSet: (set: IPkmnSet) => void;
}

export const PkmnSet = ({ set, saveSet }: pkmnSetProps) => {
  const { globalValue } = useGlobalValue();
  return (
    <>
      <div>
        <div
          className="two"
          style={{
            aspectRatio: "1/1",
            border: "2px white solid",
            height: `${
              globalValue?.breakpoint === "S"
                ? "9rem"
                : globalValue?.breakpoint === "XS"
                ? "8rem"
                : "11rem"
            }`,
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
                alignItems: "center",
                justifyContent: "space-evenly",
                border: "2px white solid",
                borderRadius: "10px",
                height: "100%",
                padding: "1rem 1rem 0.5rem 1rem",
                cursor: "pointer",
              }}
              onClick={() => saveSet(set)}
            >
              <div
                className="six"
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  style={{
                    maxWidth: "100%",
                    height: `${
                      globalValue?.breakpoint === "S" ? "2rem" : "3rem"
                    }`,
                  }}
                  src={set.images.symbol}
                  alt={set.name}
                />
              </div>
              <h4
                style={{
                  maxWidth: "100%",
                  textWrap: "wrap",
                  textAlign: "center",
                  paddingTop: "0.5rem",
                  overflow: "hidden scroll",
                  scrollbarWidth: "none",
                }}
              >
                {set.name.includes("Trainer Gallery")
                  ? set.name.replace("Trainer Gallery", "TG")
                  : set.name.includes("Galarian Gallery")
                  ? set.name.replace("Galarian Gallery", "GG")
                  : set.name.includes("Black Star Promos")
                  ? set.name.replace("Black Star Promos", "BSP")
                  : set.name}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
