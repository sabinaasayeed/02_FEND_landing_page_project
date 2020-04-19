/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */
const title = document.getElementById('title');
const navigationList = document.getElementById('navbar__list');
const sectionList = document.getElementsByTagName('section');
const debug = false;
/**
 * End Global Variables
 * Start Helper Functions
 * 
 */



/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */


// build the nav
function buildNavigationMenu() {
    var menuItem = document.createElement('li');

    // build a li element for "Header"
    menuItem.innerText = 'Home';
    menuItem.className = 'navbar__list_item';

    // Add class 'active' to section when near top of viewport;
    menuItem.addEventListener("click", function() {
        document.documentElement.scrollTop = 0;
    });
    navigationList.appendChild(menuItem);

    //build a li element for each section
    for (let item of sectionList) {
        menuItem = document.createElement('li');
        menuItem.className = 'navbar__list_item';
        menuItem.innerText = item.dataset.nav;
        // Scroll to anchor ID using scrollTO event
        menuItem.addEventListener("click", function() {
            item.scrollIntoView({
                behavior: 'smooth'
            })
        });
        navigationList.appendChild(menuItem);
    }

}

function setActiveOnScroll() {
    let activeSection = sectionList[0];
    let hero_header = document.querySelector('.main__hero');
    let liList = document.querySelectorAll('li');

    window.addEventListener('scroll', function(event) {

        //check if we are scrolling in the header
        //make "home" active
        if (isElementInViewport(hero_header)) {
            if (debug) {
                console.log("hero_header: ", hero_header);
            }

            for (let liItem of liList) {
                if (liItem.innerText === 'Home') {
                    liItem.classList.add('li_item_active')
                } else {
                    if (liItem.classList.contains('li_item_active')) {
                        liItem.classList.remove('li_item_active')
                    }
                }
            }
        } else {
            //Define the active section based on
            // the scrolling event
            for (let item of sectionList) {
                if (isElementInViewport(item)) {
                    activeSection = item;
                    if (debug) {
                        console.log("item is : ", item);
                    }
                    item.classList.add('your-active-class')
                } else {
                    if (item.classList.contains('your-active-class')) {
                        item.classList.remove('your-active-class')
                    }
                }
            }

            //Based on the active scetion
            //Select the appropiate link as active

            for (let liItem of liList) {
                if (liItem.innerText === activeSection.dataset.nav) {
                    liItem.classList.add('li_item_active')
                    if (debug) {
                        console.log("liItem is: ", liItem);
                    }
                } else {
                    if (liItem.classList.contains('li_item_active')) {
                        liItem.classList.remove('li_item_active')
                    }
                }
            }
        }


    })

}

//check if the input element(el) is in the view port
// returns true or false
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
/**
 * End Main Functions
 * Begin Events
 * 
 */

// Build menu 
// Scroll to section on link click
buildNavigationMenu();



// Set sections as active
setActiveOnScroll();