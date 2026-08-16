// QuizVerse Envato Documentation Portal Interactive JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Drawer Navigation
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const sidebar = document.getElementById('sidebar');
  const drawerBackdrop = document.getElementById('drawerBackdrop');

  function toggleMobileMenu(open) {
    if (open) {
      sidebar.classList.add('mobile-open');
      drawerBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      sidebar.classList.remove('mobile-open');
      drawerBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = sidebar.classList.contains('mobile-open');
      toggleMobileMenu(!isOpen);
    });
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', () => toggleMobileMenu(false));
  }

  // Close mobile drawer when clicking any nav link
  const navLinks = document.querySelectorAll('.nav-item, .header-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        toggleMobileMenu(false);
      }
    });
  });

  // 2. Scroll Active Highlight
  const sections = document.querySelectorAll('.doc-section');
  const sidebarNavItems = document.querySelectorAll('.sidebar .nav-item');

  function updateActiveNavOnScroll() {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      sidebarNavItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${currentSectionId}`) {
          item.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', updateActiveNavOnScroll);

  // 3. One-Click Code Snippet Copying
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const container = button.closest('.code-block-container');
      const code = container.querySelector('code');
      if (code) {
        try {
          await navigator.clipboard.writeText(code.innerText);
          button.classList.add('copied');
          button.innerText = 'Copied!';
          setTimeout(() => {
            button.classList.remove('copied');
            button.innerText = 'Copy';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy code text:', err);
        }
      }
    });
  });

  // 4. Accordion FAQ Handler
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      item.classList.toggle('open');
    });
  });

  // 5. Global Instant Search Filter
  const searchInput = document.getElementById('docSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      sections.forEach(section => {
        const text = section.innerText.toLowerCase();
        if (!query || text.includes(query)) {
          section.style.display = '';
        } else {
          section.style.display = 'none';
        }
      });
    });
  }
});
