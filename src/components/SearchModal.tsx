"use client";

import { IPkmnCard, IPkmnSet } from "@/interfaces/dataFromApi";
import { getPkmnFromApi, getSetsFromApi } from "@/functions/pkmnTcgApiServices";
import { useContext, useEffect, useState } from "react";
import { LoadingModule } from "./LoadingModule";
import { PkmnSet } from "./PkmnSet";
import { PkmnCardSearch } from "./PkmnCard";
import { Pagination } from "./Pagination";
import { windowSize } from "@/functions/windowSizes";
import { IconButton } from "./Buttons";
import { ISavedCard } from "@/interfaces/interfaces";
import { GlobalValueContext, useGlobalValue } from "./GlobalValueProvider";

interface ModalProps {
  searchFor: "set" | "card";
  changeShowModal: () => void;
  changeTradersCards: (card: ISavedCard) => void;
}

export const SearchModal = ({
  searchFor,
  changeShowModal,
  changeTradersCards,
}: ModalProps) => {
  const { globalValue } = useGlobalValue();
  const [setList, setSetList] = useState<IPkmnSet[]>();
  const [pageInfoSet, setPageInfoSet] = useState<{
    page: number;
    pageSize: number;
    totalCount: number;
  }>();
  const [cardList, setCardList] = useState<IPkmnCard[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [noHits, setNoHits] = useState<boolean>(false);
  const [savedSet, setSavedSet] = useState<IPkmnSet>();
  const [search, setSearch] = useState<"card" | "set">(searchFor);
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
        setPageInfoSet({
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
  useEffect(() => {
    setCardList([]);
    if (savedSet !== undefined) {
      setIsLoading(true);
      getCardsInSet(savedSet, 1);
    }
  }, [savedSet]);
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
            padding: "0.5rem",
            width:
              globalValue?.breakpoint === "S"
                ? "90vw"
                : globalValue?.breakpoint === "XS"
                ? "95vw"
                : "70vw",
            height:
              globalValue?.breakpoint === "S" ||
              globalValue?.breakpoint === "XS"
                ? globalValue.screen.height - 20 + "px"
                : "80vh",
            background: "grey",
            borderRadius: "20px",
            border: "2px solid lightgrey",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <section
            className="modalHeader"
            style={{
              display: "flex",
              alignItems: "center",
              margin: "10px",
            }}
          >
            {search === "card" && (
              <div style={{ marginRight: "1rem" }}>
                <IconButton
                  icon="<"
                  clickFn={() => (setSearch("set"), setSavedSet(undefined))}
                  size={25}
                  colorIcon="inherit"
                  filled
                />
              </div>
            )}
            <div>{search === "set" ? <h2>Set</h2> : <h2>Card</h2>}</div>
            {savedSet !== undefined && (
              <div style={{ marginLeft: "1rem" }}>
                <span style={{ fontWeight: "bolder" }}>Set: </span>
                <span>{savedSet && savedSet.name}</span>
              </div>
            )}
            <div style={{ marginLeft: "auto" }}>
              <IconButton
                icon={"X"}
                clickFn={changeShowModal}
                size={25}
                colorIcon="inherit"
                filled
              />
            </div>
          </section>
          <section
            className="modalBody"
            style={{
              margin:
                globalValue?.breakpoint === "XS"
                  ? "0"
                  : "1.25rem 1.25rem 0.25rem 1.25rem",
              width: globalValue?.breakpoint === "S" ? "90%" : "100%",
              display: "flex",
              justifyContent: "center",
              height:
                globalValue?.breakpoint === "XS" ||
                globalValue?.breakpoint === "S" ||
                globalValue?.breakpoint === "M" ||
                globalValue?.breakpoint === "L"
                  ? "80%"
                  : "85%",
            }}
          >
            <div
              style={{
                width:
                  globalValue?.breakpoint === "S" ||
                  globalValue?.breakpoint === "XS"
                    ? "100%"
                    : "90%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                gap: "1rem",
                overflow: "hidden visible",
                height: "100%",
                paddingRight:
                  globalValue?.breakpoint === "S" ||
                  globalValue?.breakpoint === "XS"
                    ? 0
                    : "0.5rem",
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
                      <PkmnCardSearch
                        card={card}
                        saveCard={changeTradersCards}
                        cardWidth={`${
                          globalValue?.breakpoint === "S" ||
                          globalValue?.breakpoint === "XS"
                            ? "8rem"
                            : "12.5rem"
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
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {pageInfo && search === "card" && (
              <Pagination
                page={pageInfo.page}
                pageSize={pageInfo.pageSize}
                totalCount={pageInfo.totalCount}
                updateSearch={updateSearch}
              />
            )}
            {pageInfoSet && search === "set" && (
              <Pagination
                page={pageInfoSet.page}
                pageSize={pageInfoSet.pageSize}
                totalCount={pageInfoSet.totalCount}
                updateSearch={updateSearch}
              />
            )}
          </section>
        </article>
      </section>
    </>
  );
};
