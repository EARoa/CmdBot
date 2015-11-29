var phantom = require('phantom');

var USERNAME = "test",
    PASSWORD = "test",
    VERIFICATION_EMAIL = "test",
    HANGOUT_REGEX = /\/hangouts\/_\/[a-z0-9]+$/;

phantom.create(function (ph) {
    ph.createPage(function (page) {
        page.onResourceError = function(resourceError) {
            page.reason = resourceError.errorString;
        };

        page.open('https://plus.google.com/hangouts/_/', function(status) {

            debugger;

            // Give login page time to load
            setTimeout(function() {
                if(isLoginPage()) login();

                var tries = 0;
                (function pollForHangout() {
                    if(isVerificationPage()) verify();

                    isHangoutPage() || tries++ > 15 ? finish() : setTimeout(pollForHangout, 1000);
                })();
            }, 3000);

        });

        function finish() {
            var url = getHangoutUrl();
            console.log(HANGOUT_REGEX.test(url) ? url : 'no hangout for you, sry');
            page.release();
            ph.exit();
        }

        function isLoginPage() {
            return page.evaluate(function() {
                return !!document.getElementById('Email');
            });
        }

        function isVerificationPage() {
            return page.evaluate(function() {
                return !!document.getElementById('emailAnswer');
            });
        }

        function login() {
            page.evaluate(function(user, pass) {
                document.getElementById('Email').value = user;
                document.getElementById('Passwd').value = pass;
                document.getElementById('signIn').click();
            }, USERNAME, PASSWORD);
        }

        function verify() {
            page.evaluate(function(email) {
                document.getElementById('emailAnswer').value = email;
                document.getElementById('submitChallenge').click();
            }, VERIFICATION_EMAIL);
        }

        function getHangoutUrl() {
            return page.evaluate(function() {
                return document.location.href;
            });
        }

        function isHangoutPage() {
            return page.evaluate(function(regex) {
                return regex.test(document.location.href);
            }, HANGOUT_REGEX);
        }
    });
});