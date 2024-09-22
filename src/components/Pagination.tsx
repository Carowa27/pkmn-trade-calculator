import { useEffect, useState } from "react";
import { SkipEndFill, SkipStartFill } from "react-bootstrap-icons";

interface IProps {
  pageSize: number;
  totalCount: number;
  page: number;
  updateSearch: (newPage: number, orderBy: string) => void;
}

export const Pagination = ({
  pageSize,
  totalCount,
  page,
  updateSearch,
}: IProps) => {
  const amountPages = Math.ceil(totalCount / pageSize);
  const [numbers, setNumbers] = useState<number[]>();
  const [paginationStart, setPaginationStart] = useState<number>();
  const [paginationEnd, setPaginationEnd] = useState<number>();

  useEffect(() => {
    const numberArray = [];
    for (let i = 0; i < amountPages; i++) {
      numberArray.push(i + 1);
    }
    setNumbers(numberArray);
  }, [amountPages, page]);

  useEffect(() => {
    if (page < 5 || page === amountPages) {
      if (page < 5) {
        setPaginationStart(0);
        setPaginationEnd(page + 5);
      } else {
        setPaginationEnd(amountPages);
        setPaginationStart(page - 5);
      }
    } else {
      setPaginationStart(page - 5), setPaginationEnd(page + 5);
    }
  }, [page, numbers, amountPages]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);
  return (
    <>
      <div
        style={
          totalCount > pageSize
            ? {
                width: "100%",
                height: "2rem",
                display: "flex",
                justifyContent: "center",
                justifySelf: "center",
                alignItems: "center",
              }
            : { display: "none" }
        }
      >
        <p
          style={{
            margin: 0,
            paddingLeft: "10px",
            paddingRight: "10px",
            display: "flex",
            alignSelf: "center",
          }}
        >
          <SkipStartFill
            style={{
              cursor: "pointer",
            }}
            size={25}
            onClick={() => (page !== 1 ? updateSearch(1, "number") : null)}
          ></SkipStartFill>
        </p>
        {numbers &&
          numbers.slice(paginationStart, paginationEnd).map((number) => {
            return (
              <p
                key={number}
                style={
                  number === page
                    ? {
                        fontWeight: "bold",
                        margin: 0,
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        fontSize: "20px",
                        cursor: "pointer",
                      }
                    : {
                        margin: 0,
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        fontSize: "20px",
                        cursor: "pointer",
                      }
                }
                onClick={() =>
                  page !== number ? updateSearch(number, "number") : null
                }
              >
                {number}
              </p>
            );
          })}
        <p
          style={{
            margin: 0,
            paddingLeft: "10px",
            paddingRight: "10px",
            display: "flex",
            alignSelf: "center",
          }}
        >
          <SkipEndFill
            style={{
              cursor: "pointer",
            }}
            size={25}
            onClick={() =>
              page !== amountPages ? updateSearch(amountPages, "number") : null
            }
          >
            &#xF557;
          </SkipEndFill>
        </p>
      </div>
    </>
  );
};
