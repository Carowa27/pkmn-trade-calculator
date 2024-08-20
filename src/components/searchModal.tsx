import { IPkmnCard, IPkmnSet } from "@/app/dataFromApi";
import { getPkmnFromApi, getSetsFromApi } from "@/app/pkmnTcgApiServices";
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
  const [search, setSearch] = useState<string>(searchFor);
  const saveSet = (set: IPkmnSet) => {
    setSavedSet(set);
    setSearch("card");
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
  const getCardsInSet = async (set: IPkmnSet) => {
    await getPkmnFromApi(`?q=set.id:%22${set.id}%22`, 1).then((res) => {
      if (!res || res.data.length === 0) {
        setNoHits(true);
        setIsLoading(false);
      }
      if (res) {
        setCardList(res.data as IPkmnCard[]);
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
  useEffect(() => {
    if (search === "card") {
      if (
        (cardList === undefined || cardList.length === 0) &&
        savedSet !== undefined
      ) {
        setIsLoading(true);
        getCardsInSet(savedSet);
      }
    }
  }, [search]);
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

              {search === "card" && (
                <>
                  {cardList?.map((card) => {
                    return <PkmnCard card={card} />;
                  })}
                </>
              )}
            </div>
          </section>
          <section className="modalFooter"></section>
        </article>
      </section>
    </>
  );
};
