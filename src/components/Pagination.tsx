import { useEffect, useState } from "react";
import { SkipEndFill, SkipStartFill } from "react-bootstrap-icons";

interface IProps {
  pageSize: number;
  totalCount: number;
  page: number;
  updateSearch: (newPage: number) => void;
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
                display: "flex",
                justifyContent: "center",
                justifySelf: "center",
                alignItems: "center",
              }
            : { display: "none" }
        }
      >
        <p style={{ margin: 0, paddingLeft: "10px", paddingRight: "10px" }}>
          <SkipStartFill
            onClick={() => (page !== 1 ? updateSearch(1) : null)}
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
                      }
                    : { margin: 0, paddingLeft: "10px", paddingRight: "10px" }
                }
                onClick={() => (page !== number ? updateSearch(number) : null)}
              >
                {number}
              </p>
            );
          })}
        <p style={{ margin: 0, paddingLeft: "10px", paddingRight: "10px" }}>
          <SkipEndFill
            onClick={() =>
              page !== amountPages ? updateSearch(amountPages) : null
            }
          >
            &#xF557;
          </SkipEndFill>
        </p>
      </div>
    </>
  );
};
