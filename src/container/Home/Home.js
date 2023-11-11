import { useRef, useState } from "react";
import useGoogleSheets from "use-google-sheets";
import HomeCard from "../../components/HomeCard/HomeCard";
export default function Home() {
  const { data, loading, error, refetch } = useGoogleSheets({
    apiKey: "AIzaSyCOcflgsV7ljl6RsC_QVgo6Z27Ip6WxnrY",
    sheetId: "17AcfUqr1LGfh1mBsmRBYlhqMEqWCRArUwGaNAs9BAC8",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const containerRef = useRef(null);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const filteredData = data[0]?.data?.filter((item) =>
    item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedArray = data[0]?.data?.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
  const filteredSortedArray = filteredData?.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
  const handleClickScroll = (id) => {
    console.log("idd", id);
    const element = document.getElementById(id);
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <h3 className="text-center"> List of Consoles</h3>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <select
        value={selectedLetter}
        onChange={(e) => handleClickScroll(e.target.value)}
      >
        <option value="">Select a letter</option>
        {alphabet.split("").map((letter) => (
          <option key={letter} value={letter}>
            {letter}
          </option>
        ))}
      </select>
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="col-10 mx-auto row g-3">
          {searchTerm === "" ? (
            <>
              {sortedArray?.map((item, index) => {
                return (
                  <div
                    ref={containerRef}
                    className="col-md-4 col-12"
                    key={index}
                    id={item?.name?.charAt(0)}
                  >
                    <HomeCard item={item} data={data} />
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {filteredSortedArray?.map((item, index) => {
                return (
                  <div className="col-md-4 col-12" key={index}>
                    <HomeCard item={item} data={data} />
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}
    </>
  );
}
