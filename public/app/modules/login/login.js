/// <reference path="../../types/clientTypes.d.ts" />
/// <reference path="../../baseController.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var APP_LOGIN;
(function (APP_LOGIN) {
    var Controller = (function (_super) {
        __extends(Controller, _super);
        function Controller($injector) {
            _super.call(this, $injector);
            this.email = '';
            this.password = '';
            if (this.isAuthenticate())
                this.$location.path('/dashboard');
            else
                this.initPage();
        }
        Controller.prototype.initPage = function () {
            this.isPageReady = true;
            this.isPageBusy = false;
        };
        Controller.prototype.login = function () {
            var _this = this;
            if (this.email && this.password) {
                this.isPageBusy = true;
                var query = {
                    username: this.email,
                    password: this.password
                };
                this.$http.post('./api/v1/login', query).then(function (result) {
                    _this.Context.user = result.data.user;
                    _this.$window.localStorage.token = result.data.token;
                    _this.$window.localStorage.expires = result.data.expires;
                    _this.show.success('Success');
                    _this.$location.path('/dashboard');
                }, function (error) {
                    _this.show.error('Failure');
                    _this.$log.error(error);
                });
            }
            else {
                this.show.error('Login or Password empty', 'DEBUG');
            }
        };
        Controller.$inject = ['$injector'];
        return Controller;
    })(PageController);
    angular.module('app.login', []).controller('loginCtrl', Controller);
})(APP_LOGIN || (APP_LOGIN = {}));
//# sourceMappingURL=login.js.map