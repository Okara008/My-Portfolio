const nav = document.querySelector("nav");
const menuImg = document.getElementById("menuImg");

document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !menuImg.contains(e.target)) {
        nav.classList.remove("visibleNav");
    }
    console.log(menuImg.contains(e.target));
    
})

menuImg.addEventListener("click", () => {
    nav.classList.toggle("visibleNav");
})
