document.addEventListener('DOMContentLoaded', function () {
   const body = document.body;
   const profile = document.querySelector('.header .flex .profile');
   const searchForm = document.querySelector('.header .flex .search-form');
   const sideBar = document.querySelector('.side-bar');
   const toggleBtn = document.querySelector('#toggle-btn');
   const langBtn = document.querySelector('#lang-btn');
   const langOptions = document.querySelector('.language-options');
   const form = document.querySelector('.register');

   // Function to enable dark mode
   const enableDarkMode = () => {
       toggleBtn.classList.replace('fa-sun', 'fa-moon');
       body.classList.add('dark');
       localStorage.setItem('dark-mode', 'enabled');
   };

   // Function to disable dark mode
   const disableDarkMode = () => {
       toggleBtn.classList.replace('fa-moon', 'fa-sun');
       body.classList.remove('dark');
       localStorage.setItem('dark-mode', 'disabled');
   };

   // Toggle dark mode based on localStorage
   const darkMode = localStorage.getItem('dark-mode');
   if (darkMode === 'enabled') {
       enableDarkMode();
   }

   // Toggle dark mode when the toggle button is clicked
   toggleBtn.addEventListener('click', () => {
       const currentMode = localStorage.getItem('dark-mode');
       currentMode === 'disabled' ? enableDarkMode() : disableDarkMode();
   });

   // Toggle profile and search form visibility
   document.querySelector('#user-btn').addEventListener('click', () => {
       profile.classList.toggle('active');
       searchForm.classList.remove('active');
   });

   document.querySelector('#search-btn').addEventListener('click', () => {
       searchForm.classList.toggle('active');
       profile.classList.remove('active');
   });

   // Toggle side bar visibility
   document.querySelector('#menu-btn').addEventListener('click', () => {
       sideBar.classList.toggle('active');
       body.classList.toggle('active');
   });

   document.querySelector('.side-bar .close-side-bar').addEventListener('click', () => {
       sideBar.classList.remove('active');
       body.classList.remove('active');
   });

   // Close side bar on scroll
   window.onscroll = () => {
       sideBar.classList.remove('active');
       body.classList.remove('active');
   };

   // Show language options
   langBtn.addEventListener('click', () => {
       langOptions.style.display = 'block';
   });

   // Hide language options
   langBtn.addEventListener('mouseleave', () => {
       langOptions.style.display = 'none';
   });

   // Language icons functionality
   const langIcons = document.querySelectorAll('.language-option');
   langIcons.forEach(icon => {
       icon.addEventListener('click', () => {
           const lang = icon.textContent.trim().toLowerCase();
           window.location.href = `?lang=${lang}`;
       });
   });

   // Form validation for image upload
   form.addEventListener('submit', function (event) {
       const imageField = form.querySelector('input[name="image"]');
       const imageExtension = imageField.value.trim().split('.').pop().toLowerCase();
       const allowedExtensions = ['jpeg', 'jpg', 'bmp', 'gif', 'png', 'svg'];
       const imageSizeLimit = 2 * 1024 * 1024; // 2 MB
       const errors = [];

       if (!allowedExtensions.includes(imageExtension)) {
           errors.push('Select pic must be a valid image file (JPEG, BMP, GIF, PNG, SVG).');
       }

       if (imageField.files[0].size > imageSizeLimit) {
           errors.push('Image size should not exceed 2 MB.');
       }

       if (errors.length > 0) {
           event.preventDefault();
           alert(errors.join('\n'));
       }
   });
});
document.querySelector('.header .lang-wrapper').addEventListener('click', function() {
   this.querySelector('.language-options').classList.toggle('active');
});

