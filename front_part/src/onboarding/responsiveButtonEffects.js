document.addEventListener('DOMContentLoaded', function () {
    const button = document.querySelector('.start_cardButton');

    button.addEventListener('touchstart', function () {
        button.style.color = 'white';
        button.style.transform = 'translateY(3px)';
        button.style.backgroundColor = 'var(--color-accent-variant)';
        button.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
    });

    button.addEventListener('touchend', function () {
        button.style.color = 'black';
        button.style.transform = 'translateY(0)';
        button.style.backgroundColor = 'var(--color-primary-variant)';
        button.style.boxShadow = '0 3px 6px rgba(0, 0, 0, 0.2)';
    });
});
