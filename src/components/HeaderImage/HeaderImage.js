
import { useNavigate } from "react-router-dom";
import headerImg from "../../assets/header.jpg";

export default function HeaderImage(params) {
    const navigate = useNavigate();
    return(
        <div className="py-0 d-flex justify-content-center">
        <img
          src={headerImg}
          alt=""
          onClick={()=>navigate("/")}
          style={{ height: "20vh" }}
        //   width={"500px"}
        />
      </div>
    )
}