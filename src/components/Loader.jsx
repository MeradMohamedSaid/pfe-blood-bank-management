import "ldrs/cardio";

const Loader = () => {
  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
          flexDirection: "column",
          rowGap: 10,
        }}
      >
        <l-cardio
          size="50"
          stroke="4"
          speed="1"
          color="rgb(240,7,59)"
        ></l-cardio>
      </div>
    </>
  );
};

export default Loader;
