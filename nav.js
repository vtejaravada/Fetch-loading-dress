
function navSlide()
    {
        const nav = document.querySelector(".navbar");
        const menu = document.querySelector(".nav_list");
        const burger = document.querySelector(".burger");

        burger.addEventListener("click", ()=>{
            menu.classList.toggle("nav-active");

            burger.classList.toggle("toggle")
        })
    }

    navSlide();
