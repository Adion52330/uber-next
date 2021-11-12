import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Map from "./components/Map";
import { useRouter } from "next/router";
import Link from "next/link";
import RideSelector from "./components/RideSelector";
import Head from "next/head";

const Confirm = () => {
  const router = useRouter();
  const { pickup, dropoff } = router.query;

  const [pickupCoordinates, setPickupCoordinates] = useState([0, 0]);
  const [dropoffCoordinates, setDropoffCoordinates] = useState([0, 0]);

  const getPickupCoordinates = (pickUp) => {
    const pickup = pickUp;
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoiYWRpb24iLCJhIjoiY2t2aWJ3MmZqNGhsNDJybHVwY2ZiZXRtaSJ9.FUhkRv84vCMJcyHgOeB7Dw",
          limit: 1,
        })
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.features);
        setPickupCoordinates(data.features[0].center);
      });
  };
  const getDropOffCoordinates = (dropOff) => {
    const dropoff = dropOff;
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoiYWRpb24iLCJhIjoiY2t2aWJ3MmZqNGhsNDJybHVwY2ZiZXRtaSJ9.FUhkRv84vCMJcyHgOeB7Dw",
          limit: 1,
        })
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.features[0].center);
        setDropoffCoordinates(data.features[0].center);
      });
  };

  useEffect(() => {
    getPickupCoordinates(pickup);
    getDropOffCoordinates(dropoff);
  }, [pickup, dropoff]);

  return (
    <Wrapper>
      <Head>
        <title>Confirm Location</title>
      </Head>
      <Link href="/search" passHref>
        <ButtonContainer>
          <BackButton src="https://img.icons8.com/ios-filled/100/000000/left.png" />
        </ButtonContainer>
      </Link>
      <Map pickup={pickupCoordinates} dropoff={dropoffCoordinates} />
      <RightContainer>
        <RideSelector pickup={pickupCoordinates} dropoff={dropoffCoordinates} />
        {/* Confirm Button */}
      </RightContainer>
      <ConfirmButtonContainer>
        <ConfirmButton>Confirm Ride</ConfirmButton>
      </ConfirmButtonContainer>
    </Wrapper>
  );
};

const ButtonContainer = tw.div`
    bg-white shadow-md hover:bg-gray-200 transition absolute top-4 left-4 z-10 rounded-full
`;

const BackButton = tw.img`h-12 cursor-pointer`;

const Wrapper = tw.div`
    flex h-screen flex-col 
`;

const RightContainer = tw.div`
 flex-1 flex flex-col h-1/2
`;

const ConfirmButtonContainer = tw.div`
  border-t-2
`;

const ConfirmButton = tw.div`
 bg-gray-900 text-white text-center text-xl my-4 mx-4 p-4 shadow-lg rounded-lg hover:bg-gray-800 cursor-pointer
`;

export default Confirm;
