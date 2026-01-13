// Modal functionality
const dislikeBtn = document.getElementById('dislike-btn');
const modalOverlay = document.getElementById('modal-overlay');
const closeBtn = document.getElementById('close-btn');
const cancelBtn = document.getElementById('cancel-btn');

// Function to open modal with animation
function openModal() {
    modalOverlay.style.display = 'flex';
    // Force reflow to ensure display: flex is applied before adding active class
    void modalOverlay.offsetWidth;
    modalOverlay.classList.remove('closing');
    modalOverlay.classList.add('active');
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

// Function to close modal with animation
function closeModal() {
    modalOverlay.classList.add('closing');
    modalOverlay.classList.remove('active');
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Remove display after animation completes
    setTimeout(() => {
        if (!modalOverlay.classList.contains('active')) {
            modalOverlay.style.display = 'none';
            modalOverlay.classList.remove('closing');
        }
    }, 300); // Match transition duration
}

// Open modal when dislike button is clicked
dislikeBtn.addEventListener('click', () => {
    openModal();
});

// Close modal when close button is clicked
closeBtn.addEventListener('click', () => {
    closeModal();
});

// Close modal when cancel button is clicked
cancelBtn.addEventListener('click', () => {
    closeModal();
});

// Close modal when clicking outside the modal
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

// Dismissible Card functionality
const dislikeBtn2 = document.getElementById('dislike-btn-2');
const dismissibleCard = document.getElementById('dismissible-card');
const dismissibleCardClose = document.getElementById('dismissible-card-close');

// Function to show dismissible card with animation
function showDismissibleCard() {
    dismissibleCard.style.marginTop = ''; // Reset inline style
    dismissibleCard.classList.remove('closing');
    dismissibleCard.classList.add('show');
}

// Function to hide dismissible card with animation
function hideDismissibleCard() {
    dismissibleCard.classList.add('closing');
    dismissibleCard.classList.remove('show');
    
    // Remove closing class after animation completes
    setTimeout(() => {
        if (!dismissibleCard.classList.contains('show')) {
            dismissibleCard.classList.remove('closing');
        }
    }, 200);
}

// Show dismissible card when second dislike button is clicked
if (dislikeBtn2) {
    dislikeBtn2.addEventListener('click', () => {
        showDismissibleCard();
    });
}

// Hide dismissible card when close button is clicked
if (dismissibleCardClose) {
    dismissibleCardClose.addEventListener('click', () => {
        hideDismissibleCard();
    });
}

// Handle tags in second dismissible card
const tagButtons = document.querySelectorAll('#dismissible-card .tag-wrap');
tagButtons.forEach(tag => {
    tag.addEventListener('click', () => {
        const tagValue = tag.getAttribute('data-tag');
        if (tagValue === 'other') {
            // Only "Other" opens the modal
            openModal();
        } else {
            // All other tags dismiss the card
            hideDismissibleCard();
        }
    });
});

// Third Dismissible Card functionality with selectable tags
const dislikeBtn3 = document.getElementById('dislike-btn-3');
const dismissibleCard3 = document.getElementById('dismissible-card-3');
const dismissibleCardClose3 = document.getElementById('dismissible-card-close-3');
const selectableTags = document.querySelectorAll('#dismissible-card-3 .tag-selectable');

// Function to show third dismissible card with animation
function showDismissibleCard3() {
    dismissibleCard3.style.marginTop = ''; // Reset inline style
    dismissibleCard3.classList.remove('closing');
    dismissibleCard3.classList.add('show');
}

// Function to hide third dismissible card with animation
function hideDismissibleCard3() {
    dismissibleCard3.classList.add('closing');
    dismissibleCard3.classList.remove('show');
    
    // Reset selections when closing
    selectableTags.forEach(tag => {
        tag.classList.remove('selected');
    });
    
    // Remove closing class after animation completes
    setTimeout(() => {
        if (!dismissibleCard3.classList.contains('show')) {
            dismissibleCard3.classList.remove('closing');
        }
    }, 200);
}

// Show third dismissible card when third dislike button is clicked
if (dislikeBtn3) {
    dislikeBtn3.addEventListener('click', () => {
        showDismissibleCard3();
    });
}

// Hide third dismissible card when close button is clicked
if (dismissibleCardClose3) {
    dismissibleCardClose3.addEventListener('click', () => {
        hideDismissibleCard3();
    });
}

// Handle selectable tag clicks
selectableTags.forEach(tag => {
    tag.addEventListener('click', (e) => {
        // Prevent event bubbling for buttons and form elements inside expanded section
        if (e.target.closest('.tag-other-expanded') || e.target.closest('.btn') || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'LABEL') {
            e.stopPropagation();
            return;
        }
        
        const tagValue = tag.getAttribute('data-tag');
        
        if (tagValue === 'other') {
            // Toggle Other tag selection and expansion when clicking on the tag itself (but not expanded content)
            if (!e.target.closest('.tag-other-expanded')) {
                // Toggle Other tag selection and expansion
                if (tag.classList.contains('selected')) {
                    tag.classList.remove('selected');
                } else {
                    // Remove selection from all tags
                    selectableTags.forEach(t => t.classList.remove('selected'));
                    // Select Other tag
                    tag.classList.add('selected');
                }
            }
        } else {
            // Other tags close the dismissible container
            hideDismissibleCard3();
        }
    });
});
