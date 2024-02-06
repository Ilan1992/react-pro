import React from 'react'
import Typography from '@mui/material/Typography'
import imgAnimation from "../../assets/imgs/Animation - 1706807422919.gif"

const AboutUsPage = () => {
  return (
    <>
      <Typography variant="h1" align={"center"} color="initial" sx={{ mt: 15 }}>
        About Us...
      </Typography>
      <Typography align={"center"} variant="h6">
        Welcome to our platform, where creativity meets professionalism! At our
        site, you have the power to craft compelling business cards that
        uniquely represent your brand and leave a lasting impression. We
        understand the significance of a well-designed business card in making a
        memorable introduction, and that's why we provide you with intuitive
        tools to unleash your creativity. Our user-friendly interface empowers
        you to personalize every aspect of your business card, from the layout
        and colors to the font and imagery. Whether you're an entrepreneur,
        freelancer, or established business owner, our platform caters to your
        diverse needs. Stand out from the crowd by incorporating your brand
        identity, logo, and contact information seamlessly into your business
        card design. Impress clients, collaborators, and potential partners with
        a card that reflects your professionalism and attention to detail. Join
        our community of forward-thinkers and elevate your networking game.
        Create business cards that not only convey essential information but
        also embody the essence of your business. Start designing today and
        leave a lasting impression that opens doors to new opportunities. Your
        journey to a standout business card begins here!
      </Typography>
      <Typography align={"center"} sx={{mb:8}}>
        <img src={imgAnimation} alt="Animation" />
      </Typography>
    </>
  );
}

export default AboutUsPage