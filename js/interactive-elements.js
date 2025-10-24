// Interactive elements functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Expandable cards functionality
    const expandableCards = document.querySelectorAll('.expandable-card');
    expandableCards.forEach(card => {
        const header = card.querySelector('.card-header');
        const content = card.querySelector('.card-content');
        const expandIcon = card.querySelector('.expand-icon');
        
        if (header && content && expandIcon) {
            header.addEventListener('click', function() {
                const isExpanded = card.classList.contains('expanded');
                
                if (isExpanded) {
                    card.classList.remove('expanded');
                    content.style.maxHeight = '0';
                    expandIcon.style.transform = 'rotate(0deg)';
                } else {
                    // Close other expanded cards in the same section
                    const parentSection = card.closest('section');
                    if (parentSection) {
                        const otherCards = parentSection.querySelectorAll('.expandable-card.expanded');
                        otherCards.forEach(otherCard => {
                            if (otherCard !== card) {
                                otherCard.classList.remove('expanded');
                                const otherContent = otherCard.querySelector('.card-content');
                                const otherIcon = otherCard.querySelector('.expand-icon');
                                if (otherContent) otherContent.style.maxHeight = '0';
                                if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                            }
                        });
                    }
                    
                    card.classList.add('expanded');
                    content.style.maxHeight = content.scrollHeight + 'px';
                    expandIcon.style.transform = 'rotate(180deg)';
                }
            });
        }
    });

    // Before/After toggle functionality
    const toggleButtons = document.querySelectorAll('.toggle-button');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const toggleContainer = this.closest('.before-after-toggle');
            const beforeContent = toggleContainer.querySelector('.before-content');
            const afterContent = toggleContainer.querySelector('.after-content');
            
            if (this.classList.contains('showing-after')) {
                // Show before content
                this.classList.remove('showing-after');
                this.textContent = 'Show After';
                if (beforeContent) beforeContent.style.display = 'block';
                if (afterContent) afterContent.style.display = 'none';
            } else {
                // Show after content
                this.classList.add('showing-after');
                this.textContent = 'Show Before';
                if (beforeContent) beforeContent.style.display = 'none';
                if (afterContent) afterContent.style.display = 'block';
            }
        });
    });

    // ROI Calculator functionality
    const roiCalculator = document.getElementById('roi-calculator');
    if (roiCalculator) {
        const sliders = roiCalculator.querySelectorAll('.slider');
        const resultValues = roiCalculator.querySelectorAll('.result-value');
        
        sliders.forEach(slider => {
            slider.addEventListener('input', function() {
                updateROICalculator();
            });
        });
        
        function updateROICalculator() {
            // Get slider values
            const salesReps = parseInt(document.getElementById('sales-reps')?.value || 50);
            const csReps = parseInt(document.getElementById('cs-reps')?.value || 20);
            const avgDealSize = parseInt(document.getElementById('avg-deal-size')?.value || 50000);
            const closeRate = parseInt(document.getElementById('close-rate')?.value || 25);
            const csEfficiency = parseInt(document.getElementById('cs-efficiency')?.value || 30);
            
            // Calculate results
            const additionalDeals = Math.round((salesReps * closeRate / 100) * (csEfficiency / 100));
            const additionalRevenue = additionalDeals * avgDealSize;
            const annualValue = additionalRevenue * 12;
            
            // Update display
            const additionalDealsEl = document.getElementById('additional-deals');
            const additionalRevenueEl = document.getElementById('additional-revenue');
            const annualValueEl = document.getElementById('annual-value');
            
            if (additionalDealsEl) additionalDealsEl.textContent = additionalDeals;
            if (additionalRevenueEl) additionalRevenueEl.textContent = '$' + additionalRevenue.toLocaleString();
            if (annualValueEl) annualValueEl.textContent = '$' + annualValue.toLocaleString();
        }
        
        // Initialize calculator
        updateROICalculator();
    }

    // Video filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const videoItems = document.querySelectorAll('.video-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter videos
            videoItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Quote filter functionality
    const quoteFilterButtons = document.querySelectorAll('.quote-filter');
    const quoteItems = document.querySelectorAll('.quote-item');
    
    quoteFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            quoteFilterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter quotes
            quoteItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Smooth scroll for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.metric, .card, .timeline-item, .quote-card, .video-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Cost of delay calculator
    const delayCalculator = document.getElementById('delay-calculator');
    if (delayCalculator) {
        const delaySlider = delayCalculator.querySelector('.slider');
        const delayResults = delayCalculator.querySelectorAll('.delay-value');
        
        if (delaySlider) {
            delaySlider.addEventListener('input', function() {
                updateDelayCalculator();
            });
            
            function updateDelayCalculator() {
                const months = parseInt(delaySlider.value);
                const monthlyCost = 52000; // $52K monthly opportunity cost
                const totalCost = monthlyCost * months;
                
                delayResults.forEach(result => {
                    if (result.id === 'monthly-cost') {
                        result.textContent = '$' + monthlyCost.toLocaleString();
                    } else if (result.id === 'total-cost') {
                        result.textContent = '$' + totalCost.toLocaleString();
                    }
                });
            }
            
            // Initialize
            updateDelayCalculator();
        }
    }

    // Initialize all interactive elements
    initializeInteractiveElements();
});

function initializeInteractiveElements() {
    // Set initial states for expandable cards
    const expandableCards = document.querySelectorAll('.expandable-card');
    expandableCards.forEach(card => {
        const content = card.querySelector('.card-content');
        if (content) {
            content.style.maxHeight = '0';
            content.style.overflow = 'hidden';
            content.style.transition = 'max-height 0.3s ease';
        }
    });

    // Set initial states for before/after toggles
    const beforeAfterToggles = document.querySelectorAll('.before-after-toggle');
    beforeAfterToggles.forEach(toggle => {
        const afterContent = toggle.querySelector('.after-content');
        if (afterContent) {
            afterContent.style.display = 'none';
        }
    });
}