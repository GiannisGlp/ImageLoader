import useFetchImage from "./useFetchImage";
import "./App.css";

const App = () => {
  const { loading, image, error, onClickImageHandler } = useFetchImage();

  return (
    <div className="App">
      {loading && <div className="loading"></div>}
      <div className="imageWrapper" onClick={onClickImageHandler}>
        {image?.urls && !error && (
          <img
            src={image.urls.regular}
            className="image"
            style={{
              filter: `blur(${loading ? "5" : "0"}px)`,
              boxShadow: `-25px 19px 18px -14px ${
                image.color || "rgba(0,0,0,0.75)"
              }`,
            }}
            alt={image.alt_description || "Random Image from Unsplash"}
          />
        )}
        {error && !loading && <h2 className="errorText">{error}</h2>}
      </div>
    </div>
  );
};

export default App;
