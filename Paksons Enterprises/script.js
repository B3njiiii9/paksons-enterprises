document.addEventListener('DOMContentLoaded', function() {
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

  let slideIndex = 1;
  let autoSlideTimeout;

  function showSlides(n) {
    const slides = document.getElementsByClassName("slides");
    const dots = document.getElementsByClassName("dot");

    if (n > slides.length) slideIndex = 1;
    else if (n < 1) slideIndex = slides.length;
    else slideIndex = n;

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
    }

    slides[slideIndex - 1].style.display = "block";
    if (dots[slideIndex - 1]) {
      dots[slideIndex - 1].classList.add("active");
    }

    clearTimeout(autoSlideTimeout);
    autoSlideTimeout = setTimeout(() => showSlides(slideIndex + 1), 4000);
  }

  function plusSlides(n) {
    showSlides(slideIndex + n);
  }

  function currentSlide(n) {
    showSlides(n);
  }

  showSlides(slideIndex);

  // About slider
  let aboutSlideIndex = 0;
  const aboutSlider = document.getElementById("about-slider");
  const aboutSlides = document.querySelectorAll("#about-slider .slide");

  const nextBtn = document.getElementById("about-next");
  const prevBtn = document.getElementById("about-prev");

  if (aboutSlider && nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
      aboutSlideIndex = (aboutSlideIndex + 1) % aboutSlides.length;
      updateAboutSlider();
    });

    prevBtn.addEventListener("click", () => {
      aboutSlideIndex = (aboutSlideIndex - 1 + aboutSlides.length) % aboutSlides.length;
      updateAboutSlider();
    });

    function updateAboutSlider() {
      const offset = -aboutSlideIndex * 100;
      aboutSlider.style.transform = `translateX(${offset}%)`;
    }
  }

  // FILTERING
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      galleryItems.forEach((item) => {
        if (filter === "all" || item.classList.contains(filter)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // LIGHTBOX
  const lightboxModal = document.getElementById("lightbox-modal");
  const lightboxImage = document.getElementById("lightbox-image");

  const lightboxBtns = document.querySelectorAll(".lightbox-btn");
  lightboxBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const src = btn.getAttribute("data-src");
      lightboxImage.src = src;
      lightboxModal.style.display = "block";
      e.stopPropagation();
    });
  });

  document.querySelector(".close-lightbox").addEventListener("click", () => {
    lightboxModal.style.display = "none";
  });

  // DOWNLOAD
  const downloadBtns = document.querySelectorAll(".download-btn");
  downloadBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const imgUrl = btn.getAttribute("data-img");
      const link = document.createElement("a");
      link.href = imgUrl;
      link.download = "gallery-image.jpg";
      link.click();
      e.stopPropagation();
    });
  });

  // SHARE
  const shareBtns = document.querySelectorAll(".share-btn");
  shareBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const imgUrl = btn.getAttribute("data-img");
      if (navigator.share) {
        navigator.share({
          title: "Check out this image!",
          url: imgUrl,
        });
      } else {
        alert("Your browser does not support Web Share API.");
      }
      e.stopPropagation();
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById('productSearch');
    const searchBtn = document.getElementById('searchBtn');

    function filterProducts() {
        let input = searchInput.value.toLowerCase();
        let cards = document.getElementsByClassName('product-card');

        for (let i = 0; i < cards.length; i++) {
            let title = cards[i].getElementsByTagName('h3')[0].innerText.toLowerCase();

            if (input === "" || title.includes(input)) {
                cards[i].style.display = ""; // keep original CSS layout
            } else {
                cards[i].style.display = "none"; // hide non-matching
            }
        }
    }

    // ✅ Live update while typing
    searchInput.addEventListener('input', filterProducts);

    // Click button
    searchBtn.addEventListener('click', filterProducts);

    // Pressing Enter
    searchInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            filterProducts();
        }
    });

    // ✅ Show all products on page load
    filterProducts();
});
