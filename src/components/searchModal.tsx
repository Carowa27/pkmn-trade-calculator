import { IPkmnCard, IPkmnSet } from "@/app/dataFromApi";
import { getPkmnFromApi, getSetsFromApi } from "@/functions/pkmnTcgApiServices";
import { useEffect, useState } from "react";
import { LoadingModule } from "./LoadingModule";
import { PkmnSet } from "./pkmnSet";
import { PkmnCard } from "./pkmnCard";
import { Pagination } from "./Pagination";
import { XLg } from "react-bootstrap-icons";
import { windowSize } from "@/functions/windowSizes";

interface ModalProps {
  searchFor: "set" | "card";
  changeShowModal: () => void;
  changeTradersCards: (card: IPkmnCard) => void;
}

export const SearchModal = ({
  searchFor,
  changeShowModal,
  changeTradersCards,
}: ModalProps) => {
  const [setList, setSetList] = useState<IPkmnSet[]>();
  const [cardList, setCardList] = useState<IPkmnCard[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [noHits, setNoHits] = useState<boolean>(false);
  const [savedCard, setSavedCard] = useState<IPkmnCard>();
  const [savedSet, setSavedSet] = useState<IPkmnSet>();
  const [search, setSearch] = useState<string>(searchFor);
  const [pageNr, setPageNr] = useState<number>(1);
  const [pageInfo, setPageInfo] = useState<{
    page: number;
    pageSize: number;
    totalCount: number;
  }>();
  const saveSet = (set: IPkmnSet) => {
    setSavedSet(set);
    setSearch("card");
    setPageNr(1);
  };
  const getSets = async (page: number) => {
    await getSetsFromApi(page).then((res) => {
      if (!res || res.data.length === 0) {
        setNoHits(true);
        setIsLoading(false);
      }
      if (res) {
        setSetList(res.data as IPkmnSet[]);
        setIsLoading(false);
        setPageInfo({
          page: res.page,
          pageSize: res.pageSize,
          totalCount: res.totalCount,
        });
      }
    });
  };
  const updateSearch = async (newPage: number) => {
    setIsLoading(true);
    setPageNr(newPage);
    if (search === "set") {
      await getSets(newPage);
    } else {
      await getCardsInSet(savedSet!, newPage);
    }
  };
  const getCardsInSet = async (set: IPkmnSet, page: number) => {
    await getPkmnFromApi(`?q=set.id:%22${set.id}%22`, page).then((res) => {
      if (!res || res.data.length === 0) {
        setNoHits(true);
        setIsLoading(false);
      }
      if (res) {
        setCardList(res.data as IPkmnCard[]);
        setIsLoading(false);
        setPageInfo({
          page: res.page,
          pageSize: res.pageSize,
          totalCount: res.totalCount,
        });
      }
    });
  };
  useEffect(() => {
    if (setList === undefined || setList.length === 0) {
      setIsLoading(true);
      getSets(pageNr);
    }
  }, []);
  useEffect(() => {
    if (search === "card") {
      if (
        (cardList === undefined || cardList.length === 0) &&
        savedSet !== undefined
      ) {
        setIsLoading(true);
        getCardsInSet(savedSet, 1);
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
            width: `${windowSize() === "S" ? "90vw" : "70vw"}`,
            height: `${windowSize() === "S" ? "90vh" : "80vh"}`,
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
            <div onClick={changeShowModal} style={{ cursor: "pointer" }}>
              <XLg size={25} />
            </div>
          </section>
          <section
            className="modalBody"
            style={{
              margin: "20px",
              width: `${windowSize() === "S" ? "90%" : "100%"}`,
              display: "flex",
              justifyContent: "center",
              height: `${windowSize() === "S" ? "85%" : "78%"}`,
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
                height: "100%",
                paddingRight: "0.5rem",
              }}
            >
              {noHits || isLoading ? (
                <section style={{ width: "100%" }}>
                  {noHits && (
                    <>
                      <p>No hits</p>
                    </>
                  )}
                  {isLoading && <LoadingModule />}
                </section>
              ) : null}
              {search === "set" && (
                <>
                  {setList?.map((set, i) => {
                    return (
                      <PkmnSet
                        set={set}
                        saveSet={saveSet}
                        key={set.id + "-" + i}
                      />
                    );
                  })}
                </>
              )}

              {search === "card" && (
                <>
                  {cardList?.map((card, i) => {
                    return (
                      <PkmnCard
                        card={card}
                        saveCard={changeTradersCards}
                        cardWidth={`${
                          windowSize() === "S" ? "8rem" : "12.5rem"
                        }`}
                        key={card.id + "-" + i}
                      />
                    );
                  })}
                </>
              )}
            </div>
          </section>
          <section
            className="modalFooter"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {pageInfo ? (
              <Pagination
                page={pageInfo.page}
                pageSize={pageInfo.pageSize}
                totalCount={pageInfo.totalCount}
                updateSearch={updateSearch}
              />
            ) : null}
          </section>
        </article>
      </section>
    </>
  );
};
