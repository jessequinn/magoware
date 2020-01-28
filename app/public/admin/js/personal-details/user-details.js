import Template from './user-details.html';

function userDetails($stateProvider) {

    $stateProvider.state('personal', {
        parent: 'main',
        url: '/personal',
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        controller: ['$http', '$scope', 'notification', function($http, $scope, notification) {

            $http.get('../api/personal-details').then(function successCallback(response) {

                if (response.status === 200){
                    $scope.user = {
                        username: response.data.username,
                        email: response.data.email,
                        telephone: response.data.telephone,
                        role: response.data.group.name,
                        apikey: response.data.jwtoken
                    };
                }
            }, function errorCallback(response) {
                if (response.status === 400){
                    notification.log(response.data.message, { addnCls: 'humane-flatty-error' });
                } else {
                    notification.log(response.data.message, { addnCls: 'humane-flatty-error' });
                }
            });

            $scope.updateInfo = function () {
                $http.put('../api/personal-details', $scope.user).then(function successCallback(response) {
                    if (response.status === 200){
                        notification.log('Update Successfully', { addnCls: 'humane-flatty-success' });
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

userDetails.$inject = ['$stateProvider'];

export default userDetails;