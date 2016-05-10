(function () {
    var inputName = document.querySelector('.form-login__login');
    var inputPass = document.querySelector('.form-login__password');
    var formTitle = document.querySelector('.wrap-login--title');
    var users = [];

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
                res.push(login = inputName.value);
                res.push(password = inputPass.value);
                for (var item in res) {
                    if (/^[a-z0-9_\-]+$/.test(res[item])) {
                        formTitle.innerText = 'добро пожаловать в чат ' + res[0];
                        resolve(res);
                    } else {
                        formTitle.innerText = res[item] + ' - введены недопустимые символы';
                        return false;
                    }
                }
                clearForm();
            }
        })
    }).then(function (res) {

        var socket = new WebSocket('ws://localhost:5000');

        socket.onmessage = function (e) {
            // console.log(e.data);
            // console.log(e);
            onmessageHandler(e.data);

        }
        socket.onerror = function (e) {
            console.log(e);
        }
        socket.onopen = function (e) {
            socket.send(JSON.stringify({
                op: 'reg',
                data: {
                    name: res[0],
                    login: res[1]
                }
            }));
        }

        function onmessageHandler (e) {
            users.push(e);
            var arg = JSON.parse(e);
            console.log(arg);
            document.querySelector('.wrap-login').style = 'display: none';
            document.querySelector('.wrap-message--text').innerText = arg.users[0].name + ' : ' + arg.messages[0];
            console.log(users);
        }

        //sendLogin(res);
        // Отправка данных на сервер
        // function sendLogin(arg) {
        //     console.log(arg);
        //     sendAjax({
        //         op: 'reg',
        //         data: {
        //             name: arg[0],
        //             login: arg[1]
        //         }
        //     })
        // }

    });

    // functions for all app
    function sendAjax(data) {
        return new Promise(function (resolve) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.open('post', 'http://localhost:5000', true);
            xhr.onload = function () {
                console.log('response', xhr.response);
                resolve(xhr.response);
            };
            xhr.send(JSON.stringify(data));
        });
    }
    function clearForm() {
        inputName.value = '';
        inputPass.value = '';
    }
})();
