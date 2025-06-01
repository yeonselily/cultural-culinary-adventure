import '../../styles/users/Profile.css';
import React, { useEffect, useState, useRef } from 'react';
import countries from 'world-countries';
import Header from '../Header';


function Profile() {
  const [avatar, setAvatar] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  const [username, setUsername] = useState("username");
  const [name, Name] = useState("Full Name");
  const [bio, setBio] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vel mi et sapien sagittis vestibulum. Mauris tristique ipsum nec ex convallis, vitae pharetra sem molestie. Mauris mi mauris, mattis sagittis vestibulum in, ultrices sed neque.");
  const [website, setWebsite] = useState("https://ayleenpt.github.io/cultural-culinary-adventure/");
  const [professions, setProfessions] = useState(["Chef", "Food Blogger"]);
  const [diets, setDiets] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [country, setCountry] = useState("United States");
  const [state, setState] = useState("Washington");

  const selectedCountry = countries.find(c => c.name.common.toLowerCase() === country.toLowerCase());
  const countryCode = selectedCountry ? selectedCountry.cca2.toLowerCase() : null;
  const flagUrl = countryCode ? `https://flagcdn.com/w40/${countryCode}.png` : null;


  const images = [
    { src: "https://media.glamour.com/photos/6801386a77591b9b0b66728b/1:1/w_1440,h_1440,c_limit/MixCollage-17-Apr-2025-01-20-PM-6718.jpg", link: "https://www.glamour.com/gallery/best-trending-nail-designs" },
    { src: "https://maniology.com/cdn/shop/articles/Frenchy_Spring_stamping_bundle_by_jbunny_dips_d07c52dc-679c-4435-a153-f07cfe28931f_1024x1024.png?v=1744478173", link: "https://maniology.com/blogs/maniology-blog/natural-looking-nail-designs" },
    { src: "https://www.realsimple.com/thmb/sS8oyzSufgOE7CYzIh1GEGhqd2Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/nail-trends-big-in-2025-e9e6e2fdc2c4466da0f0d701d4c5c988.jpg", link: "https://www.realsimple.com/2025-nail-trends-8770806" },
  ];

  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="profile">
      <Header />

      <div className="user-info">
        <div className="non-bio-stack">
          <div className="non-bio-left">
            <img src={avatar} alt="Profile Pic" className="avatar" />
            <div className="name-pro-website-stack">
              <div className="name-pro-stack">
                <div className="name-stack">
                  <div className="name">{name}</div>
                  <div className="username">{username}</div>
                </div>
                <div className="professions">
                  {professions.map((profession) => {
                    return (
                      <div key={profession} className="profession">
                        {profession}
                      </div>
                    );
                  })}
                </div>
              </div>
                <a href={website}>{website}</a>
            </div>
          </div>

          <div className="country">
            {flagUrl && <img src={flagUrl} alt={`${country} flag`} className="flag" />}
            <div className="country-name">{country}</div>
            <div className="state-name">{state}</div>
          </div>
        </div>

        <div className="bio">{bio}</div>
      </div>

      <div className="food-info">
        <div className="diets">
          Diets
        </div>
        <div className="fridge-ingredients">
          Fridge Ingredients
        </div>
        <div className="allergies">
          Allergies
        </div>
      </div>

    </div>
  );
}
export default Profile;
