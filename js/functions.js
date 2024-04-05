

const [ hamburger, navigation, closer, pageCover ] = ['.header--hamburger', '.navigation', '.navigation--closer', '.page-cover'].map( sel => document.querySelector(sel));


/**
 * shows the navigation menu and the page cover when the hamburger is clicked
 * @param {*} event
 */
function showMenu(e) {
  pageCover.classList.add('active');

  setTimeout(() => {
    navigation.classList.add('visible');
      toggleCart(false);
  }, 200);
}

/**
 * hides the navigation menu and the page cover when the navigation--closer is clicked
 */
function hideMenu() {
  navigation.classList.remove('visible');


  setTimeout(() => {
    pageCover.classList.remove('active');
  }, 200);
}

// Event listeners for navigation click actions
hamburger.addEventListener('click', showMenu);
closer.addEventListener('click', hideMenu);


/* image gallery */

const icons = document.querySelectorAll('.gallery--icons > img');
const [ hero, rightArrow, leftArrow ] = ['.gallery--hero > img', '.right-arrow', '.left-arrow'].map( sel => document.querySelector(sel));
let currentIcon = 0;

leftArrow.addEventListener('click', handleArrowClick);
rightArrow.addEventListener('click', handleArrowClick);


icons.forEach((icon) => {
  icon.addEventListener('click', showAsHero);
});

/**
 * makes the currect icon in the image gallery marked and the others unmarked
 * @param {number} currentIconNum
 */
function markSelectedIcon(currentIconNum){
  icons.forEach( (icon, index)  => {
    if( index == currentIconNum ) icon.classList.add('selected');
    else icon.classList.remove('selected');
  })
};

/**
 *  decides which of the icons is the current one to show as a hero image when one of the arrows are clicked
 * @param {mouseClick event obj} e
 */
function handleArrowClick(e) {
  const elem = e.target.nodeName === 'IMG' ? e.target.parentNode : e.target;
  const max = icons.length - 1;
  let delta = parseInt(elem.dataset.dir, 10);
  currentIcon = (currentIcon + delta + max + 1) % (max + 1);

  markSelectedIcon(currentIcon);

  const theIcon = icons[currentIcon];
  showAsHero.call(theIcon);
};

/**
 * always called in the scope of the actual icon image when one of the arrows OR one of the icon images is clicked
 */
function showAsHero() {
  hero.classList.add('active');
  const that = this;
  currentIcon = parseInt(that.dataset.count) - 1;

  markSelectedIcon(currentIcon);

  hero.addEventListener('transitionend', () => {

    hero.src = that.src.replace('-thumbnail', '');
    hero.classList.remove('active');
  }, { once: true });
};



