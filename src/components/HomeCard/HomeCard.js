import { useNavigate } from "react-router-dom";
import downloadImg from "../../assets/download.png";

export default function HomeCard({ item, data, download }) {
  const navigate = useNavigate();
  return (
    <div
      className="card "
      onClick={() =>
        !download &&
        navigate("/roms/" + item?.name, {
          state: data,
        })
      }
      role= {!download && "button"}
      style={{ height: download ? "19rem" : "17rem" }}
    >
      <img
        src={item?.imgUrl ?? ""}
        style={{
          minHeight: "200px",
          maxHeight: "200px",
          padding: "0.5rem",
          borderRadius: "8px",
        }}
        alt=""
      />
      <div className="card-body d-flex flex-column justify-content-between align-items-center">
        <h5 className="card-title text-center">{item?.name ?? ""}</h5>
        {download && (
          <a target="_blank" rel="noopener noreferrer" href={item?.downloadURL}>
            <img src={downloadImg} width={30} alt="" />
          </a>
        )}
      </div>
    </div>
  );
}
