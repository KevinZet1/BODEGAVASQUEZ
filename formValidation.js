document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');

    form.addEventListener('submit', function(e) {
        let isValid = true;
        let errorMessage = '';

        // Validar nombre (mínimo 3 caracteres)
        if (nameInput.value.length < 3) {
            errorMessage += 'El nombre debe tener al menos 3 caracteres.\n';
            isValid = false;
            nameInput.style.borderColor = 'red';
        } else {
            nameInput.style.borderColor = '';
        }

        // Validar teléfono (mínimo 9 dígitos)
        if (phoneInput.value.length < 9) {
            errorMessage += 'El número de teléfono debe tener al menos 9 dígitos.\n';
            isValid = false;
            phoneInput.style.borderColor = 'red';
        } else {
            phoneInput.style.borderColor = '';
        }

        // Validar email (debe contener @)
        if (!emailInput.value.includes('@')) {
            errorMessage += 'El correo electrónico debe contener @.\n';
            isValid = false;
            emailInput.style.borderColor = 'red';
        } else {
            emailInput.style.borderColor = '';
        }

        if (!isValid) {
            e.preventDefault();
            alert(errorMessage);
        }
    });
});
