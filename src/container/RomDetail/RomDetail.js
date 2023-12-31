import { useLocation, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import HomeCard from "../../components/HomeCard/HomeCard";
import top from "../../assets/top.png";
import useGoogleSheets from "use-google-sheets";
import Loader from "../../components/Loader/Loader";
import HeaderImage from "../../components/HeaderImage/HeaderImage";

export default function RomDetail() {
  const { state } = useLocation();
  const params = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSticky, setSticky] = useState(false);
  const [visible, setVisible] = useState(false);
  const [stateData, setStateData] = useState([]);
  const containerRef = useRef(null);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const {
    data: newData,
    loading,
    error,
    refetch,
  } = useGoogleSheets({
    apiKey: "AIzaSyCOcflgsV7ljl6RsC_QVgo6Z27Ip6WxnrY",
    sheetId: "17AcfUqr1LGfh1mBsmRBYlhqMEqWCRArUwGaNAs9BAC8",
  });
  const updated = state === null ? stateData : state;
  const data = updated?.find(
    (item) => params?.id === item?.id?.split("~")[1]
  )?.data;
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const filteredData = data?.filter((item) =>
    item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredSortedArray = filteredData?.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
  const handleClickScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  window.addEventListener("scroll", toggleVisible);
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;

      // You can adjust the offset value based on your layout
      if (offset > 300) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  useEffect(() => {
    if (state === null) {
      setStateData(newData);
    } else {
      setStateData(state);
    }
  }, [newData, stateData,state]);
  return (
    <>
      <div className={` divSticky ${isSticky ? "sticky" : ""}`}>
        <HeaderImage/>
            <div className="col-md-6 col-11 mx-auto py-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
        <div
          style={{
            backgroundColor: "#D0D4CA",
            textAlign: "center",
            display: "flex",
            justifyContent: "space-between",
            overflowX: "auto",
          }}
        >
          {alphabet.split("").map((letter) => (
            <button
              className="border-0 m-2 rounded text-center"
              type="button"
              onClick={() => handleClickScroll(letter)}
              style={{ minWidth: "2rem" }}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
      <div>
        {loading ? (
          <Loader />
        ) : (
          <div className="col-10 mx-auto row g-3">
            <h3 className="text-center py-3">
              {updated
                ?.find((item) => params?.id === item?.id?.split("~")[1])
                ?.id?.split("~")[1] ?? ""}
            </h3>{" "}
            <div className="row">
              {searchTerm === "" ? (
                <>
                  {data?.length > 0 ? (
                    data?.map((item, index) => {
                      return (
                        <div
                          className="col-md-4 col-12 py-3"
                          key={index}
                          ref={containerRef}
                          id={item?.name?.charAt(0)}
                        >
                          <HomeCard
                            download={true}
                            data={data}
                            item={item}
                            key={item?.id}
                          />
                        </div>
                      );
                    })
                  ) : (
                    <h3 className="text-center py-3">No Data Found</h3>
                  )}
                </>
              ) : (
                <>
                  {filteredSortedArray?.length > 0 ? (
                    filteredSortedArray?.map((item, index) => {
                      return (
                        <div
                          className="col-md-4 col-12 py-3"
                          key={index}
                          ref={containerRef}
                          id={item?.name?.charAt(0)}
                        >
                          <HomeCard
                            download={true}
                            data={data}
                            item={item}
                            key={item?.id}
                          />
                        </div>
                      );
                    })
                  ) : (
                    <h3 className="text-center py-3">No Data Found</h3>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {visible && (
        <button
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
          style={{
            position: "fixed",
            fontSize: "20px",
            bottom: "40px",
            right: "40px",
            textAlign: "center",
            border: "none",
            background: "none",
          }}
        >
          {" "}
          <img src={top} width={40} alt="" />
        </button>
      )}
    </>
  );
}
