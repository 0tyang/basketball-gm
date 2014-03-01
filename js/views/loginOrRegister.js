/**
 * @name views.loginOrRegister
 * @namespace Login and register forms.
 */
define(["globals", "ui", "core/league", "lib/jquery", "util/bbgmView", "util/helpers", "util/random", "util/viewHelpers"], function (g, ui, league, $, bbgmView, helpers, random, viewHelpers) {
    "use strict";

    function uiFirst() {
        var $login, $register;

        ui.title("Login or Register");

        $login = $("#login");
        $register = $("#register");

        $login.on("submit", function (event) {
            event.preventDefault();

            $.ajax({
                type: "POST",
                url: "http://account.basketball-gm.dev/login.php",
                data: $login.serialize(),
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                success: function (data) {
                    // Reset error display
                    document.getElementById("login-error").innerHTML = "";

                    if (data.success) {
                        g.vm.account.username(data.username);
                        ui.realtimeUpdate([], "/account");
                    } else {
                        document.getElementById("login-error").innerHTML = "Invalid username or password.";
                    }
                }
            });
        });

        $register.on("submit", function (event) {
            event.preventDefault();

            $.ajax({
                type: "POST",
                url: "http://account.basketball-gm.dev/register.php",
                data: $register.serialize(),
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                success: function (data) {
                    var error;

                    // Reset error display
                    document.getElementById("register-username").parentNode.classList.remove("has-error");
                    document.getElementById("register-email").parentNode.classList.remove("has-error");
                    document.getElementById("register-password").parentNode.classList.remove("has-error");
                    document.getElementById("register-password2").parentNode.classList.remove("has-error");
                    document.getElementById("register-username-error").innerHTML = "";
                    document.getElementById("register-email-error").innerHTML = "";
                    document.getElementById("register-password-error").innerHTML = "";
                    document.getElementById("register-password2-error").innerHTML = "";

                    if (data.success) {
                        g.vm.account.username(data.username);
console.log("REDIRECT")
                        ui.realtimeUpdate([], "/account");
                    } else {
                        for (error in data.errors) {
                            if (data.errors.hasOwnProperty(error)) {
                                if (error === "username") {
                                    document.getElementById("register-username").parentNode.classList.add("has-error");
                                    document.getElementById("register-username-error").innerHTML = data.errors[error];
                                } else if (error === "email") {
                                    document.getElementById("register-email").parentNode.classList.add("has-error");
                                    document.getElementById("register-email-error").innerHTML = data.errors[error];
                                } else if (error === "password") {
                                    document.getElementById("register-password").parentNode.classList.add("has-error");
                                    document.getElementById("register-password-error").innerHTML = data.errors[error];
                                } else if (error === "password2") {
                                    document.getElementById("register-password2").parentNode.classList.add("has-error");
                                    document.getElementById("register-password2-error").innerHTML = data.errors[error];
                                } else if (error === "passwords") {
                                    document.getElementById("register-password").parentNode.classList.add("has-error");
                                    document.getElementById("register-password2").parentNode.classList.add("has-error");
                                    document.getElementById("register-password2-error").innerHTML = data.errors[error];
                                }
                            }
                        }
                    }
                }
            });
        });
    }

    return bbgmView.init({
        id: "loginOrRegister",
        beforeReq: viewHelpers.beforeNonLeague,
        uiFirst: uiFirst
    });
});