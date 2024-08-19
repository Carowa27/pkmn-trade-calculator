export const SearchModal = () => {
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
              justifyContent: "end",
            }}
          >
            <div style={{ margin: "20px" }}>X</div>
          </section>
          <section className="modalBody"></section>
          <section className="modalFooter"></section>
        </article>
      </section>
    </>
  );
};
