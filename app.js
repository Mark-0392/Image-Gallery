function getElement(selection) {
  const element = document.querySelector(selection)
  if (element) {
    return element
  }
  throw new Error(
    `Please check "${selection}" selector, no such element exists`
  )
}

//constructor function
function ImagesGallery(element) {
  this.container = element
  this.imagesList = [...element.querySelectorAll('.img')]
  this.modal = getElement('.modal')
  this.modalImg = getElement('.main-img')
  this.imageName = getElement('.image-name')
  this.modalImages = getElement('.modal-images')
  this.closeBtn = getElement('.close-btn')
  this.nextBtn = getElement('.next-btn')
  this.prevBtn = getElement('.prev-btn')
  // this.openModal = this.openModal.bind(this)
  // let self = this
  this.container.addEventListener(
    'click',
    function (e) {
      if (e.target.classList.contains('img')) {
        this.openModal(e.target, this.imagesList)
      }
    }.bind(this)
  )
  this.closeModal = this.closeModal.bind(this)
  this.nextImage = this.nextImage.bind(this)
  this.prevImage = this.prevImage.bind(this)
  this.chooseImage = this.chooseImage.bind(this)
}

ImagesGallery.prototype.openModal = function (selectedImage, imagesList) {
  this.setMainImage(selectedImage)
  this.modalImages.innerHTML = imagesList
    .map(function (image) {
      return `<img src="${
        image.src
      }" title="${image.title}" data-id="${image.dataset.id}" class="${selectedImage.dataset.id === image.dataset.id ? 'modal-img selected' : 'modal-img'}"/>`
    })
    .join('')
  this.modal.classList.add('open')

  this.closeBtn.addEventListener('click', this.closeModal)

  this.nextBtn.addEventListener('click', this.nextImage)

  this.prevBtn.addEventListener('click', this.prevImage)

  this.modalImages.addEventListener('click', this.chooseImage)
}
ImagesGallery.prototype.setMainImage = function (selectedImage) {
  this.modalImg.src = selectedImage.src
  this.imageName.textContent = selectedImage.title
}
ImagesGallery.prototype.closeModal = function () {
  this.modal.classList.remove('open')
  this.closeBtn.removeEventListener('click', this.closeModal)
  this.nextBtn.removeEventListener('click', this.nextImage)
  this.prevBtn.removeEventListener('click', this.prevImage)
  this.modalImages.removeEventListener('click', this.chooseImage)
}

ImagesGallery.prototype.nextImage = function () {
  const selected = this.modalImages.querySelector('.selected')
  const next = selected.nextElementSibling || this.modalImages.firstElementChild
  selected.classList.remove('selected')
  next.classList.add('selected')
  this.setMainImage(next)
}

ImagesGallery.prototype.prevImage = function () {
  const selected = this.modalImages.querySelector('.selected')
  const prev =
    selected.previousElementSibling || this.modalImages.lastElementChild
  selected.classList.remove('selected')
  prev.classList.add('selected')
  this.setMainImage(prev)
}

ImagesGallery.prototype.chooseImage = function (e) {
  if (e.target.classList.contains('modal-img')) {
    const selected = this.modalImages.querySelector('.selected')
    selected.classList.remove('selected')
    this.setMainImage(e.target)
    e.target.classList.add('selected')
  }
}

const nature = new ImagesGallery(getElement('.nature'))
const city = new ImagesGallery(getElement('.city'))
