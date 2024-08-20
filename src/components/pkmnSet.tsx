import { IPkmnSet } from "@/app/dataFromApi";

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
                  height: "5rem",
                  alignContent: "center",
                }}
              >
                <div
                  className="six"
                  style={{
                    maxWidth: "12.5rem",
                    maxHeight: "5rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    style={{
                      maxWidth: "100%",
                      maxHeight: "5rem",
                    }}
                    src={set.images.symbol}
                    alt={set.name}
                  />
                </div>
              </div>
              <h4
                style={{
                  maxWidth: "9rem",
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
