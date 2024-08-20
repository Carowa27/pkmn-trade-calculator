import { IPkmnCard, IPkmnSet } from "@/app/dataFromApi";
import { getSetsFromApi } from "@/app/pkmnTcgApiServices";
import { useEffect, useState } from "react";
import { LoadingModule } from "./LoadingModule";
import { PkmnSet } from "./pkmnSet";
import { PkmnCard } from "./pkmnCard";

interface ModalProps {
  searchFor: "set" | "card";
  changeShowModal: () => void;
}

export const SearchModal = ({ searchFor, changeShowModal }: ModalProps) => {
  const [setList, setSetList] = useState<IPkmnSet[]>();
  const [cardList, setCardList] = useState<IPkmnCard[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [noHits, setNoHits] = useState<boolean>(false);
  const [savedCard, setSavedCard] = useState<IPkmnCard>();
  const [savedSet, setSavedSet] = useState<IPkmnSet>();
  const [search, setSearchFor] = useState<string>(searchFor);
  const saveSet = (set: IPkmnSet) => {
    console.log(set.name);
    setSavedSet(set);
    setSearchFor("card");
  };
  const getAllSets = async () => {
    await getSetsFromApi().then((res) => {
      if (!res || res.length === 0) {
        setNoHits(true);
        setIsLoading(false);
      }
      if (res) {
        setSetList(res as IPkmnSet[]);
        setIsLoading(false);
      }
    });
  };
  useEffect(() => {
    if (setList === undefined || setList.length === 0) {
      setIsLoading(true);
      getAllSets();
    }
  }, []);
  return (
    <>
      <section
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
        <article
          style={{
            width: "70vw",
            height: "80vh",
            background: "grey",
            borderRadius: "20px",
            border: "2px solid lightgrey",
          }}
        >
          <section
            className="modalHeader"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "20px",
            }}
          >
            <div>{search === "set" ? <h2>Set</h2> : <h2>Card</h2>}</div>
            <div onClick={changeShowModal}>X</div>
          </section>
          <section
            className="modalBody"
            style={{
              margin: "20px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              height: "90%",
            }}
          >
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
              {noHits && (
                <>
                  <p>No hits</p>
                </>
              )}
              {isLoading && <LoadingModule />}
              {search === "set" && (
                <>
                  {setList?.map((set) => {
                    return (
                      <>
                        <PkmnSet set={set} saveSet={saveSet} />
                      </>
                    );
                  })}
                </>
              )}
            </div>
            {search === "card" && (
              <>
                {cardList?.map((card) => {
                  <PkmnCard card={card} />;
                })}
              </>
            )}
          </section>
          <section className="modalFooter"></section>
        </article>
      </section>
    </>
  );
};
