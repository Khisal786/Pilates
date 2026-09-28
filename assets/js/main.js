document.addEventListener('DOMContentLoaded', () => {
  // 0. Mobile Hamburger & Drawer Mechanics
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

  if (mobileMenuToggle && mobileMenuDrawer) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuToggle.classList.toggle('active');
      mobileMenuDrawer.classList.toggle('active');
      document.body.style.overflow = mobileMenuDrawer.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileMenuDrawer.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // 1. Modal Toggle Mechanics
  const modal = document.getElementById('bookingModal');
  const closeModalBtn = document.getElementById('closeModal');
  const openModalBtns = document.querySelectorAll('.open-booking-modal');
  const selectedClassInput = document.getElementById('selectedClassInput');
  const modalTitle = document.getElementById('modalTitle');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Ensure mobile drawer closes if open when CTA is clicked
      if (mobileMenuToggle && mobileMenuDrawer) {
        mobileMenuToggle.classList.remove('active');
        mobileMenuDrawer.classList.remove('active');
        document.body.style.overflow = '';
      }

      const classTitle = btn.getAttribute('data-class-title') || 'Private Session Inquiry';
      if (selectedClassInput) selectedClassInput.value = classTitle;
      if (modalTitle) modalTitle.textContent = `Reserve: ${classTitle}`;
      if (modal) modal.classList.add('active');
    });
  });

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  window.addEventListener('click', (e) => {
    if (modal && e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // 2. Class Category Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-tab');
  const classCards = document.querySelectorAll('.class-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      classCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 3. WhatsApp Booking Dispatch Engine
  const bookingForm = document.getElementById('bookingForm');
  const toast = document.getElementById('toastNotification');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const classTitle = selectedClassInput ? selectedClassInput.value : 'Session';
      const clientName = document.getElementById('clientName').value;
      const clientPhone = document.getElementById('clientPhone').value;
      const preferredDate = document.getElementById('preferredDate').value;
      const clientNotes = document.getElementById('clientNotes').value;

      // Studio WhatsApp destination number (placeholder for demo)
      const studioWhatsApp = "923049999325"; 

      const message = `🧘‍♀️ *NEW STUDIO BOOKING REQUEST*%0A` +
                      `----------------------------------%0A` +
                      `*Class / Session:* ${classTitle}%0A` +
                      `*Client Name:* ${clientName}%0A` +
                      `*Phone:* ${clientPhone}%0A` +
                      `*Preferred Date:* ${preferredDate}%0A` +
                      `*Notes:* ${clientNotes || 'None'}%0A` +
                      `----------------------------------%0A` +
                      `Sent via Swift Web Sync Studio Demo`;

      const whatsappURL = `https://wa.me/${studioWhatsApp}?text=${message}`;

      // Show success toast
      if (toast) toast.classList.add('active');
      if (modal) modal.classList.remove('active');

      setTimeout(() => {
        if (toast) toast.classList.remove('active');
        window.open(whatsappURL, '_blank');
      }, 1500);
    });
  }
});