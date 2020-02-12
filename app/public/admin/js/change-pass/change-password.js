import Template from './change-password.html';

function changePassword($stateProvider) {

    $stateProvider.state('change-password', {
        parent: 'main',
        url: '/change-password',
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        controller: ['$http', '$scope', 'notification', function($http, $scope, notification) {

            $scope.pwdata = {
                currentPassword: '',
                newPassword: '',
                verifyPassword: ''
            };

            $scope.changePass = function () {
                $http.post('../api/user/change-password', $scope.pwdata).then(function successCallback(response) {
                    if (response.status === 200){
                        notification.log(response.data.message, { addnCls: 'humane-flatty-success' });
                    }
                }, function errorCallback(response) {
                    if (response.status === 400){
                        notification.log(response.data.message, { addnCls: 'humane-flatty-error' });
                    } else {
                        notification.log(response.data.message, { addnCls: 'humane-flatty-error' });
                    }
                });
            }
        }],
        template: Template
    });
}

changePassword.$inject = ['$stateProvider'];

export default changePassword;