
import headerImg from "../../assets/header.jpg";

export default function HeaderImage(params) {
    return(
        <div className="py-0 d-flex justify-content-center">
        <img
          src={headerImg}
          alt=""
          style={{ height: "20vh" }}
        //   width={"500px"}
        />
      </div>
    )
}