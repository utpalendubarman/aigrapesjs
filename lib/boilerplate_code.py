boilerplate_code="""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Minimal Navbar</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
    body {
      font-family: 'Roboto', sans-serif;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    .navbar {
      padding: 10px 15px;
    }
    .navbar-container {
      display: block;
      justify-content: space-between;
      align-items: center;
      max-width: 950px;
	  flex-direction:column;
      margin: 0 auto;
    }
	.nav-holder{
		display: flex;
		flex-direction:row;
        align-items: center;
		justify-content: space-between;
	}
    .navbar-brand {
      padding: 5px 10px;
      color: inherit;
      font-size: 28px;
      text-decoration: none;
      font-weight: bold;
    }
    .navbar-menu-link {
      color: inherit;
      text-decoration: none;
      padding: 5px 10px;
    }
    .navbar-burger {
      display: none;
      flex-direction: column;
      gap: 4px;
      cursor: pointer;
    }
    .navbar-burger-line {
      width: 25px;
      background: #000000;
      height: 2px;
    }
    .navbar-items-c {
      display: block;
	  width:100%,
    }
    .navbar-menu {
      display: flex;
      gap: 10px;
    }
    @media (max-width: 768px) {
      .navbar-burger {
        display: flex;
      }
      .navbar-items-c {
        display: none;
        width: 100%;
      }
      .navbar-menu {
        flex-direction: column;
        width: 100%;
        padding: 10px 0;
      }
      .navbar-menu-link {
        display: block;
      }
    }
  </style>
</head>
<body id="iype">
  <div class="navbar">
    <div data-gjs="navbar" class="navbar-container">
	  <div class="nav-holder">
      <a href="/" class="navbar-brand">MyBrand</a>
      <div id="igbjv" class="navbar-burger">
        <div class="navbar-burger-line"></div>
        <div class="navbar-burger-line"></div>
        <div class="navbar-burger-line"></div>
      </div>
	</div>
	<div data-gjs="navbar-items" class="navbar-items-c">
		<nav class="navbar-menu">
			<a class="navbar-menu-link" href="#">Home</a>
			<a class="navbar-menu-link" href="#">About</a>
			<a class="navbar-menu-link" href="#">Contact</a>
		</nav>
	</div>
    </div>
  </div>
  <div id="i1j7" class="container">
  </div>
  <div class="footer">
  </div>
</body>
</html>
"""