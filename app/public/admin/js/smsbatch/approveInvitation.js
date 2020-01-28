function approveInvitation(Restangular, $uibModal, $q, notification, $state,$http) {
    'use strict';

    return {
        restrict: 'E',
        scope: {
            review: "&",
            size: "@"
        },
        link: function(scope, element, attrs) {
            scope.review = scope.review();
            scope.reInvite = function () {

                var data = { 'user_id': scope.review.values.id };
                $http.post("../api/users/reinvite", data).then(function successCallback(response) {
                    notification.log(response.data.message, { addnCls: 'humane-flatty-success' });
                },function errorCallback(response) {
                    notification.log(response.data.message, { addnCls: 'humane-flatty-error' });
                });
            };
        },

        template: '<a ng-if="review.values.invite_pending === true" class="btn btn-default btn-xs" ng-click="reInvite()"><i class="fa fa-paper-plane fa-lg"></i>&nbsp;Reinvite</a>'
    };
}

approveInvitation.$inject = ['Restangular', '$uibModal', '$q', 'notification', '$state','$http'];

export default approveInvitation;