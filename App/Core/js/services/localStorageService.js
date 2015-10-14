/**
 * Created by navneet.prabhakar on 14-10-2015.
 */

"use strict";
/**
 * @desc Stores retrieves and deletes values from local storage
 */
angular.module('Business.Core').factory('localStorageService', ['$localStorage', function($localStorage){
    return{

        /**
         * @name set
         * @desc Stores value corresponding to Key
         *
         * @param key
         * @param value
         */
        set: function(key, value){
            $localStorage[key] = value;
        },

        /**
         * @name get
         * @desc Retrieves the value of stored key
         *
         * @param key
         * @return {*}
         */
        get: function(key){
            return $localStorage[key];
        },

        /**
         * @name remove
         * @desc Deletes the key from local storage
         *
         * @param key
         */
        remove: function(key){
            delete $localStorage[key]
        }
    }
}]);