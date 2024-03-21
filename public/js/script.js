function addContact() {
    const nameInput = document.getElementsByName('name')[0];
    const phoneInput = document.getElementsByName('phone')[0];

    const name = nameInput.value;
    const phone = phoneInput.value;

    const nameRegex = /^[a-zA-ZА-Яа-я]+$/;
    const isValidName = nameRegex.test(name);


    const phoneRegex = /^\d+$/;
    const isValidPhone = phoneRegex.test(phone);

    if (!isValidName) {
        alert("Недопустимое имя");
        nameInput.classList.add('invalid');
        return;
    } else {

        nameInput.classList.remove('invalid');
    }

    if (!isValidPhone) {

        alert("Недопустимый номер телефона");
        phoneInput.classList.add('invalid');
        return;
    } else {

        phoneInput.classList.remove('invalid');
    }

    fetch('/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, phone})
    })
        .then(response => response.json())
        .then(() => window.location.href = '/');
}


async function editContact() {
    const id = document.querySelector('.form').getAttribute('data-key');
    const name = document.querySelector('input[name="name"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    
    try {
        await fetch(`/update?id=${id}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, phone})
        });
        window.location.href = '/'
    } catch (e) {
        console.log(e);
    }
}

async function deleteContact() {
    const id = document.querySelector('.form').getAttribute('data-key');

    try {
        await fetch(`/delete?id=${id}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        });
        window.location.href = '/';
    } catch (e) {
        console.log(e);
    }


}

function blockButton(name, phone) {
    const button = document.getElementById('delete-button');
    if (document.getElementsByName('name').value !== name ||
        document.getElementsByName('phone').value !== phone) {
        button.setAttribute('disabled', 'true');
    } else {
        button.setAttribute('disabled', 'false');
    }
}


