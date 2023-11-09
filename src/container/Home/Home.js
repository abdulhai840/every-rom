import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGoogleSheets from "use-google-sheets";
export default function Home() {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useGoogleSheets({
    apiKey: "AIzaSyCOcflgsV7ljl6RsC_QVgo6Z27Ip6WxnrY",
    sheetId: "17AcfUqr1LGfh1mBsmRBYlhqMEqWCRArUwGaNAs9BAC8",
  });
  console.log("error", error);
  console.log("data", data);
  return (
    <>
      <h3 className="text-center"> List of Consoles</h3>
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="col-10 mx-auto row g-3">
          {data[0]?.data?.map((item, index) => {
            return (
              <div className="col-md-4 col-12" key={index}>
                <div
                  className="card"
                  onClick={() =>
                    navigate("/roms/" + item?.id, {
                      state: data,
                    })
                  }
                >
                  <img
                    src={item?.imgUrl ?? ""}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item?.name ?? ""}</h5>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
