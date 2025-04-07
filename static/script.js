default_html=`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Little Sprouts Nursery School</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Arial', sans-serif;
        }
        
        body {
            background-color: #f9f7f2;
            color: #333;
        }
        
        .navbar-container {
            display: flex;
            padding: 15px 20px;
            background-color: #8bc34a;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .nav-holder {
            display: flex;
            align-items: center;
        }
        
        .navbar-brand {
            font-size: 24px;
            font-weight: bold;
            color: white;
            text-decoration: none;
        }
        
        .navbar-burger {
            display: none;
            cursor: pointer;
            margin-left: auto;
        }
        
        .navbar-burger-line {
            width: 25px;
            height: 3px;
            background-color: white;
            margin: 5px 0;
        }
        
        .navbar-items-c {
            margin-left: auto;
        }
        
        .navbar-menu {
            display: flex;
        }
        
        .navbar-menu-link {
            color: white;
            padding: 0 15px;
            text-decoration: none;
            font-weight: 500;
        }
        
        .hero {
            background: url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80') center/cover;
            padding: 100px 20px;
            text-align: center;
            color: white;
            position: relative;
        }
        
        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(76, 175, 80, 0.7);
        }
        
        .hero-content {
            position: relative;
            z-index: 1;
        }
        
        .hero-title {
            font-size: 3rem;
            margin-bottom: 20px;
            color: white;
        }
        
        .hero-subtitle {
            font-size: 1.5rem;
            margin-bottom: 30px;
        }
        
        .hero-button {
            padding: 12px 30px;
            background-color: #ff9800;
            color: white;
            border: none;
            border-radius: 25px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .hero-button:hover {
            background-color: #f57c00;
            transform: scale(1.05);
        }
        
        .section {
            padding: 60px 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .section-title {
            text-align: center;
            margin-bottom: 40px;
            color: #4caf50;
        }
        
        .services {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 30px;
        }
        
        .service-card {
            flex: 1 1 300px;
            background: white;
            border-radius: 10px;
            padding: 25px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
            text-align: center;
        }
        
        .testimonials {
            background-color: #e8f5e9;
        }
        
        .carousel {
            display: flex;
            overflow-x: hidden;
            scroll-snap-type: x mandatory;
        }
        
        .testimonial-item {
            flex: 0 0 100%;
            scroll-snap-align: start;
            padding: 30px;
            text-align: center;
        }
        
        .accordian {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .contact-form {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }
        
        input, textarea {
            width: 100%;
            padding: 12px;
            margin-bottom: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        
        footer {
            background-color: #4caf50;
            color: white;
            text-align: center;
            padding: 30px 20px;
        }
        
        @media (max-width: 768px) {
            .navbar-burger {
                display: block;
            }
            
            .navbar-items-c {
                display: none;
            }
            
            .hero-title {
                font-size: 2rem;
            }
            
            .hero-subtitle {
                font-size: 1.2rem;
            }
        }
    </style>
</head>
<body>
    <div class="navbar">
        <div data-gjs="navbar" class="navbar-container">
            <div class="nav-holder" style="flex:1">
                <a href="/" class="navbar-brand">Little Sprouts</a>
                <div id="igbjv" class="navbar-burger">
                    <div class="navbar-burger-line"></div>
                    <div class="navbar-burger-line"></div>
                    <div class="navbar-burger-line"></div>
                </div>
            </div>
            <div data-gjs="navbar-items" class="navbar-items-c">
                <nav class="navbar-menu">
                    <a href="#" class="navbar-menu-link">Home</a>
                    <a href="#about" class="navbar-menu-link">About Us</a>
                    <a href="#programs" class="navbar-menu-link">Programs</a>
                    <a href="#testimonials" class="navbar-menu-link">Testimonials</a>
                    <a href="#contact" class="navbar-menu-link">Contact</a>
                </nav>
            </div>
        </div>
    </div>

    <section class="hero">
        <div class="hero-content">
            <h1 class="hero-title">Growing Curious Minds</h1>
            <p class="hero-subtitle">A nurturing environment where every child can learn, play, and thrive</p>
            <button class="hero-button">Enroll Now</button>
        </div>
    </section>

    <section id="about" class="section">
        <h2 class="section-title">About Little Sprouts</h2>
        <div class="about-content">
            <p>Little Sprouts is a premier nursery school dedicated to providing a safe, loving, and stimulating environment for children. Our mission is to nurture each child's unique potential through play-based learning and creative exploration.</p>
            <div class="timer" data-countdown="2023/12/25">
                <span>Enrolling for next term!</span>
            </div>
        </div>
    </section>

    <section id="programs" class="section">
        <h2 class="section-title">Our Programs</h2>
        <div class="services">
            <div class="service-card">
                <h3>Toddler Program</h3>
                <p>For children ages 1-2, focusing on sensory exploration and language development.</p>
            </div>
            <div class="service-card">
                <h3>Preschool Program</h3>
                <p>For ages 3-4, building social skills and introducing early literacy and numeracy concepts.</p>
            </div>
            <div class="service-card">
                <h3>Pre-K Program</h3>
                <p>For ages 4-5, preparing children for kindergarten through comprehensive learning experiences.</p>
            </div>
        </div>
    </section>

    <section id="testimonials" class="section testimonials">
        <h2 class="section-title">What Parents Say</h2>
        <div class="carousel">
            <div class="testimonial-item">
                <p>"Little Sprouts has been a second home for our daughter. The teachers are caring and the curriculum is engaging!"</p>
                <p><strong>- Sarah Johnson, Parent</strong></p>
            </div>
        </div>
    </section>

    <section id="faq" class="section">
        <h2 class="section-title">Frequently Asked Questions</h2>
        <div class="accordian">
            <div class="accordian-item">
                <h3>What are your operating hours?</h3>
                <div>We are open Monday through Friday, 7:30 AM to 6:00 PM.</div>
            </div>
        </div>
    </section>

    <section id="contact" class="section">
        <h2 class="section-title">Contact Us</h2>
        <div class="contact-form">
            <form>
                <input type="text" placeholder="Your Name" required>
                <input type="email" placeholder="Your Email" required>
                <textarea placeholder="Your Message" rows="5" required></textarea>
                <button class="hero-button" type="submit">Send Message</button>
            </form>
        </div>
    </section>

    <footer>
        <p>&copy; 2023 Little Sprouts Nursery School. All Rights Reserved.</p>
    </footer>
</body>
</html>`;

