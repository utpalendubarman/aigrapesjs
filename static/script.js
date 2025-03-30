default_html=`
<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
}
*{
  box-sizing:border-box;
  margin-top:0px;
  margin-right:0px;
  margin-bottom:0px;
  margin-left:0px;
  padding-top:0px;
  padding-right:0px;
  padding-bottom:0px;
  padding-left:0px;
}
.navbar{
  padding-top:10px;
  padding-right:15px;
  padding-bottom:10px;
  padding-left:15px;
}
.navbar-container{
  display:block;
  justify-content:space-between;
  align-items:center;
  max-width:950px;
  flex-direction:column;
  margin-top:0px;
  margin-right:auto;
  margin-bottom:0px;
  margin-left:auto;
}
.nav-holder{
  display:flex;
  flex-direction:row;
  justify-content:space-between;
}
.navbar-brand{
  color:inherit;
  text-decoration-line:none;
  text-decoration-thickness:initial;
  text-decoration-style:initial;
  text-decoration-color:initial;
  font-weight:bold;
}
.navbar-menu-link{
  color:inherit;
  text-decoration-line:none;
  text-decoration-thickness:initial;
  text-decoration-style:initial;
  text-decoration-color:initial;
  padding-top:5px;
  padding-right:10px;
  padding-bottom:5px;
  padding-left:10px;
}
.navbar-burger{
  display:none;
  flex-direction:column;
  row-gap:4px;
  column-gap:4px;
  cursor:pointer;
}
.navbar-burger-line{
  width:25px;
  height:2px;
}
.navbar-items-c{
  display:block;
  width:100%;
}
.navbar-menu{
  display:flex;
  row-gap:10px;
  column-gap:10px;
}
.hero{
  background-image:url("wedding-hero.jpg");
  height:100vh;
  background-size:cover;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  text-align:center;
  color:white;
}
.hero h1{
  font-size:3em;
  margin-bottom:20px;
}
.hero button{
  padding-top:10px;
  padding-right:20px;
  padding-bottom:10px;
  padding-left:20px;
  font-size:1em;
  background-color:rgb(255, 64, 129);
  border-top-width:initial;
  border-right-width:initial;
  border-bottom-width:initial;
  border-left-width:initial;
  border-top-style:none;
  border-right-style:none;
  border-bottom-style:none;
  border-left-style:none;
  border-top-color:initial;
  border-right-color:initial;
  border-bottom-color:initial;
  border-left-color:initial;
  border-image-source:initial;
  border-image-slice:initial;
  border-image-width:initial;
  border-image-outset:initial;
  border-image-repeat:initial;
  color:white;
  cursor:pointer;
}
.about{
  max-width:800px;
  margin-top:50px;
  margin-right:auto;
  margin-bottom:50px;
  margin-left:auto;
  padding-top:20px;
  padding-right:20px;
  padding-bottom:20px;
  padding-left:20px;
  border-top-width:1px;
  border-right-width:1px;
  border-bottom-width:1px;
  border-left-width:1px;
  border-top-style:solid;
  border-right-style:solid;
  border-bottom-style:solid;
  border-left-style:solid;
  border-top-color:rgb(221, 221, 221);
  border-right-color:rgb(221, 221, 221);
  border-bottom-color:rgb(221, 221, 221);
  border-left-color:rgb(221, 221, 221);
  border-image-source:initial;
  border-image-slice:initial;
  border-image-width:initial;
  border-image-outset:initial;
  border-image-repeat:initial;
  border-top-left-radius:8px;
  border-top-right-radius:8px;
  border-bottom-right-radius:8px;
  border-bottom-left-radius:8px;
}
.services{
  max-width:800px;
  margin-top:50px;
  margin-right:auto;
  margin-bottom:50px;
  margin-left:auto;
  padding-top:20px;
  padding-right:20px;
  padding-bottom:20px;
  padding-left:20px;
  border-top-width:1px;
  border-right-width:1px;
  border-bottom-width:1px;
  border-left-width:1px;
  border-top-style:solid;
  border-right-style:solid;
  border-bottom-style:solid;
  border-left-style:solid;
  border-top-color:rgb(221, 221, 221);
  border-right-color:rgb(221, 221, 221);
  border-bottom-color:rgb(221, 221, 221);
  border-left-color:rgb(221, 221, 221);
  border-image-source:initial;
  border-image-slice:initial;
  border-image-width:initial;
  border-image-outset:initial;
  border-image-repeat:initial;
  border-top-left-radius:8px;
  border-top-right-radius:8px;
  border-bottom-right-radius:8px;
  border-bottom-left-radius:8px;
}
.testimonials{
  max-width:800px;
  margin-top:50px;
  margin-right:auto;
  margin-bottom:50px;
  margin-left:auto;
  padding-top:20px;
  padding-right:20px;
  padding-bottom:20px;
  padding-left:20px;
  border-top-width:1px;
  border-right-width:1px;
  border-bottom-width:1px;
  border-left-width:1px;
  border-top-style:solid;
  border-right-style:solid;
  border-bottom-style:solid;
  border-left-style:solid;
  border-top-color:rgb(221, 221, 221);
  border-right-color:rgb(221, 221, 221);
  border-bottom-color:rgb(221, 221, 221);
  border-left-color:rgb(221, 221, 221);
  border-image-source:initial;
  border-image-slice:initial;
  border-image-width:initial;
  border-image-outset:initial;
  border-image-repeat:initial;
  border-top-left-radius:8px;
  border-top-right-radius:8px;
  border-bottom-right-radius:8px;
  border-bottom-left-radius:8px;
}
.contact{
  max-width:800px;
  margin-top:50px;
  margin-right:auto;
  margin-bottom:50px;
  margin-left:auto;
  padding-top:20px;
  padding-right:20px;
  padding-bottom:20px;
  padding-left:20px;
  border-top-width:1px;
  border-right-width:1px;
  border-bottom-width:1px;
  border-left-width:1px;
  border-top-style:solid;
  border-right-style:solid;
  border-bottom-style:solid;
  border-left-style:solid;
  border-top-color:rgb(221, 221, 221);
  border-right-color:rgb(221, 221, 221);
  border-bottom-color:rgb(221, 221, 221);
  border-left-color:rgb(221, 221, 221);
  border-image-source:initial;
  border-image-slice:initial;
  border-image-width:initial;
  border-image-outset:initial;
  border-image-repeat:initial;
  border-top-left-radius:8px;
  border-top-right-radius:8px;
  border-bottom-right-radius:8px;
  border-bottom-left-radius:8px;
}
.services ul{
  list-style-type:none;
}
.services li{
  margin-top:10px;
  margin-right:0px;
  margin-bottom:10px;
  margin-left:0px;
}
.testimonials blockquote{
  font-style:italic;
  margin-top:10px;
  margin-right:0px;
  margin-bottom:10px;
  margin-left:0px;
}
.contact form{
  display:flex;
  flex-direction:column;
}
.contact input, .contact textarea{
  margin-top:10px;
  margin-right:0px;
  margin-bottom:10px;
  margin-left:0px;
  padding-top:10px;
  padding-right:10px;
  padding-bottom:10px;
  padding-left:10px;
  border-top-width:1px;
  border-right-width:1px;
  border-bottom-width:1px;
  border-left-width:1px;
  border-top-style:solid;
  border-right-style:solid;
  border-bottom-style:solid;
  border-left-style:solid;
  border-top-color:rgb(221, 221, 221);
  border-right-color:rgb(221, 221, 221);
  border-bottom-color:rgb(221, 221, 221);
  border-left-color:rgb(221, 221, 221);
  border-image-source:initial;
  border-image-slice:initial;
  border-image-width:initial;
  border-image-outset:initial;
  border-image-repeat:initial;
  border-top-left-radius:4px;
  border-top-right-radius:4px;
  border-bottom-right-radius:4px;
  border-bottom-left-radius:4px;
}
.contact button{
  padding-top:10px;
  padding-right:10px;
  padding-bottom:10px;
  padding-left:10px;
  background-color:rgb(255, 64, 129);
  border-top-width:initial;
  border-right-width:initial;
  border-bottom-width:initial;
  border-left-width:initial;
  border-top-style:none;
  border-right-style:none;
  border-bottom-style:none;
  border-left-style:none;
  border-top-color:initial;
  border-right-color:initial;
  border-bottom-color:initial;
  border-left-color:initial;
  border-image-source:initial;
  border-image-slice:initial;
  border-image-width:initial;
  border-image-outset:initial;
  border-image-repeat:initial;
  color:white;
  cursor:pointer;
}
@media (max-width: 768px){
  .navbar-burger{
    display:flex;
  }
  .navbar-items-c{
    display:none;
    width:100%;
  }
  .navbar-menu{
    flex-direction:column;
    width:100%;
    padding-top:10px;
    padding-right:0px;
    padding-bottom:10px;
    padding-left:0px;
  }
  .navbar-menu-link{
    display:block;
  }
}

</style>
<body id="i0yc">
  <div id="i8vg">
  </div>
  <meta charset="UTF-8"/>
  <title>Minimal Navbar
  </title>
  <div class="navbar">
    <div data-gjs="navbar" class="navbar-container">
      <div class="nav-holder">
        <a href="/" class="navbar-brand">MyBrand</a>
        <div id="igbjv" class="navbar-burger">
          <div class="navbar-burger-line">
          </div>
          <div class="navbar-burger-line">
          </div>
          <div class="navbar-burger-line">
          </div>
        </div>
      </div>
      <div data-gjs="navbar-items" class="navbar-items-c">
        <nav class="navbar-menu">
          <a href="#" class="navbar-menu-link">Home</a>
          <a href="#" class="navbar-menu-link">About</a>
          <a href="#" class="navbar-menu-link">Contact</a>
        </nav>
      </div>
    </div>
  </div>
  <div class="hero">
    <h1>Plan Your Dream Wedding
    </h1>
    <button>Start Planning</button>
  </div>
  <div class="about">
    <h2>About Us
    </h2>
    <p>We are a dedicated wedding planning service with years of experience, committed to making your special day unforgettable.
    </p>
  </div>
  <div class="services">
    <h2>Services Offered
    </h2>
    <ul>
      <li>
        <strong>Venue Selection:</strong> We help you find the perfect location for your wedding.
      </li>
      <li>
        <strong>Catering:</strong> Enjoy a variety of menu options tailored to your taste.
      </li>
      <li>
        <strong>Decoration:</strong> Beautiful setups that reflect your style and theme.
      </li>
    </ul>
  </div>
  <div class="testimonials">
    <h2>Testimonials
    </h2>
    <blockquote>"The best wedding planning service! They made our day perfect!" - Jane D.
    </blockquote>
    <blockquote>"Highly recommend! Professional and attentive to every detail." - John S.
    </blockquote>
  </div>
  <div class="contact">
    <h2>Contact Us
    </h2>
    <form>
      <input type="text" placeholder="Your Name" required/>
      <input type="email" placeholder="Your Email" required/>
      <textarea placeholder="Your Message" required></textarea>
      <button type="submit">Send Message</button>
    </form>
  </div>
  <div class="footer">
  </div>
</body>
`;

