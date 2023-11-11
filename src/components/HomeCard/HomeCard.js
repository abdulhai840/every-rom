import { useNavigate } from "react-router-dom";

export default function HomeCard({ item, data }) {
  const navigate = useNavigate();
  return (
    <div
      className="card"
      onClick={() =>
        navigate("/roms/" + item?.id, {
          state: data,
        })
      }
    >
      <img src={item?.imgUrl ?? ""} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{item?.name ?? ""}</h5>
      </div>
    </div>
  );
}
