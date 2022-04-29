import { useEffect, useState } from "react";

const URL =
  "https://api.unsplash.com/photos/random?client_id=_4H5tIGVyId1NGzaqySNOQ0JYsiZgDJEjYXOlHzzTCQ";
const useFetchImage = () => {
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState({});
  const [error, setError] = useState("");

  const onClickImageHandler = () => {
    setError("");
    setLoading(true);
  };

  useEffect(() => {
    if (loading) {
      const timerLoading = setTimeout(async () => {
        await fetch(URL)
          .then((response) => {
            if (response.status === 401) {
              setError("Invalid Access Token");
            }
            if (response.status === 403) {
              setError("Rate Limit Exceeded, try again later");
            }
            if (response.status === 404) {
              setError("Image not found, try again later");
            }
            if (
              response.status === 500 ||
              response.status === 503 ||
              response.status === 400
            ) {
              setError("Something went wrong, try again later");
            } else return response.json();
          })
          .then((data) => {
            if (data) {
              setImage(data);
            } else {
              setImage({});
            }
          })
          .catch((error) => setError("Something went wrong, try again later"));
        setLoading(false);
      }, 2000);

      return () => {
        clearTimeout(timerLoading);
      };
    }
  }, [loading]);

  return { loading, image, error, onClickImageHandler };
};

export default useFetchImage;
