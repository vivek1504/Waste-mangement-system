import React from "react";
import {motion } from "framer-motion";
import { HeroParallax } from "./HeroParallax";
import { useNavigate } from "react-router-dom";

export function HeroParallaxDemo() {
  const navigate = useNavigate();

  return <div>
      <HeroParallax products={products} />
      <div className="flex justify-center space-x-20 mb-32 mt-20 ">
      <motion.button className='border-2 rounded-lg bg-blue-500 font-bold text-xl text-white px-8 py-3'
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:0.2}}
            whileHover={{
            scale:1.2,
            textShadow: "0px 0px 8px rgb(255 255 255)",
            boxShadow:"0px 0px 8px rgb(255 255 255)" }}
            onClick={()=>{
              navigate("/usersignin")
            }}>User Signup</motion.button>

      <motion.button className='border-2 rounded-lg font-bold text-xl bg-blue-500 text-white px-4 py-3'
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:0.2}}
            whileHover={{
            scale:1.2,
            textShadow: "0px 0px 8px rgb(255 255 255)",
            boxShadow:"0px 0px 8px rgb(255 255 255)" }}
            onClick={()=>{
              navigate("/cleanerSignin")
            }}
            >Cleaner Signup</motion.button>


        <button></button>
      </div>
  </div> 



}
export const products = [
  {
    title: "Pune",
    link: "https://www.pmindia.gov.in/en/major_initiatives/swachh-bharat-abhiyan/",
    thumbnail:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzlpkFR77cQCWLg-XGbUa8wxpobnWUp6NbAw&s",
  },
  {
    title: "Mumbai",
    link: "https://www.pmindia.gov.in/en/major_initiatives/swachh-bharat-abhiyan/",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROZZJ2T18xtCugoVtftHhcpfbAsHVmjqrA3Q&s",
  },
  {
    title: "Vadodara",
    link: "https://www.pmindia.gov.in/en/major_initiatives/swachh-bharat-abhiyan/",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj8l_TosrzErPTr5KyMn5t7UsFFp7VGZtEpg&s",
  },

  {
    title: "Nagpur",
    link: "https://www.pmindia.gov.in/en/major_initiatives/swachh-bharat-abhiyan/",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk_vmjNX6z7lk0C1sAA9-i8QhBGcNUMar-SQ&s",
  },
  {
    title: "Ahmedabad",
    link: "https://www.pmindia.gov.in/en/major_initiatives/swachh-bharat-abhiyan/",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEW5YZOngCF1tDvdUscAwJw1MWG2tAmI1rDA&s",
  },
  {
    title: "Delhi",
    link: "https://www.pmindia.gov.in/en/major_initiatives/swachh-bharat-abhiyan/",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfUfaUH9l55zzOQD-xtY7imubKlcFR5TMXMg&s",
  },

  {
    title: "Bengaluru",
    link: "https://www.pmindia.gov.in/en/major_initiatives/swachh-bharat-abhiyan/",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYrCLxebEshC0UaVwiS3QRkDttwjEkiEU3Yck-BNEbjjGTjQIn7NmDtnt_UJqWfKSFZRY&usqp=CAU",
  },
  {
    title: "Chennai",
    link: "https://www.pmindia.gov.in/en/major_initiatives/swachh-bharat-abhiyan/",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqwDgc1ZB1fwlGE3ywBIZ54j2N5P1NepCbYHSLQ6k2gb1nQbia9mbaS6b0NnYOSKFgLO8&usqp=CAU",
  },
  {
    title: "Hyderabad",
    link: "https://www.pmindia.gov.in/en/major_initiatives/swachh-bharat-abhiyan/",
    thumbnail:
      "https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/6479d485918549001d666aaf.jpg",
  },
  {
    title: "Kolkata",
    link: "https://www.pmindia.gov.in/en/major_initiatives/swachh-bharat-abhiyan/",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPgGZGvxG-CUe_eAYnm29w2yVAoi6pyo3t9aIbiT9HYl7lc8owTreeYwhIVft9z4rLiRo&usqp=CAU",
  },
  {
    title: "Surat",
    link: "https://www.pmindia.gov.in/en/major_initiatives/swachh-bharat-abhiyan/",
    thumbnail:
      "https://dailyasianage.com/library/1580758482_8.jpg",
  },

  {
    title: "Jaipur",
    link: "https://www.pmindia.gov.in/en/major_initiatives/swachh-bharat-abhiyan/",
    thumbnail:
      "https://img.freepik.com/premium-photo/choked-urban-drain-filled-with-trash-causing-water-logging-urban-flooding_1045156-29491.jpg",
  },
  {
    title: "Lucknow",
    link: "https://www.pmindia.gov.in/en/major_initiatives/swachh-bharat-abhiyan/",
    thumbnail:
      "https://sc0.blr1.digitaloceanspaces.com/large/883236-rtezvyhnea-1529404179.jpg",
  },
  {
    title: "Kanpur",
    link: "https://www.pmindia.gov.in/en/major_initiatives/swachh-bharat-abhiyan/",
    thumbnail:
      "https://scx2.b-cdn.net/gfx/news/2022/an-estimated-242-milli.jpg",
  },
  {
    title: "Thane",
    link: "https://www.pmindia.gov.in/en/major_initiatives/swachh-bharat-abhiyan/",
    thumbnail:
      "https://www.worldbank.org/content/dam/photos/780x439/2022/may/Malaysia-Islands.jpg",
  },
];
