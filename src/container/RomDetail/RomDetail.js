import { useLocation, useParams } from "react-router-dom";

export default function RomDetail() {
  const { state } = useLocation();
  const params = useParams();

  console.log("state", state);
  console.log(
    "idd",
    state?.find((item) => params?.id === item?.id?.split("~")[0])
  );

  //   const handleDownload = (imageName, imageUrl) => {
  //     var element = document.createElement("a");
  //     var file = new Blob([imageUrl], { type: "image/*" });
  //     element.href = URL.createObjectURL(file);
  //     element.download = "image.png";
  //     element.click();
  //   };
  return (
    <div>
      <div className="col-10 mx-auto row g-3">
        <h3 className="text-center">{state?.find((item) => params?.id === item?.id?.split("~")[0])?.id ?? ""}</h3>
        {state?.length > 0 &&
          state
            ?.find((item) => params?.id === item?.id?.split("~")[0])
            ?.data?.map((item, index) => {
              return (
                <div className="col-md-4 col-12" key={index}>
                  <div className="card">
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
        {/* {state?.length > 0 ? (
          state?.find((item) => params?.id===item?.id?.split("~")[0])?.((item, index) => {
            console.log("item", item);
            return (
                <></>
            //   <div className="col-md-4 col-12" key={index}>
            //     <div className="card">
            //       <img
            //         src={item?.imgUrl ?? ""}
            //         className="card-img-top"
            //         alt="..."
            //       />
            //       <div className="card-body">
            //         <h5 className="card-title">{item?.name ?? ""}</h5>
            //       </div>
            //     </div>
            //   </div>
            );
          })
        ) : (
          <h3 className="text-center">No Data Found</h3>
        )} */}
      </div>
    </div>
  );
}
