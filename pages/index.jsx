import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import mapboxgl from "mapbox-gl";
import Map from "./components/Map";
import Link from "next/link";
import Head from "next/head";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import router, { useRouter } from "next/router";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWRpb24iLCJhIjoiY2t2aWJ3MmZqNGhsNDJybHVwY2ZiZXRtaSJ9.FUhkRv84vCMJcyHgOeB7Dw";

export default function Home() {
  // longitude and latitude of India
  const [long, setLong] = useState(-99.29011);
  const [lat, setLat] = useState(34.39172);

  const [user, setUser] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user.displayName,
          photoUrl: user.photoURL,
        });
      } else {
        setUser(null);
        router.push("/login");
      }
    });
  }, []);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      // style: "mapbox://styles/mapbox/light-v10",
      style: "mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph",
      center: [long, lat],
      zoom: 3,
    });
  });

  return (
    <Wrapper>
      <Head>
        <title>Welcome to UberNext</title>
      </Head>
      <Map id="map"></Map>
      <ActionItems>
        <Header>
          <UberLogo src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg" />
          <Profile>
            <Name>{user && user.name}</Name>
            <abbr title="SignOut" style={{ cursor: "pointer" }}>
              <UserImg
                src={user && user.photoUrl}
                onClick={() => signOut(auth)}
              />
            </abbr>
          </Profile>
        </Header>
        <ActionButtons>
          <Link href="/search" passHref>
            <ActionButton>
              <ActionButtonImage src="https://i.ibb.co/cyvcpfF/uberx.png" />
              Ride
            </ActionButton>
          </Link>
          <Link href="/search" passHref>
            <ActionButton>
              <ActionButtonImage src="https://i.ibb.co/n776JLm/bike.png" />
              Two Wheeler
            </ActionButton>
          </Link>
          <Link href="/search" passHref>
            <ActionButton>
              <ActionButtonImage src="https://i.ibb.co/5RjchBg/uberschedule.png" />
              Reserve
            </ActionButton>
          </Link>
        </ActionButtons>
        <InputButton>Where To?</InputButton>
      </ActionItems>
    </Wrapper>
  );
}

const Wrapper = tw.div`
  flex flex-col h-screen
`;

const ActionItems = tw.div`
  bg-white flex-1 rounded-lg shadow-lg p-4
`;

const Header = tw.div`
flex justify-between items-center
`;

const UberLogo = tw.img`
h-28 
`;

const Profile = tw.div`
flex items-center
`;

const Name = tw.div`
mr-4 w-20 text-sm
`;

const UserImg = tw.img`
  h-12 w-12 rounded-full border-gray-200 p-px
`;

const ActionButtons = tw.div`
  flex
`;

const ActionButton = tw.div`
  bg-gray-300 rounded-lg p-2 pointer flex items-center justify-center text-xl select-none text-gray-700 hover:bg-gray-400 hover:text-gray-900 hover:shadow-lg transition duration-200 cursor-pointer transform hover:-translate-y-1 hover:scale-105 flex-col flex-1 mx-5 my-4 px-4
`;

const ActionButtonImage = tw.img`
  h-3/5
`;

const InputButton = tw.div`
  h-20 bg-gray-200 text-2xl flex items-center justify-center text-gray-700 rounded-lg shadow-lg p-2 cursor-pointer select-none
`;
