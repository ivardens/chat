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
                        document.querySelector('.form-title').innerText = 'добро пожаловать в чат ' + res[0];
                        resolve(res);
                    } else {
                        document.querySelector('.form-title').innerText = res[item] + ' - введены недопустимые символы';
                        return false;
                    }
                }
                clearForm();
            }
        })
    }).then(function (res) {

        var socket = new WebSocket('ws://localhost:5000');

        socket.onmessage = function (e) {
            console.log(e.data);
        }
        socket.onerror = function (e) {
            console.log(e);
        }
        socket.onopen = function (e) {

        }

        sendLogin(res);

        // Отправка данных на сервер
        function sendLogin(arg) {
            sendAjax({
                op: 'reg',
                data: {
                    name: arg[0],
                    login: arg[1]
                }
            })
        }

    });

    // functions for all app
    function sendAjax(data) {
        return new Promise(function (resolve) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.open('post', 'http://localhost:5000', true);
            xhr.onload = function () {
                console.log(xhr.response);
                resolve(xhr.response);
            };
            xhr.send(JSON.stringify(data));
        });
    }
    function clearForm() {
        document.querySelector('.form-login__login').value = '';
        document.querySelector('.form-login__password').value = '';
    }
})();
