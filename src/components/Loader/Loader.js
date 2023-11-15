export default function Loader(params) {
  return (
    <div style={{ textAlign: "center", margin: "2rem" }}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
