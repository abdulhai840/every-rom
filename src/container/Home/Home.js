import { useEffect, useRef, useState } from "react";
import useGoogleSheets from "use-google-sheets";
import HomeCard from "../../components/HomeCard/HomeCard";
import top from "../../assets/top.png";
import Loader from "../../components/Loader/Loader";
import HeaderImage from "../../components/HeaderImage/HeaderImage";
import { Adsense } from "@ctrl/react-adsense";
export default function Home() {
  const { data, loading, error, refetch } = useGoogleSheets({
    apiKey: "AIzaSyCOcflgsV7ljl6RsC_QVgo6Z27Ip6WxnrY",
    sheetId: "17AcfUqr1LGfh1mBsmRBYlhqMEqWCRArUwGaNAs9BAC8",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [visible, setVisible] = useState(false);
  const [isSticky, setSticky] = useState(false);
  //   const [arrayData, setArrayData] =useState([]);
  // console.log('arraydata',arrayData);
  //   useEffect(()=>{
  // if(data){
  //   localStorage?.setItem("data", JSON.stringify(data))
  // }
  //   },[data])
  //   useEffect(()=>{
  // if(localStorage?.getItem("data")){
  //   setArrayData(localStorage?.getItem("data"))
  // }
  // else{
  //   setArrayData(data)
  // }
  //   },[arrayData,data,localStorage.getItem("data")])
  // const loadAds = () => {
  //   console.log("adss", window.adsbygoogle);
  //   try {
  //     if (
  //       // typeof window !== "undefined" &&
  //       window.adsbygoogle &&
  //       !window.adsbygoogle.loaded
  //     ) {
  //       (window.adsbygoogle = window.adsbygoogle || []).push({});
  //     }
  //   } catch (error) {
  //     console.log("adsense error", error.message);
  //   }
  // };

  // useEffect(() => {
  //   loadAds();
  // }, []);
  const containerRef = useRef(null);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
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
    // Check if the AdSense script is already loaded
    if (!window.adsbygoogle || !window.adsbygoogle.loaded) {
      // Load AdSense script asynchronously
      const script = document.createElement("script");
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6000366931226304";
      script.async = true;
      document.body.appendChild(script);

      // Set a flag indicating that the script has been loaded
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.loaded = true;
    }
    console.log("add", window.adsbygoogle);
    // Initialize AdSense
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);
  return (
    <div>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6000366931226304"
        data-ad-slot="5314152846"
        data-ad-format="auto"
      ></ins>
    </div>
    // <Adsense client="ca-pub-6000366931226304" slot="5314152846" />

    //     <amp-ad
    //       width="100vw"
    //       height="320"
    //       type="adsense"
    //       data-ad-client="ca-pub-6000366931226304"
    //       data-ad-slot="5314152846"
    //       data-auto-format="rspv"
    //       data-full-width=""
    //     >
    //       <div overflow=""></div>
    //     </amp-ad>
    // <>

    //   <div className={` divSticky ${isSticky ? "sticky" : ""}`}>
    //     <HeaderImage />
    //     <div className="col-md-6 col-11 mx-auto py-3">
    //       <input
    //         type="text"
    //         className="form-control"
    //         placeholder="Search consoles here..."
    //         value={searchTerm}
    //         onChange={handleSearch}
    //       />
    //     </div>
    //     <div
    //       style={{
    //         backgroundColor: "#D0D4CA",
    //         textAlign: "center",
    //         display: "flex",
    //         justifyContent: "space-between",
    //         overflowX: "auto",
    //       }}
    //     >
    //       {alphabet.split("").map((letter) => (
    //         <button
    //           className="border-0 m-2 rounded text-center"
    //           type="button"
    //           onClick={() => handleClickScroll(letter)}
    //           style={{ minWidth: "2rem" }}
    //         >
    //           {letter}
    //         </button>
    //       ))}
    //     </div>
    //   </div>
    //   {/* <h3 className="text-center my-3"> List of Consoles</h3> */}

    //   {loading ? (
    //     <Loader />
    //   ) : (
    //     <>
    //       <div className="col-10 mx-auto row g-3 my-3">
    //         {searchTerm === "" ? (
    //           <>
    //             {sortedArray?.length > 0 ? (
    //               sortedArray?.map((item, index) => {
    //                 return (
    //                   <div
    //                     ref={containerRef}
    //                     className="col-md-4 col-12"
    //                     key={index}
    //                     id={item?.name?.charAt(0)}
    //                   >
    //                     <HomeCard item={item} data={data} />
    //                   </div>
    //                 );
    //               })
    //             ) : (
    //               <h3 className="text-center py-3">No Data Found</h3>
    //             )}
    //           </>
    //         ) : (
    //           <>
    //             {filteredSortedArray?.length > 0 ? (
    //               filteredSortedArray?.map((item, index) => {
    //                 return (
    //                   <div className="col-md-4 col-12 py-2" key={index}>
    //                     <HomeCard item={item} data={data} />
    //                   </div>
    //                 );
    //               })
    //             ) : (
    //               <h3 className="text-center py-3">No Data Found</h3>
    //             )}
    //           </>
    //         )}
    //       </div>
    //       {visible && (
    //         <button
    //           onClick={() => {
    //             window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    //           }}
    //           style={{
    //             position: "fixed",
    //             fontSize: "20px",
    //             bottom: "40px",
    //             right: "40px",
    //             textAlign: "center",
    //             border: "none",
    //             background: "none",
    //           }}
    //         >
    //           {" "}
    //           <img src={top} width={40} alt="" />
    //         </button>
    //       )}
    //     </>
    //   )}
    // </>
  );
}
