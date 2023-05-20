

const firstImgReel = document.querySelector('.mySlides:first-child .img_reel');
if (estateId) {
  firstImgReel.src = `../images/${estateId}/${estateId}_1.jpeg`;
}

const secondImgReel = document.querySelector('.mySlides:nth-child(2) .img_reel');
if (estateId) {
  secondImgReel.src = `../images/${estateId}/${estateId}_2.jpeg`;
}