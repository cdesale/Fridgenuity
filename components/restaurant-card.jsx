export const RestaurantCard = (props) => {
  const { restaurant } = props;
  console.log(props, "from the cards");
  return (
    <>
      <div
        className="card mb-3"
        style={{ border: "2px solid #FF4CE7", padding: "10px" }}
      >
        <div className="card-body">
          <p className="card-title">
            <strong>Restaurant Name: </strong>
            {restaurant.name}
          </p>
          <p className="card-text">
            <strong>Description:</strong> {restaurant.description}
          </p>
          <p className="card-text"> 
            <strong>Cuisine type: </strong>
            {restaurant.cuisines}
          </p>
          <p className="card-text">
            <strong>Address: </strong>
            {restaurant.address}, {restaurant.city}
          </p>
          <img
            src={restaurant.photosUrl}
            className="card-img-top"
            alt={`Photo of ${restaurant.name}`}
          />
        </div>
      </div>
    </>
  );
};
