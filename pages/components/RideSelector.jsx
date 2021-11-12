import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";

const carList = [
  {
    imgUrl: "https://i.ibb.co/cyvcpfF/uberx.png",
    service: "UberX",
    multiplier: 1,
  },
  {
    imgUrl: "https://i.ibb.co/YDYMKny/uberxl.png",
    service: "UberXL",
    multiplier: 1.5,
  },
  {
    imgUrl: "https://i.ibb.co/Xx4G91m/uberblack.png",
    service: "Black",
    multiplier: 2,
  },
  {
    imgUrl: "https://i.ibb.co/cyvcpfF/uberx.png",
    service: "Comfort",
    multiplier: 1.2,
  },
  {
    imgUrl: " https://i.ibb.co/1nStPWT/uberblacksuv.png",
    service: "Black SUV",
    multiplier: 2.8,
  },
];

const RideSelector = ({ pickup, dropoff }) => {
  const [rideDuration, setRideDuration] = useState(0);

  // get ride duration from mapbox api
  useEffect(() => {
    fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${pickup[0]},${pickup[1]};${dropoff[0]},${dropoff[1]}?access_token=pk.eyJ1IjoiYWRpb24iLCJhIjoiY2t2aWJ3MmZqNGhsNDJybHVwY2ZiZXRtaSJ9.FUhkRv84vCMJcyHgOeB7Dw`
    )
      .then((res) => res.json())
      .then((data) => {
        setRideDuration(data.routes[0].duration / 100);
      });
  }, [pickup, dropoff]);
  return (
    <Wrapper>
      <Title>Choose a ride, or swipe up for more</Title>
      <CarList>
        {carList.map((car, index) => (
          <Car key={index}>
            <CarImage src={car.imgUrl} />
            <CarDetails>
              <Service>{car.service}</Service>
              <Time>5 mins away</Time>
            </CarDetails>
            <Price>{"$" + (rideDuration * car.multiplier).toFixed(2)}</Price>
          </Car>
        ))}
      </CarList>
    </Wrapper>
  );
};

const Wrapper = tw.div`
    flex-1 overflow-y-scroll flex flex-col
`;

const Car = tw.div` flex p-4 items-center border-b`;

const CarDetails = tw.div`flex-1`;
const Service = tw.div`font-medium`;
const Time = tw.div`text-xs text-blue-500`;
const Price = tw.div`text-sm`;

const CarImage = tw.img`
h-14 mr-4
`;

const Title = tw.div`
    text-gray-500 text-center text-sm py-2 border-b
`;

const CarList = tw.div`
overflow-y-scroll
`;

export default RideSelector;
