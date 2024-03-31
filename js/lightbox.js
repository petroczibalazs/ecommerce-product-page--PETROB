const gallery = document.querySelector('.product--gallery');
const galleryCopy = gallery.cloneNode(true);
const galleryParent = gallery.parentNode;
let lightBoxCloser = null;
let showsLightBox = false;

// Create a template for the lightbox
const lightBoxTemplate = document.createElement('template');
lightBoxTemplate.innerHTML = `
    <div class="lightBox--closer"></div>
`;

const lightBox = document.createElement('div');
lightBox.classList.add('lightBox');
lightBox.appendChild(lightBoxTemplate.content.cloneNode(true));


hero.addEventListener('click', showLightBox);

function showLightBox() {

  console.log(`window.innerWidth: ${window.innerWidth}`);

  if( showsLightBox === true || window.innerWidth <= 760 ) return;


  gallery.parentNode.replaceChild(galleryCopy, gallery);
  lightBox.appendChild(gallery);
  document.body.appendChild(lightBox);
  lightBoxCloser = document.querySelector('.lightBox--closer');
  lightBoxCloser.addEventListener('click', hideLightBox, {once: true});
  pageCover.classList.add('active');
  showsLightBox = true;
}

function hideLightBox(){
  galleryParent.replaceChild(gallery, galleryCopy);
  document.body.removeChild(lightBox);
  pageCover.classList.remove('active');
  showsLightBox = false;
}
