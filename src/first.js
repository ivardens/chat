(function () {
    return new Promise(function (resolve) {
        window.onload = (resolve);
    }).then(function () {
        return new Promise(function (resolve) {
            var login;
            var password;
            var res = [];

            document.querySelector('.form-login').addEventListener('submit', function (e) {
                e.preventDefault();
                formLogin();
            });

            function formLogin() {
                res.length = 0;
                res.push(login = document.querySelector('.form-login__login').value);
                res.push(password = document.querySelector('.form-login__password').value);
                for (var item in res) {
                    if (/^[a-z0-9_\-]+$/.test(res[item])) {
                        document.querySelector('.form-title').innerText = 'добро пожаловать в чат '+res[0];
                        resolve(res);
                    } else {
                        document.querySelector('.form-title').innerText = res[item]+' - введены недопустимые символы';
                        return false;
                    }
                }
                document.querySelector('.form-login__login').value = '';
                document.querySelector('.form-login__password').value = '';
            }
        })
    }).then(function (res) {
        console.log('res', res);
    });
})();
