import React, { useState } from "react";
import tw from "tailwind-styled-components";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

const Search = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");

  return (
    <Wrapper>
      <Head>
        <title>Enter Locations</title>
      </Head>
      <Link href="/" passHref>
        <ButtonContainer>
          <BackButton src="https://img.icons8.com/ios-filled/100/000000/left.png" />
        </ButtonContainer>
      </Link>
      <InputContainer>
        <FromToIcons>
          <Circle src="https://img.icons8.com/ios-filled/50/9CA3AF/filled-circle.png" />
          <Line src="https://img.icons8.com/ios-filled/50/9CA3AF/vertical-line.png" />
          <Square src="https://img.icons8.com/material-sharp/50/000000/unchecked-checkbox.png" />
        </FromToIcons>
        <InputBoxes>
          <Input
            placeholder="Enter Pickup Location"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
          />
          <Input
            placeholder="Where To?"
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
          />
        </InputBoxes>
        <PlusIcon src="https://img.icons8.com/ios/10000/000000/plus-math.png" />
      </InputContainer>
      <SavedPlaces>
        <StarIcon src="https://img.icons8.com/external-bearicons-glyph-bearicons/2x/external-Star-essential-collection-bearicons-glyph-bearicons.png" />
        <p>Saved Places</p>
      </SavedPlaces>
      {pickupLocation == "" || dropoffLocation == "" ? (
        <ConfirmLocation>
          <Img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif"
            alt=""
          />
        </ConfirmLocation>
      ) : (
        <Link
          passHref
          href={{
            pathname: "/confirm",
            query: { pickup: pickupLocation, dropoff: dropoffLocation },
          }}
        >
          <ConfirmLocation>Confirm Location</ConfirmLocation>
        </Link>
      )}
    </Wrapper>
  );
};

const Wrapper = tw.div`
bg-gray-200 h-screen
`;

const ButtonContainer = tw.div`
    bg-white px-4
`;

const BackButton = tw.img`h-12 cursor-pointer`;

const Circle = tw.img`h-2.5`;
const Line = tw.img`h-10`;
const Square = tw.img`h-3`;

const FromToIcons = tw.div`
w-10 flex flex-col items-center justify-center select-none
`;

const InputContainer = tw.div`
bg-white mt-5 p-4 flex justify-around items-center mb-2
`;

const InputBoxes = tw.div`
flex flex-col flex-1 ml-5
`;

const Input = tw.input`
h-10 bg-gray-200 p-2 m-2 rounded-sm outline-none
`;

const PlusIcon = tw.img`
    w-10 h-10 bg-gray-200 rounded-full ml-3
`;

const SavedPlaces = tw.div`
    bg-white p-4 mt-5 flex justify-center items-center mb-2
`;

const StarIcon = tw.img`
    w-10 h-10 bg-gray-200 rounded-full ml-3 mr-3
`;

const ConfirmLocation = tw.div`
    bg-gray-900 p-4 mt-5 flex justify-center items-center mx-5 text-white select-none text-3xl cursor-pointer hover:bg-black transition rounded-lg shadow-lg
`;

const Img = tw.img`
  h-12
`;

export default Search;
