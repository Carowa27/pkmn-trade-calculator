"use client";

import { IPkmnCard, IPkmnSet } from "@/interfaces/dataFromApi";
import { getPkmnFromApi, getSetsFromApi } from "@/functions/pkmnTcgApiServices";
import { ChangeEvent, useEffect, useState } from "react";
import { LoadingModule } from "./LoadingModule";
import { PkmnSet } from "./PkmnSet";
import { PkmnCardSearch } from "./PkmnCard";
import { Pagination } from "./Pagination";
import { IconButton, PrimaryButton, SearchModalButton } from "./Buttons";
import { ISavedCard } from "@/interfaces/interfaces";
import { useGlobalValue } from "./GlobalValueProvider";
import { color } from "@/utils/color";

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
  const [searchMethod, setSearchMethod] = useState<
    "bySet" | "byInput" | "notChosen"
  >("notChosen");
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
  const [searchValue, setSearchValue] = useState<string>("");
  const saveSet = (set: IPkmnSet) => {
    setSavedSet(set);
    setSearch("card");
    setPageNr(1);
  };
  const changeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const searchCard = async (page: number) => {
    await getPkmnFromApi(`?q=name:%22${searchValue}%22`, page).then((res) => {
      if (!res || res.data.length === 0) {
        console.error("no res from api call");
        setNoHits(true);
        setIsLoading(false);
      }
      if (res) {
        setSearch("card");
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
    if (searchMethod === "bySet") {
      if (setList === undefined || setList.length === 0) {
        setIsLoading(true);
        getSets(pageNr);
      }
    }
  }, [searchMethod]);
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
          backgroundColor: color.opacityBackground,
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
              globalValue?.screen.breakpoint === "S"
                ? "90vw"
                : globalValue?.screen.breakpoint === "XS"
                ? "95vw"
                : "70vw",
            height:
              globalValue?.screen.breakpoint === "S" ||
              globalValue?.screen.breakpoint === "XS"
                ? globalValue.screen.height - 20 + "px"
                : "80vh",
            background: "grey",
            borderRadius: "20px",
            border: "2px solid lightgrey",
            display: "flex",
            flexDirection: "column",
            justifyContent:
              searchMethod === "notChosen" ? "center" : "space-between",
          }}
        >
          {searchMethod === "notChosen" ? (
            <div
              style={{
                height: "50%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "40px",
                    alignSelf: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  Search
                </p>
                <p
                  style={{
                    fontSize: "20px",
                    alignSelf: "center",
                    marginBottom: "1rem",
                  }}
                >
                  Chose your way to search for the card
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <SearchModalButton
                  btnText={"Sets"}
                  clickFn={() => setSearchMethod("bySet")}
                />
                <SearchModalButton
                  btnText={"Input"}
                  clickFn={() => setSearchMethod("byInput")}
                />
              </div>
            </div>
          ) : searchMethod === "bySet" ? (
            <>
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
                      colorIcon="inherit"
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
                    colorIcon="inherit"
                  />
                </div>
              </section>
              <section
                className="modalBody"
                style={{
                  margin:
                    globalValue?.screen.breakpoint === "XS"
                      ? "0"
                      : "1.25rem 1.25rem 0.25rem 1.25rem",
                  width:
                    globalValue?.screen.breakpoint === "S" ? "90%" : "100%",
                  display: "flex",
                  justifyContent: "center",
                  height:
                    globalValue?.screen.breakpoint === "XS" ||
                    globalValue?.screen.breakpoint === "S" ||
                    globalValue?.screen.breakpoint === "M" ||
                    globalValue?.screen.breakpoint === "L"
                      ? "80%"
                      : "85%",
                }}
              >
                <div
                  style={{
                    width:
                      globalValue?.screen.breakpoint === "S" ||
                      globalValue?.screen.breakpoint === "XS"
                        ? "100%"
                        : "90%",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                    gap:
                      globalValue?.screen.breakpoint === "S" ||
                      globalValue?.screen.breakpoint === "XS"
                        ? "00.5rem"
                        : "1rem",
                    overflow: "hidden visible",
                    height: "100%",
                    paddingRight:
                      globalValue?.screen.breakpoint === "S" ||
                      globalValue?.screen.breakpoint === "XS"
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
                              globalValue?.screen.breakpoint === "S" ||
                              globalValue?.screen.breakpoint === "XS"
                                ? `${globalValue.screen.width / 2 - 30}px`
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
            </>
          ) : (
            <>
              <section
                className="modalHeader"
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "10px",
                }}
              >
                <div style={{ marginRight: "1rem" }}>
                  <IconButton
                    icon="<"
                    clickFn={() => {
                      setSearchMethod("notChosen");
                    }}
                    colorIcon="inherit"
                  />
                </div>
                <div>
                  <h2>Input</h2>
                </div>
                <form
                  onSubmit={(e) => (e.preventDefault(), searchCard(1))}
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <label
                    htmlFor="search_text"
                    style={{
                      alignSelf: "center",
                    }}
                  >
                    <span style={{ fontWeight: "bolder" }}>Card name: </span>
                  </label>{" "}
                  <input
                    type="text"
                    id="search_text"
                    value={searchValue}
                    onChange={changeSearchValue}
                    style={{
                      width: "275px",
                      paddingLeft: "0.2rem",
                      fontWeight: "bold",
                      fontSize: "18px",
                      border: "none",
                      borderRadius: "5px",
                    }}
                  />
                  <PrimaryButton
                    btnText={"Search"}
                    clickFn={() => searchCard(1)}
                  />
                </form>
                <div style={{ marginLeft: "auto" }}>
                  <IconButton
                    icon={"X"}
                    clickFn={changeShowModal}
                    colorIcon="inherit"
                  />
                </div>
              </section>
              <section
                className="modalBody"
                style={{
                  margin:
                    globalValue?.screen.breakpoint === "XS"
                      ? "0"
                      : "1.25rem 1.25rem 0.25rem 1.25rem",
                  width:
                    globalValue?.screen.breakpoint === "S" ? "90%" : "100%",
                  display: "flex",
                  justifyContent: "center",
                  height:
                    globalValue?.screen.breakpoint === "XS" ||
                    globalValue?.screen.breakpoint === "S" ||
                    globalValue?.screen.breakpoint === "M" ||
                    globalValue?.screen.breakpoint === "L"
                      ? "80%"
                      : "85%",
                }}
              >
                <div
                  style={{
                    width:
                      globalValue?.screen.breakpoint === "S" ||
                      globalValue?.screen.breakpoint === "XS"
                        ? "100%"
                        : "90%",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                    gap:
                      globalValue?.screen.breakpoint === "S" ||
                      globalValue?.screen.breakpoint === "XS"
                        ? "00.5rem"
                        : "1rem",
                    overflow: "hidden visible",
                    height: "100%",
                    paddingRight:
                      globalValue?.screen.breakpoint === "S" ||
                      globalValue?.screen.breakpoint === "XS"
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
                  {search === "card" && (
                    <>
                      {cardList?.map((card, i) => {
                        return (
                          <PkmnCardSearch
                            card={card}
                            saveCard={changeTradersCards}
                            cardWidth={`${
                              globalValue?.screen.breakpoint === "S" ||
                              globalValue?.screen.breakpoint === "XS"
                                ? `${globalValue.screen.width / 2 - 30}px`
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
              </section>
            </>
          )}
        </article>
      </section>
    </>
  );
};
