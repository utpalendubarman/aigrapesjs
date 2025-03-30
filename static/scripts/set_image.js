red_images=["https://plus.unsplash.com/premium_photo-1670671933890-176bdb86ef34","https://images.unsplash.com/photo-1573869522166-0eed5b27f2d6","https://plus.unsplash.com/premium_photo-1674747086700-6f90f3f90298?w=900&auto=format","https://images.unsplash.com/photo-1630312879911-937325577f26?q=80&w=2940","https://images.unsplash.com/photo-1634805370549-0781f4ee32c9?q=80&w=3173"]
blue_images=["https://plus.unsplash.com/premium_photo-1675490808284-7c8b3c1f0795?q=80&w=2940","https://images.unsplash.com/photo-1579267217516-b73084bd79a6?q=80&w=3087","https://images.unsplash.com/photo-1569783055874-1e2f28447e92?q=80&w=2940","https://images.unsplash.com/photo-1620121478247-ec786b9be2fa?q=80&w=3132"]
yellow_images=["https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=2938","https://plus.unsplash.com/premium_photo-1675747504445-4268531b1525?q=80&w=2940","https://images.unsplash.com/photo-1617957771986-7be224613e43?q=80&w=3132","https://images.unsplash.com/photo-1612363287209-bdfebf9ff660?q=80&w=2940"]
green_images=["https://images.unsplash.com/photo-1601370690183-1c7796ecec61?q=80&w=2940","https://images.unsplash.com/photo-1598940603846-a1edd0ef2574?q=80&w=2448","https://images.unsplash.com/photo-1648878136531-15e7d3a88e76?w=900","https://images.unsplash.com/photo-1714984210567-8f4b9a36d2b6?w=900"]
dark_images=["https://images.unsplash.com/photo-1484950763426-56b5bf172dbb?q=80&w=2940","https://images.unsplash.com/photo-1533134486753-c833f0ed4866?q=80&w=2940","https://images.unsplash.com/photo-1517241034903-9a4c3ab12f00?q=80&w=2940","https://images.unsplash.com/photo-1607893407846-49905270209e?q=80&w=3000"]
auto_images=["https://images.pexels.com/photos/31098883/pexels-photo-31098883/free-photo-of-vibrant-geometric-abstract-building-design.jpeg","https://images.pexels.com/photos/1260727/pexels-photo-1260727.jpeg","https://images.pexels.com/photos/1843717/pexels-photo-1843717.jpeg"]
function set_image(color_scheme){
    if(color_scheme=="red"){
        return getRandomElement(red_images);
    }
    if(color_scheme=="blue"){
        return getRandomElement(blue_images);
    }
    if(color_scheme=="green"){
        return getRandomElement(green_images);
    }
    if(color_scheme=="dark"){
        return getRandomElement(dark_images);
    }
    if(color_scheme=="yellow"){
        return getRandomElement(yellow_images);
    }
    if(color_scheme=="auto"){
        return getRandomElement(auto_images);
    }
}

function getRandomElement(arr) {
    if (arr.length === 0) return undefined;
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}  

