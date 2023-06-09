import useFetch from "../../hooks/useFetch";
import style from "./propertyList.module.css";

const PropertyList = () => {
  // const { data, loading, error } = useFetch("/hotels/countByType");
  const loading = false;
  const data = [
    {
      type: "Apartments",
      count: 100,
    },
    {
      type: "Resorts",
      count: 100,
    },
    {
      type: "Villas",
      count: 100,
    },
    {
      type: "Chalets",
      count: 100,
    },
    {
      type: "Chalets",
      count: 100,
    },
  ];

  const imageFilenames = [
    "1 bed.jpg",
    "1 bed2.jpg",
    "1 bed3.jpg",
    "2 beds.jpg",
    "2 bed1.jpg",
  ];

  const images = imageFilenames.map((filename) => require(`./images/${filename}`).default);

  return (
    <div className={style.pList}>
      {loading ? (
        "loading"
      ) : (
        <>
          {data &&
            images.map((img, i) => (
              <div className={style.pListItem} key={i}>
                <img src={img} alt="" className={style.pListImg} />
                <div className={style.pListTitles}>
                  <h1>{data[i]?.type}</h1>
                  <h2>
                    {data[i]?.count} {data[i]?.type}
                  </h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
