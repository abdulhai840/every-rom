import { useLocation, useParams } from "react-router-dom";
import AdSense from "react-adsense";
import { useRef, useState } from "react";
import HomeCard from "../../components/HomeCard/HomeCard";

export default function RomDetail() {
  const { state } = useLocation();
  const params = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const containerRef = useRef(null);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const data = state?.find(
    (item) => params?.id === item?.id?.split("~")[0]
  )?.data;
  console.log("data", data);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const filteredData = data?.filter((item) =>
    item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log("filtered", filteredData);
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
    <div>
      <div className="col-10 mx-auto row g-3">
        <h3 className="text-center">
          {state?.find((item) => params?.id === item?.id?.split("~")[0])?.id ??
            ""}
        </h3>
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
        {searchTerm === ""
          ? data?.map((item, index) => {
              return (
                <div
                  className="col-md-4 col-12"
                  key={index}
                  ref={containerRef}
                  id={item?.name?.charAt(0)}
                >
                  <HomeCard data={data} item={item} key={item?.id} />
                </div>
              );
            })
          : filteredSortedArray?.map((item, index) => {
              return (
                <div
                  className="col-md-4 col-12"
                  key={index}
                  ref={containerRef}
                  id={item?.name?.charAt(0)}
                >
                  <HomeCard data={data} item={item} key={item?.id} />
                </div>
              );
            })}
      </div>
    </div>
  );
}
