

const [ hamburger, categories, closer, pageCover ] = ['.header--hamburger', '.categories', '.categories--closer', '.page-cover'].map( sel => document.querySelector(sel));


/* MOBILE ACTIONS */
// Function to show the page cover and categories menu
function showMenu(e) {
  console.log(e.target);
  pageCover.classList.add('active');

  setTimeout(() => {
    categories.classList.add('visible');
  }, 200);
}

// Function to hide the page cover and categories menu
function hideMenu() {
  categories.classList.remove('visible');

  setTimeout(() => {
    pageCover.classList.remove('active');
  }, 200);
}

// Event listeners for click actions
hamburger.addEventListener('click', showMenu);
closer.addEventListener('click', hideMenu);


/* image gallery */

const icons = document.querySelectorAll('.gallery--icons > img');
const [ hero, rightArrow, leftArrow ] = ['.gallery--hero > img', '.right-arrow', '.left-arrow'].map( sel => document.querySelector(sel));
let imageCount = 0;

leftArrow.addEventListener('click', handleArrowClick);
rightArrow.addEventListener('click', handleArrowClick);


icons.forEach((icon) => {
  icon.addEventListener('click', showAsHero);
});


function markSelectedIcon(currentIconNum){

  icons.forEach( (icon, index)  => {
    if( index == currentIconNum ) icon.classList.add('selected');
    else icon.classList.remove('selected');
  })
};


function handleArrowClick(e) {
  const elem = e.target.nodeName === 'IMG' ? e.target.parentNode : e.target;
  const max = icons.length - 1;
  let delta = parseInt(elem.dataset.dir, 10);
  imageCount = (imageCount + delta + max + 1) % (max + 1);

  markSelectedIcon(imageCount);

  const theIcon = icons[imageCount];
  showAsHero.call(theIcon);
};


function showAsHero() {
  hero.classList.add('active');
  const that = this;
  imageCount = parseInt(that.dataset.count) - 1;

  markSelectedIcon(imageCount);

  hero.addEventListener('transitionend', () => {
    
    hero.src = that.src.replace('-thumbnail', '');
    hero.classList.remove('active');
  }, { once: true });
};


